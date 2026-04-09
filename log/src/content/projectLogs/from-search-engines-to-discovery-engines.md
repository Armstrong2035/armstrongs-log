---
title: "From Search Engines to Discovery Engines"
project: "Poysis"
date: 2026-04-09
status: "vision"
kicker: "Signal & Sense — Armstrong Olusoji"
pinned: true
---

Google changed the world. It gave every person on the internet the ability to find a website that had the information they needed, at the exact moment they needed it. The insight was deceptively simple. Don't try to create the world's knowledge. Just index what humans are already creating: blogs, websites, and forums. People were already encoding their expertise in HTML. Google crawled it, ranked it, and made it discoverable.

That model worked extraordinarily well for two decades. But it was always built on a fundamental constraint: it could only surface what it could crawl, and it could only match what you typed to what appeared on a page. The keyword was everything. The intent behind it was invisible.

Google has since layered LLMs onto this foundation. But that is not the next generation of discovery. The keyword is still the entry point. The LLM is simply aggregating information across pages that contain that keyword and presenting it in natural language. The underlying model has not changed. It has merely been dressed differently.

> The best human knowledge has largely moved off the open web into private communities, expert networks, and increasingly, into AI-powered applications that no crawler can reach.

Meanwhile, the web that Google was built to index is collapsing under the weight of SEO-gamed content, AI-generated filler, and algorithmic noise. The signal-to-noise ratio has inverted. And the experts, the people who actually know things, have largely stopped publishing on the open web at all.

## Discovery is not a search box

The deeper problem is a category error. We have conflated discovery with search, when search is only one part of how humans actually find things.

Think about how you discovered something you genuinely needed. It might have been a doctor, a product, or an idea that changed your thinking. Sometimes you searched with a specific query. But just as often, you asked someone you trusted. You stumbled across something while looking for something else. A recommendation surfaced at the right moment. A conversation opened a door you didn't know existed.

Discovery is a pipeline. Search is only one node in it.

More precisely, discovery is a **state-aware pipeline**. Two things define the state:

1. **The User**: Their prior knowledge, their context, what they’ve already tried, and what they actually mean beneath what they’ve typed.
2. **The Domain**: The variables that matter when finding a great running shoe are completely different from those that matter when finding a lawyer, a co-founder, or a treatment protocol.

A genuinely good discovery system must hold both states simultaneously and dynamically fuse them into a response that is right for this person, asking this question, in this domain, right now.

No keyword-based system can do this. And no LLM trained on crawled web pages can do this either. The knowledge required to navigate a domain well lives not in the pages, but in the minds of the experts who work within it.

## What Poysis is, today

It is important to be precise here, because the gap between the current product and the long-term thesis is large — and pretending otherwise would be dishonest.

Today, Poysis is a no-code platform that lets domain experts build sophisticated AI co-pilots. Using modular blocks (Chat, Search, Generate), rich document ingestion, visual result formatters, conversation handoffs, and a live mobile preview, anyone can create and deploy a functional, domain-specific AI application without writing code.

That is a real and useful product. There are hundreds of thousands of domain experts who need exactly this capability and have no good alternative today. The platform is a strong standalone business on its own merits. This is the primary basis on which Poysis should be evaluated right now, not the discovery layer that may follow from it.

But the platform is also deliberately architected with a longer thesis in mind.

## What we are building toward

Every co-pilot built on Poysis is, at its core, a discovery pipeline for a specific domain. It is configured by someone who actually knows that domain. The onboarding questions a builder designs reveal which variables matter in their field. The prompts they write encode retrieval logic. The structure they create reflects how an expert navigates from a vague user intent to a precise answer.

At scale, and only with the explicit consent of builders, these configurations can become something more than a collection of individual applications. They become a map of how discovery actually works across domains. Not what is on the internet, but how to find the right thing within it.

What we are assembling is a layer that encodes not just knowledge but the reasoning processes that navigate it. This process is slow and deliberate. We are only building it as the product earns it.

> [!IMPORTANT]
> Google indexed the web that existed: pages written by humans. We are building toward indexing something different: the pipelines that domain experts build to make their knowledge navigable.

A page tells you what someone knows. A well-built co-pilot encodes how they think about it. It knows which questions to ask, which variables to weigh, and how to move from intent to answer. That is a richer signal. But it only becomes a richer signal if the co-pilots are built well. That is the hard problem.

## The quality problem

There is a risk in any open platform thesis that needs to be named directly: the average quality of what gets built will be low.

If a million domain experts build a million co-pilots on Poysis, most will likely be shallow FAQ bots with nice interfaces. They will have generic prompts and minimal domain depth. A discovery layer built on shallow co-pilots is not a discovery engine. It is simply a noisier version of what already exists.

The value of the commons depends entirely on the depth of what gets contributed. This is why one of the most important items on our roadmap is **Ouroboros**. This is an intelligent co-pilot embedded directly in the builder.

Ouroboros acts as a thinking partner for domain experts. It helps them properly map their mental models by:
- Surfacing the variables that truly matter.
- Asking the right questions to draw out their expertise.
- Improving prompts while preserving their authentic voice.
- Suggesting meaningful structures and flows.

It is not just a helpful UX feature. It is the mechanism by which contribution quality can scale. Without it, the platform produces a long tail of shallow applications. With it, each builder is systematically guided to contribute something with real depth.

## The cold start is real

The open source parallel is instructive, but it has limits worth acknowledging. The first open source contributor got something useful immediately: a working codebase and a growing community. In Poysis’s model, the platform delivers real value from day one. Builders get a powerful tool for a real problem. But the broader discovery network layer only becomes meaningful at scale.

That means the first few hundred builders are, in a sense, early contributors to a commons that does not yet fully exist. We think that is an honest ask, not an unfair one. The platform stands on its own merits today. The discovery layer is not something we are charging for now, nor promising on a fixed timeline. It is a direction. Every architectural decision is pointed toward it, and it becomes more real with every high-quality co-pilot that gets built.

## The long game

Anthropic, OpenAI, and their peers have built the capacity for machines to understand and generate human language. That is a remarkable foundation. But language understanding alone does not produce good discovery. What is missing is the layer beneath:

- How does discovery actually work in each domain?
- What are the right questions to ask?
- What variables matter?
- How does an expert navigate from an imprecise request to the thing someone actually needs?

LLMs provide the intelligence. The data generated by domain experts building on Poysis will provide the understanding. This process happens carefully, with guidance, and over time. Eventually, it will provide the wisdom.

The interface for the next generation of discovery will not be a search box. It will be a dynamic combination of chat, search, structured inputs, and memory. Each primitive is deployed at the right moment, for the right person, in the right domain. It is not a static response to a keyword. It is a state-aware system that knows where you are in the discovery journey and what you actually need next.

That system does not exist yet. Building it is a ten-year project. The first chapter is simply building a platform that domain experts find genuinely useful. Everything else compounds from there, but only if we get that first chapter right.

**Google searches the what: what is on each page in its index.**

**The system we are building toward will provide the how: how you find high-signal information across a million domains, guided by the people who know those domains best.**

That is how the internet moves from search engines to discovery engines. We are at the beginning of that movement, not the end.
