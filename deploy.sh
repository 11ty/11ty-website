git stash
git checkout master
git pull origin master
git checkout production
git merge master
git push origin production
git checkout master
git stash pop
