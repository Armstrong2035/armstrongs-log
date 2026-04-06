---
title: "Multi-tenancy Semantic Search: Architecture for Scout & Poysis"
description: "How to build a unified, decoupled semantic search engine that scales across multiple products without technical waste."
date: 2026-04-01
stack: ['FastAPI', 'Pinecone', 'Clerk', 'Python']
difficulty: "Advanced"
---

## 01. Why this is important (Avoiding Technical Waste)
One of the most common traps in early-stage engineering is building the same primitive twice. When I built **Product Scout**, I needed a multi-tenant semantic search engine for Shopify merchants. When I started building **Poysis**, I needed a multi-tenant semantic search engine for domain experts.

Instead of building two separate systems, I decoupled the core search infrastructure. This is about building a "Search Utility" that doesn't care about the domain—it only cares about namespaces, retrieval benchmarks, and isolation.

## 02. Decoupling the Multi-tenancy System
To make a search engine truly decoupled, we have to separate three distinct layers:

### Auth & Namespace Mapping
We use a high-level identifier (e.g., `merchant_id` or `expert_id`) to map every query to a specific namespace in our vector database (Pinecone). This ensures that a search in a "Chess Club" context never leaks data into a "Sneaker Store" context.

### Namespaces
In Pinecone, namespaces are the primitive for multi-tenancy. Every ingestion job is strictly namespaced.

### Retrieval
The retrieval pipeline is a pure function: `(namespace, query_vector) -> results`. By keeping this function "pure", we can use it across any product that needs semantic search.

## 03. Deploying it to Shopify (Product Scout)
For Product Scout, the "Search Utility" is wrapped in an e-commerce adapter. 
- **Ingestion**: Pushes Shopify Product JSON into the namespaces.
- **Retrieval**: Formats the results into the "Human-AI Handshake" tooltips for the Shopify storefront.

## 04. Deploying it for Poysis
For Poysis, we treat the search utility as one of our **four core blocks**:
1. **The Context Block**: Uses semantic search to pull relevant knowledge chunks based on the user's current intent.
2. **The Logic Block**: Processes the results.
3. **The Interface Block**: Renders the UI.
4. **The Feedback Block**: Logs interactions to refine the search.

By building the search engine as a standalone primitive first, we've saved months of engineering time that can now be spent on the specific "Handshake" logic that makes Poysis unique.
