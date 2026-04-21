# Product Brief

## Background

The starting brief for this project was to design and ship a polished web product prototype for discounted-flight discovery. The first iteration was closer to a strong search-and-results demo. The current iteration pushes further toward a product point of view: an editorial shell that curates what is worth looking at, explains why a fare is attractive, and makes tracking language part of the experience.

## User Pain Points

- Low fares are easy to find but hard to interpret.
- Headline ticket prices often hide baggage fees, strict change rules, or inconvenient flight timing.
- Users need help deciding whether a fare is truly worth buying now, not just whether it is numerically the cheapest.
- A blank search page does little to support discovery, trust, or product identity.

## Product Judgment

The product is framed as a discovery and decision-support tool, not a booking engine. In the latest revision, that means:
- the homepage behaves like an editorial issue rather than a blank search form
- featured deals and themed rails help a user start from opportunity instead of route syntax
- route-tracker states give the product a stronger "keep watching this" behavior, even in deterministic demo form
- the results page separates ticket face price from real trip cost
- the detail layer explains the hidden rules, fit, and recent price context behind each fare

## MVP Boundary

In scope:
- homepage
- results page
- filters
- cheapest versus best-overall comparison
- route-tracker shell and price-history presentation
- rule-transparency detail layer
- deterministic demo data
- AI-style recommendation copy on each result

Out of scope:
- live airline inventory
- accounts and login
- checkout and payment
- real route-tracking infrastructure or notification delivery
- a heavy backend or database

## Why This Prototype Avoids A Complex Backend

The goal of this repository is clear product delivery, not backend theater. A deterministic frontend-first build makes the important choices easier to review:
- the editorial product framing is visible immediately
- every state is demo-stable
- the true-cost logic is inspectable
- route tracking and price history can be shown as interface concepts without pretending there is a live pipeline behind them
- the repo remains lightweight enough for hiring review, local setup, and public sharing

Adding live supplier integrations, crawlers, or transactional flows would make the prototype more complex without improving the core question this project is meant to answer: can the product help someone understand a fare, trust the framing, and make a better decision?

## Why It Works As An AI Coding / Product Prototype Showcase

- It demonstrates scope control instead of feature sprawl.
- It combines interface design, product reasoning, and implementation delivery in one reviewable artifact.
- It uses AI-assisted development where speed helps, while keeping the final result deterministic and inspectable.
- It shows how to package a prototype for public review without overstating real-world system capability.
- It demonstrates a stronger product point of view than a standard search-results demo by introducing editorial curation, route tracking, and true-cost storytelling.
