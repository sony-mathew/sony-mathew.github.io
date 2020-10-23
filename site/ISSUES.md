## Issues
* [Assets not loading on GitHub Pages with Custom Domain](https://github.com/vercel/next.js/issues/8316)
* [Deploying static site to GitHub pages needs .nojekyll file](https://github.com/vercel/next.js/issues/2029)
* PurgeCSS was causing isssues. So changed the broadmatcher in `postcss.config.js` to a custom matcher
`const broadMatches = content.match(/(\w+)((-|:)\w+){0,4}/g) || [];`.
* [Adding Google analytics to the website](https://hoangtrinhj.com/using-google-analytics-with-next-js)
* [Make the Mailchimp Subscriber popup appear on click](https://gist.github.com/scottmagdalein/259d878ad46ed6f2cdce)
