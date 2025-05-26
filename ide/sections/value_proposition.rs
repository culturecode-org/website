pub struct SectionValueProposition {
    pub idea: &'static str,
    pub do: Vec<&'static str>,
    pub believe: Vec<&'static str>,
}

impl Default for SectionValueProposition  {
    fn default() -> Self {
        SectionValueProposition {
            idea: "Learn by solving problems",
            do: vec![
                "Challenge approach",
                "Decision making",
                "Sharp judgement"
            ],
            believe: vec![
                "More practice, less courses",
                "More foundations, less trend",
                "More comprehension, less rush"
            ],
        }
    }
}
