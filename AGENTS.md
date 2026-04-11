# AGENTS.md

## Project
Meituan AI Coding assessment demo: 特价机票发现平台

## Goal
Build a polished, demo-ready web product prototype that helps users discover high-value discounted flights, understand hidden rules, and make better booking decisions.

## Primary evaluation target
This project is for an AI Coding assessment focused on:
- demand understanding
- product design
- completeness
- usability
- iteration awareness
- visual quality

## Non-goals
- Do not build a real booking system
- Do not integrate payment
- Do not require login to demo core flow
- Do not depend on real third-party flight APIs as a hard requirement
- Do not introduce a heavy backend
- Do not optimize for engineering complexity over demo quality

## Product scope
Must have:
- homepage with search + discovery-oriented cheap fare cards
- result page with “最便宜” and “最划算” views
- filters
- flight detail drawer/modal with transparent rules
- AI-style recommendation text on each result
- realistic mock data

Choose at most one major bonus feature for v1:
- low-price calendar
or
- favorites / price tracking

## Product principles
- discovery, not booking
- explain hidden costs clearly
- emphasize total cost and decision support
- make the demo feel like a real product, not a class assignment
- UI polish matters
- smooth end-to-end interaction matters more than feature count

## Technical preferences
- frontend-first application
- mock data first
- stable and deployable to Vercel
- avoid unnecessary dependencies
- componentized structure
- responsive layout
- desktop-first, mobile-safe

## Build discipline
- always keep the project buildable
- run install, lint, and production build before declaring work complete
- fix build errors before adding more features
- do not leave placeholder broken states
- prefer deterministic local data over fragile external integrations

## Deployment target
- GitHub + Vercel
- preview verification before production
- do not auto-submit final assessment link
