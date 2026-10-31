# Foyer

A show site for an AI workspace built for luxury real estate agents. **Live demo:** https://ronan1111341.github.io/discovery-copilot/

Foyer is a design and engineering concept, not a working product. Everything on screen is scripted animation on invented sample data (a fictional agency, agents, clients and properties). Nothing is read, searched, saved or sent, and there is no back end.

## What it shows

Nine tools that share one invented world, each with its own scripted AI moment:

| Tool | The demo |
|---|---|
| AI Email | An enquiry arrives. The assistant reads it, searches past mail, matches the earlier conversation, updates the client file and drafts a reply for approval. |
| Leads | A scan across inbox, portal enquiries, sign-ins and past clients, ranked by intent. |
| Client files | A pre-meeting briefing: history, what changed, talking points. |
| AI Advertising | Campaign drafts plus 14 days of portal-style daily views (sample figures) and an AI insight. |
| Reports | A weekly vendor report and a monthly landlord report, built as a draft for review. |
| Rentals | A lease renewal: market rent check, fair proposal, drafted letter. |
| Maintenance | A tenant request triaged for urgency, matched to a tradie, with a task created on the property manager's page. |
| Bookings | A week calendar and an inspection booked into a clash-free slot. |
| Agents | A page per agent (tasks, open homes, clients, sales) and a Plan my day demo. |

An animated intro plays once per visit (Skip or Escape ends it; the logo replays it). A guided tour walks through each tool: a short brief, then a walkthrough on the real page where areas lift to the centre of the screen and the assistant runs one step at a time with an explanation.

## How it is built

Plain HTML, CSS and JavaScript. No framework, no build step, no tracking. Hosted on GitHub Pages.

- `index.html`: the Foyer app shell
- `css/style.css`: the design system (dark first, light available)
- `js/core.js`: navigation, theme and the demo engine every tool's AI moment runs on
- `js/data.js`: the shared sample world
- `js/art.js`: generated property artwork (no photographs)
- `js/email.js`, `workspace.js`, `reports.js`, `rentals.js`, `agents.js`: the tools
- `js/intro.js`, `js/tour.js`: the intro and the guided tour
- `discovery.html`: an earlier prototype, Discovery Copilot, which turns messy interview notes into the real problem, a baseline and a success measure using Claude and the visitor's own API key (the key stays in the browser)

## What is real and what is not

- Real: the interface, the animation engine, the design system, accessibility work (keyboard use, focus states, reduced motion, contrast) and the code.
- Not real: all data, all AI behaviour in Foyer, and the portal figures. A production version would use read-only tools over the mailbox and CRM, structured extraction with citations, evaluation on labelled examples, and a person approving every write or send. Portal numbers would depend on each portal's official access, which has not been verified.

## Author

Alex McShane. Built as a portfolio prototype with Claude.

© 2026 Alex McShane. All rights reserved. Published for viewing and evaluation; see LICENSE.
