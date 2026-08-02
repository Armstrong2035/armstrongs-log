---
name: "Simasia"
tagline: "A brand-tone guardrail that scores whether an AI reply sounds like you — and steers it until it does."
summary: "A small, cheap Python library: one frozen embedding model plus one logistic head per brand. It scores any LLM output 0–1, explains the score with real examples, and refines the reply until it passes."
status: "live"
role: "Author & Engineer"
year: "2026"
accent: "blue"
featured: false
order: 3
stack: ["Python", "scikit-learn", "Embeddings", "CLI", "PyPI"]
links: []
---

LLMs are fluent but tone-blind. Simasia adds the missing judge: freeze a large embedding model, train one small logistic-regression head on a brand's voice, and you can rate any reply from 0 to 1 for a few kilobytes of weights per brand.

Because the judge is a classifier, not a writer, everything else follows cleanly. It explains a score with the closest on-brand and off-brand examples — no language model needed. It can train from raw text, a file, or a list of URLs, and even manufacture off-brand negatives from on-brand copy alone. And it closes the loop: hand it a generator and it rewrites until the reply clears your threshold. Shipped as an installable package with a config-file CLI for people who don't write code.
