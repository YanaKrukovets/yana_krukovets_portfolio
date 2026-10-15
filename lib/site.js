// Site-wide constants shared by meta tags, JSON-LD, the RSS feed, and llms.txt.

export const SITE_URL = "https://www.yanakrukovets.com";

// Stable JSON-LD node ids — every page that mentions Yana or the site points at
// these, so search engines and AI assistants resolve them to a single entity.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
