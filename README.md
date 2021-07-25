![CodeQL](https://github.com/sony-mathew/sony-mathew.github.io/workflows/CodeQL/badge.svg?branch=master)

# Personal Blog (sony-mathew.github.io)
This is developed using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/). This is hosted using [GitHub Pages](https://pages.github.com/).

Hosted here: [https://sony-mathew.com/](https://sony-mathew.com/?utm_source=Github&utm_medium=dev)

## Workflow

### How to add a new blog post?
* Create a new branch based out of `master`.
* Clone a markdown file in `site/posts`.
* Rename it to appropriate name and change the contents of the markdown file. Commit and push your changes to the branch.
* After merging this branch to the `master` through a PR, be on the `master` branch and run the following command:
```
$ ./deploy.sh
```

*PS: God save y'all who push directly to `master`.*

### How does this work?
The deploy script will automatically checkout the `deploy` branch (This is set as branch to be served for GitHub Pages in the repo settings). It will then merge the `master` branch into `deploy` and build and export the static website to the root of the repo. After that it will  stage all the changes, commit automatically, push the commit to the remote and checkout `master` branch.

Take a look at the `deploy.sh` file in the root of the repo to understand how this is done.

## A Note For Developers
This is developed using `Next.js` and hosted using `Github Pages`. The build for the static website is in the branch named `deploy` and served directly from that branch.

While using `Next.js` to build a static website served using `GitHub Pages`, the issues I encountered are
documented [here](https://github.com/sony-mathew/sony-mathew.github.io/blob/master/site/ISSUES.md).
