# Jeremy Shih - CSE 134B Homework 5

| Field | Value |
|-------|-------|
| Repository URL | https://github.com/Macu239/cse134-hw5 |
| Deployed URL | https://jeremyresumehw5.netlify.app/ |
| Working component page | https://jeremyresumehw5.netlify.app/experiments.html |

## SSG Exercise

- Folder: `ssg-exercise/` (Eleventy). Commands are in `ssg-exercise/README.md`
- Pages to preview: Home (`/`) and Skills (`/skills.html`), sharing `src/_includes/footer.njk`

## Design Note: `<fact-panel>`

- **Goal:** The visitor gets a random useless fact on demand and can hide the source line.
- **One action:** "Get a fact" calls `loadFact()`, which disables the button and calls `fetch()` on the Useless Facts API. It checks `response.ok`, parses the JSON, checks that `text` is a string, then `render()` shows the fact and source with `textContent`. `finally` re-enables the button.
- **Waiting:** The status says "Loading a fact..." and the button is faded.
- **Success:** The new fact and source appear, and the status says "New fact loaded."
- **Failure:** The status says the request failed and asks the visitor to press Get a fact again. A retry works without reloading the page.
- **Compact mode:** The outer button toggles the observed `compact` attribute. The choice is saved in localStorage (`hw5-fact-panel-mode`) and restored on load, with `expanded` as the fallback.
- **No JS:** A `<noscript>` message appears, and the rest of the site still works.
