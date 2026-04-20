# Product Brief

## Background

The starting brief for this project was to design and ship a polished web product prototype for discounted-flight discovery. The challenge was not to recreate a full travel platform. It was to show product judgment: what to build, what to leave out, and how to present a believable user experience within a tight prototype scope.

## User Pain Points

- Low fares are easy to find but hard to interpret.
- Headline ticket prices often hide baggage fees, strict change rules, or inconvenient flight timing.
- Users need help deciding whether a fare is truly worth buying now, not just whether it is numerically the cheapest.
- A blank search page does little to support discovery or make a prototype feel alive.

## Product Judgment

The product is framed as a discovery and decision-support tool, not a booking engine. That choice drives the entire MVP:
- the homepage mixes search with curated opportunity entry points
- the results page separates "Cheapest" from "Best Value"
- the detail layer explains the hidden rules behind each fare
- the calendar helps the user decide whether moving the trip unlocks a materially better option

## MVP Boundary

In scope:
- homepage
- results page
- filters
- cheapest versus best-value comparison
- rule-transparency detail layer
- deterministic demo data
- AI-style recommendation copy on each result

Out of scope:
- live airline inventory
- accounts and login
- checkout and payment
- favorites or long-running price tracking
- a heavy backend or database

## Why This Prototype Avoids A Complex Backend

The goal of this repository is clear product delivery, not backend theater. A deterministic frontend-first build makes the important choices easier to review:
- the product framing is visible immediately
- every state is demo-stable
- the comparison logic is inspectable
- the repo remains lightweight enough for hiring review, local setup, and public sharing

Adding live supplier integrations or transactional flows would make the prototype more complex without improving the core question this project is meant to answer: can the product help someone understand a low fare and make a better decision?

## Why It Works As An AI Coding / Product Prototype Showcase

- It demonstrates scope control instead of feature sprawl.
- It combines interface design, product reasoning, and implementation delivery in one reviewable artifact.
- It uses AI-assisted development where speed helps, while keeping the final result deterministic and inspectable.
- It shows how to package a prototype for public review without overstating real-world system capability.
