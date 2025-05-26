use crate::lang::{Lang, LangString};
use std::fmt;

pub struct SectionOrigin {
    pub source: LangString,
    pub early_meaning: LangString,
    pub transition: LangString,
    pub current_definition: LangString,
}

impl Default for SectionOrigin {
    fn default() -> Self {
        SectionOrigin {
            source: LangString {
                en: "Latin *colere*: to cultivate, care, inhabit",
                es: "Latín *colere*: cultivar, cuidar, habitar"
            },
            early_meaning: LangString {
                en: "cultivate the land",
                es: "cultivar la tierra"
            },
            transition: LangString {
                en: "cultivate the spirit",
                es: "cultivar el espíritu"
            },
            current_definition: LangString {
                en: "The set of customs, knowledge, and levels of development-artistic,\
                    scientific, industrial of a social group in a given era.",
                es: "El conjunto de costumbres, conocimientos y niveles de desarrollo‚ artístico,\
                    científico, industrial de un grupo social en una época dada."
            }
        }
    }
}

impl fmt::Display for SectionOrigin {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let lang = Lang::ES;
        write!(
            f,
            "Source: \n{}\r\n‚Early Meaning: \n{}\n‚Transition: \n{}\n‚Current Definition: \n{}\n",
            self.source.get(&lang),
            self.early_meaning.get(&lang),
            self.transition.get(&lang),
            self.current_definition.get(&lang),
        )
    }
}
