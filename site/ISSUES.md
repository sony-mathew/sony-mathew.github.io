## Issues
* [Assets not loading on GitHub Pages with Custom Domain](https://github.com/vercel/next.js/issues/8316)
* [Deploying static site to GitHub pages needs .nojekyll file](https://github.com/vercel/next.js/issues/2029)
* PurgeCSS was causing isssues. So changed the broadmatcher in `postcss.config.js` to a custom matcher
`const broadMatches = content.match(/(\w+)((-|:)\w+){0,4}/g) || [];`.
