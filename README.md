![CodeQL](https://github.com/sony-mathew/sony-mathew.github.io/workflows/CodeQL/badge.svg?branch=master)

# sony-mathew.github.io
Portfolio Website / Personal Blog  
Visit: [https://sony-mathew.github.io/](https://sony-mathew.github.io/)

## Workflow
Make changes in the branch based out of master:
* Add a post/project as markdown files in `site/posts` or `site/projects`
* Make styling changes or add new pages in the Next.js app residing in `site` directory

After merging this branch to the master through a PR, be on the master branch and run
```
$ ./deploy.sh
```
This will automatically checkout the `deploy` branch (This is set as branch to be served for GitHub Pages in the repo settings). It will then merge the `master` branch into `deploy` and build and export the static website to the root 
of the repo. It will then stage all the changes and commit automatically.

Take a look at the `deploy.sh` file in the root of the repo to understand how this is done.


## A Note For Devs
This is developed in `Next.js`. The build for the static website is in the branch named `deploy` and served directly from that branch.

While using `Next.js` to build a static website served using GitHub Pages, the issues I encountered are
documented [here](https://github.com/sony-mathew/sony-mathew.github.io/blob/master/site/ISSUES.md).
