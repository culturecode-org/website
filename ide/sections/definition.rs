pub struct SectionDefinition {
    pub form: Vec<&'static str>,
}

impl Default for SectionDefinition {
    fn default() -> Self {
        SectionDefinition {
            form: vec![
                "Community",
                "Challenges",
            ],
        }
    }
}
