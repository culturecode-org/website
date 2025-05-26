pub struct Quote {
    pub cita: &'static str,
}

impl Default for Quote {
    fn default() -> Self {
        Cierre {
            cita: "- The question is the root; the answer is the fruit.",
        }
    }
}
