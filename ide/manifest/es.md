## Markdown Sample

mod section_origin;
mod section_definition;
mod section_boundaries;
mod section_value_proposition;
mod section_founding_circle;
mod section_closing_note;

use section_origin::SectionOrigin;
use section_definition::SectionDefinition;
use section_boundaries::SectionBoundaries;
use section_value_proposition::SectionValueProposition;
use section_founding_circle::SectionFoundingCircle;
use section_closing_note::SectionClosingNote;

fn main() {
    println!("\n> ORIGIN\n{:?}", SectionOrigin::default());
    println!("\n> DEFINITION\n{:?}", SectionDefinition::default());
    println!("\n> BOUNDARIES\n{:?}", SectionBoundaries::default());
    println!("\n> VALUE PROPOSITION\n{:?}", SectionValueProposition::default());
    println!("\n> FOUNDING CIRCLE\n{:?}", SectionFoundingCircle::default());
    println!("\n> CLOSING NOTE\n{:?}", SectionClosingNote::default());
}

