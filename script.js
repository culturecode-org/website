// === Color Block Animation ===
const codeBlock = document.querySelector('.code-block');
const colorBlocks = document.querySelector('.color-blocks');
const blocks = document.querySelectorAll('.block');

function updateBlockLayout() {
    const codeWidth = codeBlock.offsetWidth;
    const blockWidth = codeWidth / blocks.length;

    blocks.forEach((block) => {
        block.style.width = `${blockWidth}px`;
    });

    colorBlocks.style.width = `${codeWidth}px`;
}

window.addEventListener('resize', updateBlockLayout);
window.addEventListener('load', updateBlockLayout);

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    blocks.forEach((block, index) => {
        const trigger = 0.15 + index * 0.05;
        if (scrollY > trigger * windowHeight) {
            block.style.height = '0px';
        } else {
            block.style.height = '100vh';
        }
    });
});

function slowScrollToElement(target, duration = 1000) {
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;
  const startTime = performance.now();

  function scroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // clamp between 0 and 1

    window.scrollTo(0, start + distance * easeInOutCubic(progress));

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }

  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  requestAnimationFrame(scroll);
}

document.querySelector('.container').addEventListener('click', (e) => {
    const containerHeight = e.currentTarget.offsetHeight;
    if (e.clientY > containerHeight / 2) {
        // document.querySelector('.ide-window').scrollIntoView({
            //   behavior: 'smooth'
            // });
        slowScrollToElement(document.querySelector('.ide-window'), 2000); // 2 seconds
    }
});

// === IDE Mock File Viewer ===
const filePaths = [
    "Cargo.toml",
    "sections/origin.rs",
    "sections/definition.rs",
    "sections/boundaries.rs",
    "sections/value_proposition.rs",
    "sections/quote.rs",
    "manifest/es.md",
];

const files = {};

async function fetchFiles() {
    await Promise.all(filePaths.map(async (path) => {
        const response = await fetch(`/ide/${path}`);
        const text = await response.text();
        files[path] = text;
    }));
}

window.addEventListener('load', async () => {
    await fetchFiles();
    renderExplorer();
});

function renderExplorer() {
    const explorer = document.getElementById("explorer");
    const structure = {};

    // Build folder structure
    Object.keys(files).forEach(path => {
        const parts = path.split('/');
        let current = structure;
        parts.forEach((part, i) => {
            if (!current[part]) {
                current[part] = i === parts.length - 1 ? 'file' : {};
            }
            current = current[part];
        });
    });

    function renderTree(obj, parentPath = '') {
        let html = '';
        for (const name in obj) {
            const fullPath = parentPath ? `${parentPath}/${name}` : name;
            if (obj[name] === 'file') {
                html += `<div class="file" data-path="${fullPath}">${name}</div>`;
            } else {
                html += `<div class="folder">${name}</div>`;
                html += renderTree(obj[name], fullPath);
            }
        }
        return html;
    }

    explorer.innerHTML = renderTree(structure);

    // File selection logic
    document.querySelectorAll('.file').forEach(file => {
        file.addEventListener('click', () => {
            document.querySelectorAll('.file').forEach(f => f.classList.remove('selected'));
            file.classList.add('selected');
            const path = file.getAttribute('data-path');

            const codeEl = document.getElementById('file-content');
            codeEl.textContent = files[path];

            // Generate line numbers as string
            const lines = files[path].split('\n').length;
            codeEl.parentElement.setAttribute('data-line-numbers', Array.from({length: lines}, (_, i) => i + 1).join('\n'));

            // Highlight
            Prism.highlightElement(codeEl);

        });
    });

    // Auto-select first file
    const firstFile = document.querySelector('.file');
    if (firstFile) firstFile.click();
}

document.querySelector('.run-button').addEventListener('click', () => {
    const output = document.getElementById('output');
    const outputContent = document.getElementById('output-content');
    const path = document.querySelector('.file.selected')?.getAttribute('data-path') || 'main.rs';

    outputContent.textContent = `// Pretend we're running ${path}\n\n🎉 Hello from ${path.split('/').pop()}`;
    output.classList.add('show');
});

const resizer = document.getElementById('resizer');
const output = document.getElementById('output');
const codeArea = document.querySelector('.code-area');

let isResizing = false;

resizer.addEventListener('mousedown', function (e) {
    isResizing = true;
    document.body.style.cursor = 'row-resize';
});

document.addEventListener('mousemove', function (e) {
    if (!isResizing) return;
    const containerTop = document.querySelector('.editor').getBoundingClientRect().top;
    const offset = e.clientY - containerTop;
    const editorHeight = document.querySelector('.editor').offsetHeight;
    const newOutputHeight = editorHeight - offset - resizer.offsetHeight;

    if (newOutputHeight > 100 && newOutputHeight < editorHeight - 100) {
        output.style.height = `${newOutputHeight}px`;
    }
});

document.addEventListener('mouseup', function () {
    isResizing = false;
    document.body.style.cursor = 'default';
});
