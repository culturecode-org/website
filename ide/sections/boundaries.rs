pub struct SectionBoundaries {
    pub form: Vec<&'static str>,
}

impl Default for SectionBoundaries {
    fn default() -> Self {
        SectionBoundaries {
            form: vec![
                "Academy",
                "Talks",
            ],
        }
    }
}
