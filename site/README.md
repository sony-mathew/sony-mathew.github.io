## Personal Blog
Visit [https://sony-mathew.github.io/](https://sony-mathew.github.io/) to view the live website.

## Workflow

### How to add a new blog post? (Detailed)
* Create a new branch based out of master.
* Clone a markdown file in `site/posts`.
* Rename it to appropriate name and change the contents of the markdown file. This is enough for creating a new blog post.
* If your post has images, copy all those to the folder `site/public/images/{name-of-the-markdown-file}/`. You can reference this in the markdown by
```
<img src="/images/posts/{name-of-the-markdown-file}/sql-query.png" />
```
* If you want to have specific styling changes, you can edit the `.scss` files in the `site/styles` directory if it's related to components or edit the `site/public/styles/custom.css` for blog post specific styles.
* If you want to add new custom pages other than blog posts, make changes in the Next.js app residing in `site` directory
* After merging this branch to the master through a PR, be on the master branch and run the following command:
```
$ ./deploy.sh
```

### How to run the Daily News generator?
* The generator entrypoint is `site/scripts/generate-daily-news.mjs`.
* Install dependencies before running it:
```bash
cd site
npm ci
```
* Generate the current day's edition using the default `Asia/Kolkata` timezone:
```bash
npm run generate:daily-news
```
* Generate a specific date:
```bash
npm run generate:daily-news -- --date 2026-04-19
```
* Run without writing any files and print the generated markdown in the JSON output:
```bash
npm run generate:daily-news -- --date 2026-04-19 --dry-run
```
* Replace an existing edition file for a date:
```bash
npm run generate:daily-news -- --date 2026-04-19 --overwrite
```
* Output locations:
  * Markdown edition: `site/daily-news/YYYY-MM-DD.md`
  * Downloaded thumbnails: `site/public/images/daily-news/YYYY-MM-DD/`
* The scheduled automation is defined in `.github/workflows/daily-news.yml`. It generates the day's edition, runs a smoke-test build, and creates or updates a PR automatically.
