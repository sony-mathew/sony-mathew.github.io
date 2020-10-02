#!/bin/bash

# move to site folder
echo CD-ing to site folder..
cd ./site

# build and export as static html site
echo Building and Exporting..
npm run export

# copy out folder to docs folder
echo Moving files to docs folder..
cp -R ./out ../docs
