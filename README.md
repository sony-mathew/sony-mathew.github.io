![CodeQL](https://github.com/sony-mathew/sony-mathew.github.io/workflows/CodeQL/badge.svg?branch=master)

# sony-mathew.github.io
Portfolio Website / Personal Blog  
Visit: [https://sony-mathew.com/](https://sony-mathew.com/?utm_source=Github&utm_medium=dev)

## Workflow

### Adding a new post
* Create a new branch based out of master.
* Clone a markdown file in `site/posts`.
* Rename it to appropriate name and change the contents of the markdown file. This is enough for creating a new blog post.
* If your post has images, copy all those to the folder `site/public/images/{name-of-the-markdown-file}/`. You can reference this in the markdown by
```
<img src="/images/posts/{name-of-the-markdown-file}/sql-query.png" />
```
* If you want to have specific styling changes, you can edit the `.scss` files in the `site/styles` directory if it's related to components or edit the `site/public/styles/custom.css` for blog post specific styles.
* If you want to add new custom pages other than blog posts, make changes in the Next.js app residing in `site` directory
* After merging this branch to the master through a PR, be on the master branch and run
```
$ ./deploy.sh
```

### Working
The deploy script will automatically checkout the `deploy` branch (This is set as branch to be served for GitHub Pages in the repo settings). It will then merge the `master` branch into `deploy` and build and export the static website to the root of the repo. It will then stage all the changes and commit automatically. After committing this and pushing this to github remote, this will checkout `master` branch.

Take a look at the `deploy.sh` file in the root of the repo to understand how this is done.


## A Note For Devs
This is developed using `Next.js` and hosted using Github Pages. The build for the static website is in the branch named `deploy` and served directly from that branch.

While using `Next.js` to build a static website served using GitHub Pages, the issues I encountered are
documented [here](https://github.com/sony-mathew/sony-mathew.github.io/blob/master/site/ISSUES.md).
