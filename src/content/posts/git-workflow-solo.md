---
title: Git Workflow (Solo)
date: "2025-10-08"
description: "A practical, step-by-step guide to mastering Git workflows for solo developers, from branching and committing to handling interruptions and merging. Essential tips for efficient version control and clean project management."
---

![git-workflow-solo-main-image.png](/images/blog/git-workflow-solo/git-workflow-solo-main-image.png)

In this post I will share with you the git workflow I use when developing this blog. By the end of this post you will have just enough practical know-how to get started on your own solo projects, so that you can start making your own mistakes to learn from.

## The Workflow

1. **Main Branch:** Production code. Only tested code is merged into this branch.
2. **Temporary Branch:** Create a new branch whenever changes are to be made. (ie. feature, refactor, bug-fix, etc.)
3. **Commits:** Commit small, atomic changes. Commit often. Use descriptive commit messages.
4. **Push:** Push branches to remote repository regularly.
5. **Merge to Main / Pull requests:** When a feature is complete and tested, create a pull request and merge into main.
6. **Delete Temporary Branch:** After a temporary branch is merged into main, delete it.
7. **Pull from Main:** Pull from main to synchronize the local ready for the next branch.

## The Process

Whenever I need to make a change to the codebase, for whatever reason, whether it's a new feature, refactoring, fixing a bug, or adding content, I follow the following steps:

1. Break down the task into smaller tasks and subtasks.
2. Create a new branch and start working crossing off the list one by one.
3. When a list item is complete, commit the changes.
4. When the entire list is complete, push the branch, test, and merge via a pull request.
5. Delete both the local and remote temporary branches
6. Pull from main to synchronize the local repository.

Let's break it down with an example.

## Example Scenario

We want to add a blog feature to our site. After breaking it down to smaller tasks and subtasks, we begin by creating a new branch.

```bash
# synchronize the main branch with remote
git checkout main
git pull

# create a new branch
git checkout -b feature/blog
```

Now we're ready to begin working on the feature, crossing off the list of tasks one by one.

_Tip: Only make changes related to the current branch. **Resist the urge!** Check Bonus section below for ways to achieve this._

Once a list item is complete, commit the changes.

```bash
# commit after a list item is done
git add .
git commit -m "add new fields to Post object"
```

Rinse and repeat until the entire list is complete. Once done, push the branch to remote.

```bash
# push the branch to remote
git push origin feature/blog
```

Here, we test our changes to make sure everything is working as expected. If so, we head over to Github and create a pull request. We then merge the pull request into the main branch and delete the remote `feature/blog` branch.

Then, we delete the local `feature/blog` branch and synchronize the local repository.

```bash
# pull from main to synchronize the local repository
git checkout main
git pull

# delete local branch
git branch -D feature/add-categories
```

You might be asking "Why go through the trouble of pushing the branch to remote?". Well, I do it because my blog is published to Vercel, and pushing branches to remote triggers a staging deployment. I can then test the changes on the staging deployment before merging into main.

An additional minor benefit is that pushing to remote creates a backup of the branch in case you lose your local copy for whatever reason (coffee spillage, stolen laptop, etc.).

But, if you find it unnecessary, you can skip pushing the temporary branch to remote and merge locally after thorough testing and push main to keep the remote repository in sync instead.

```bash
# merge locally
git checkout main
git merge feature/add-categories

# push main to keep remote repository in sync
git push

# delete local branch
git branch -d feature/add-categories
```

And that concludes the workflow.

## Bonus

The example I gave above is enough for when everything goes perfectly. But, real life is rarely ever perfect.

Here are some scenarios I've personally encountered and the Git commands that I find useful.

### Interruptions

Often times you will be interrupted mid-development on a temporary branch, and you feel compelled to make progress on a separate task.

The way I see it, there are two types of interruptions. The convenient type and the not-so-convenient type.

#### The Convenient Type

This is when you are conveniently interrupted between commits. You don't have any untracked files, or uncommitted changes. When you run `git status` you see a clean slate.

In this case, you can simply switch to the main branch and begin the six-step process to make the changes.

So, you follow the six-step process above, and you are back on main. An updated main. One that has your most recent changes. But, the temporary branch you were working on was branched off of an older version of main; different base. If you try to merge without updating your branch to the latest version of main, you will get a lot of merge conflicts. Every change you made during your little sidetrack progress in the code base will be a merge conflict. It's not fun.

To prevent this, right before you start a pull request, update the temporary branch to the latest version of main.

```bash
# update the temporary branch to the latest version of main
git checkout feature/add-categories
git fetch origin
git merge origin/main
```

Now you are safe to continue the process.

#### The Not-so-convenient Type

But, most of the time you'll find that you need to switch branches between commits. You have untracked files, or uncommitted changes. When you run `git status` you see a few lines of red and green text.

These changes are not quite ready to be committed, but you've made enough progress in the right direction to justify saving them. In this case, you can use `git stash` to save the changes before switching.

```bash
# save the changes
git stash

# do what you need to do

# switch back to the branch
git checkout feature/add-categories

# apply the stashed changes
git stash pop
```

And, you're back to your previous branch with all your changes intact just as you left them. From here you continue working on the temporary branch as if nothing happened. And, don't forget to `fetch` and `merge` to keep main updated if changes were merged into main while you were away.

This is a great tool to use to help you adhere to the principle of "Only make changes related to the current branch." Often times you will get stuck on a branch and it would be more productive to make progress on a different branch before returning to it at a later time.

### Tip

`git stash` is very useful when you want to try different approaches to a problem. You can stash the changes and try a different approach. You can stash the changes, try a different approach, then apply different ones to compare, commit the best one, and clear the stash.

Here are some useful `git stash` commands for this purpose:

```bash
# saving with a custom message
git stash push -m "my custom message"

# list stashes
git stash list

# apply specific stash
git stash pop stash@{0}

# clear stash
git stash clear
```

With what we know so far, we can construct some rules to follow to help us adhere to the workflow.

### Rule of Thumb

1. Before starting a new branch:
   ```bash
   git checkout main
   git pull
   ```
2. Only make changes related to the current branch.
3. Commit small, atomic changes. Commit often. Use descriptive messages.
4. Stash changes when interrupted between commits.
5. Before pull request:
   ```bash
   git checkout branch-name
   git fetch origin
   git merge origin/main
   ```
6. After merge:
   ```bash
   git checkout main
   git pull
   git branch -D branch-name
   git push origin --delete branch-name
   ```

## Closing Remarks

You now have enough practical know-how to get started on your own solo projects. Give it a try. Take it out for a test drive.

Build. Break. Learn.

For the theory behind Git, check out the free [Git book](https://git-scm.com/book/en/v2).
