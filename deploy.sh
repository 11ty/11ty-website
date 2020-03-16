git stash
git checkout master
git pull origin master
git checkout production-dev
git merge master
git push origin production-dev
git checkout master
git stash pop
