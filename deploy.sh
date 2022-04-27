#!/usr/bin/env sh

# abort on errors
set -e

# build
#npm run build

# navigate into the build output directory
cd dist

git init
git config --global user.email "viryl1515@gmail.com"
git config --global user.name "viryl15"
git add -A
git commit -m 'deploy'

git push -f git@github.com:viryl15/vuejs-portfolio.git main:gh-pages

cd -