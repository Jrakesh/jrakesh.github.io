---
title: Interesting things to know about GIT
layout: post
toc: true
share: true
comments: true
---

This post is not intended to be about basic git stuff, but stuff you probably didn't know about or used just once or twice.
<ol>
  <li>
    <h1 id="1">Recover a commit from reset --HARD</h1>
    Just use: {% highlight ruby %} git reflog {% endhighlight %}
  </li>

  <li>
    <h1 id="2">Diff</h1>
    If you want to check what is the difference between two branches, you can simply do: {% highlight ruby %} git diff branch1..branch2 {% endhighlight %}
  </li>

  <li>
    <h1 id="3">Show a commit that matches a regex</h1>    
    You can find the last commit in with the message contains the string that was passed, in this case fixes, using the following command:
    {% highlight ruby %} git show :/fixes {% endhighlight %}
  </li>  

  <li>
    <h1 id="4">Limit git push default actions</h1>
    If you run {% highlight ruby %} git push {% endhighlight %} which is the default action is to push all branches on the remote. That can cause many accidents, if you want to prevent them, do this: 
    {% highlight ruby %} git config --global push.default tracking {% endhighlight %}

    UPDATE: Git 2.0 removed this default http://blog.nicoschuele.com/posts/git-2-0-changes-push-default-to-simple
  </li>

  <li>
    <h1 id="5">Checkout a branch, rebase and merge to master</h1>    
    Do this magic: 
    {% highlight ruby %} git rebase HEAD feature && git rebase HEAD @{-2} {% endhighlight %}
  </li>

  <li>
    <h1 id="6">Git stash</h1>
    If you can't commit, because you did not finish your work yet, but something urgent comes up you can use git stash to save those changes, commit your urgent task and then git stash pop to bring your stuff back.
  </li>

  <li>
    <h1 id="7">Aliases</h1>    
    Tired of typing checkout again and again? Go ahead and: 
    {% highlight ruby %} git config --global alias.co checkout {% endhighlight %}
    Now, you can checkout to master by doing: 
    {% highlight ruby %} git co master {% endhighlight %}
  </li>

  <li>
    <h1 id="8">Renaming a local branch</h1>
    You can easily rename a local branch with: 
    {% highlight ruby %} git branch -m old-name new-name {% endhighlight %}
  </li>

  <li>
    <h1 id="9">Searching for an author</h1>
    You can search for a commit by an author by using: 
    {% highlight ruby %} git log --author=jrakesh {% endhighlight %}
  </li>

  <li>
    <h1 id="10">Status with options</h1>
    Most people just use git status, but you can pass arguments to change the way status is shown.
    With the command:
    {% highlight ruby %} git status -sb {% endhighlight %}
    you have an output like this:
    {% highlight ruby %}
		## master
		 M Gemfile
		 M Gemfile.lock
		 M app/controllers/home_controller.rb
		 M app/views/home/index.html.erb
		{% endhighlight %}
  </li>
</ol>
