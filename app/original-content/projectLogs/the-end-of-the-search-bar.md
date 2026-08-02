---
title: "Product Scout: Semantic Search For Shopify Stores"
project: "Product Scout"
date: 2026-03-09
status: "mvp"
---

<iframe 
  class="w-full aspect-video rounded-lg shadow-lg my-8"
  src="https://www.youtube.com/embed/NK4LIzdPyAg" 
  title="YouTube video player" 
  frameborder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  allowfullscreen>
</iframe>

## 1. The Keyword Trap
Think about the last time you walked into a real, physical store. If you went to a running shop and said, "My knees hurt when I run on pavement," the salesperson wouldn't stare at you blankly. They would use their expertise to hand you a specific shoe and explain exactly how its thick foam absorbs impact.

Online shopping doesn't work this way. Over the last twenty years, it has become incredibly easy to build an online store and fill it with thousands of items. But the search bar we use to navigate those stores hasn't changed.

The traditional search bar is just a word-matcher. If you type "shoes that won't hurt my knees on concrete" into most websites, the system breaks. It doesn't understand your problem. It just scans the database for the words "hurt" and "concrete."

I call this the Keyword Trap. We have forced the customer to do all the work. To find a product, you have to magically guess the exact technical terms the store used in their database. This causes frustration, decision fatigue, and abandoned carts. We lost the magic of having a guide.

Current AI chatbots haven't solved this either. They sit in the corner of the screen acting like glorified FAQ pages rather than true sales assistants.

## 2. Product Scout: A Smarter Way to Search
I built Product Scout because I believe the true value of AI in commerce isn't replacing the search bar: it's giving every customer their own expert guide.

To do this, we had to change how search works under the hood.

Instead of looking for matching words, Product Scout reads an entire store's catalog and understands the meaning behind the items. When a customer searches for a solution to a problem, the AI acts as a bridge by matching human intent with the technical details of the product. The search pipeline is trained on each merchant's own catalog, so the recommendations are grounded in what that specific store actually sells, not a generic model of the world.

It operates instantly, feeling snappy and responsive like a normal search engine, but with genuine understanding behind it.

### Under the Hood: 
>     
> - Framework: FastAPI (Python) — native async architecture for concurrent streaming and real-time telemetry.
> - Embeddings: Google text-embedding-001 — converts every product in a merchant's catalog into high-dimensional vectors.
> - Vector Search: Pinecone — finds the closest semantic match to a customer's query in milliseconds.
> - Reranking: Cohere — second-pass filter ensuring semantic precision before results reach the customer.
> - Justifications: Gemini 2.0 Flash — generates the Human-AI Handshake tooltips dynamically, streamed in real time.
> - Data Layer: Supabase PostgreSQL — merchant auth, search logs, attribution events, analytics via stored procedures.
>       


### The Architecture:
> 
> - **Ingestion**: When a merchant installs Scout, their entire Shopify catalog is pulled via the Admin API, chunked into semantic units, and converted into 768-dimensional vectors using Google Gemini. These vectors are stored in Pinecone under a merchant-specific namespace — strict multi-tenancy from day one.
> - **Search**: When a customer types a query, it is embedded into the same vector space and matched against the catalog using cosine similarity. The top candidates are reranked by Cohere for precision, then score-gap trimmed — only results above a statistical relevance threshold reach the customer.
> - **Streaming**: Results and explanations are delivered in two concurrent phases over a Server-Sent Events connection. Product cards render immediately. Human-AI Handshake explanations stream in as they generate — one per product, in parallel, via Gemini Flash.
> - **Telemetry**: Every search, click, and cart event is logged asynchronously without touching the search response time. Attribution is resolved in a single PostgreSQL stored procedure when the merchant opens their dashboard.
> 
> The result: a sub-second search experience that gets smarter with every query.
>

## 3. The Human-AI Handshake
Product Scout doesn't just return a list of links. Every recommendation comes with a clear, structured explanation of exactly why that product was chosen. It translates technical specifications into real-world benefits. Instead of listing "Vibram Outsole," it tells the customer: "This has a specialised rubber sole that will give you better grip on wet trails."

It feels less like a machine processing data and more like a conversation with someone who actually understands what you need. We call this the Human-AI Handshake: the moment the AI makes its reasoning visible and earns the customer's trust.

## 4. Listening to the Customer
Because customers can finally search using natural language, something important happens for the store owner: they get to hear what their customers actually want.

Traditional analytics only show what people clicked. Product Scout's merchant dashboard shows the intent behind the clicks.

- **Missed Opportunities**: every time a customer searches for something the store doesn't carry, that signal is captured. It tells the merchant exactly what products they should stock next.
- **Live Feed**: merchants can see the unfiltered questions their customers are asking in real time.
- **Revenue Attribution**: every search that leads to an add-to-cart event is tracked back to the original query, so merchants can see precisely how much revenue Scout influenced.

This takes the guesswork out of running a store. Instead of blindly predicting trends, merchants can make decisions based on what their customers are actually asking for.

## 5. The Horizon: The Operating System for Consultative Commerce
Product Scout proves that intelligent, guided search works for e-commerce. But a better search experience is just the beginning.

The deeper vision is to take the core insight of Product Scout (that AI should guide decisions, not just return results) and turn it into infrastructure that any business can use.

We are building composable primitives: specialised AI roles that can be assembled into a custom guide for any domain.

- **The Empath**: understands what the customer actually needs, beneath the surface of what they said.
- **The Doctor**: verifies facts and grounds recommendations in real product data.
- **The Strategist**: navigates constraints like budget, preference, and context.

Any business (a medical device supplier, a real estate agency, a financial services firm) will be able to assemble these primitives into a consultative AI layer for their customers. The domain expertise already exists inside their catalog, their data, their knowledge. The primitives give it a voice.

We are at a turning point. The internet has been too noisy and confusing for too long. By bringing genuine understanding and expert guidance directly to the customer, we are turning dead-end searches into solutions.

We are bringing the human touch back to the web.