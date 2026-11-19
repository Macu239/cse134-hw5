# SSG Exercise (Eleventy)

Two pages from my portfolio, Home and Skills, built with [Eleventy](https://www.11ty.dev/) (v3). Both pages use the same footer, which lives in one file: `src/_includes/footer.njk`.

This folder is separate from the main portfolio. The Homework 5 deployment still serves the portfolio from the repository root.

## Requirements

- Node.js 18 or newer
- npm

## Commands

Run every command from this `ssg-exercise/` folder.

```
cd ssg-exercise
```

| Step | Command | What it does |
|---|---|---|
| Install | `npm install` | Installs Eleventy into `node_modules/` |
| Build | `npm run build` | Generates the site into `_site/` |
| Preview | `npm start` | Builds, serves the site, and rebuilds when a file changes |

After `npm start`, open the two pages:

- Home: http://localhost:8080/
- Skills: http://localhost:8080/skills.html

## Project structure

```
ssg-exercise/
  eleventy.config.js      Input src/, output _site/, copies css/js/images as-is
  package.json            Eleventy dependency and the build/start scripts
  src/
    _includes/
      footer.njk          Shared footer, written once
    index.njk             Home page (builds to _site/index.html)
    skills.njk            Skills page (builds to _site/skills.html)
    css/  js/  images/    Assets copied from the portfolio
```

Both pages pull in the footer with:

```
{% include "footer.njk" %}
```

## Check the shared footer

1. Run `npm start` and open both pages.
2. Edit `src/_includes/footer.njk`, for example by adding `<li>Built with Eleventy</li>` to the list.
3. Save. Eleventy rebuilds automatically. If you used `npm run build` instead, run it again.
4. Refresh both pages. Both show the change.

`_site/` and `node_modules/` are generated, so they are not committed.
