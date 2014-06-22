---
title: Create a rubygem step by step
layout: post
toc: true
share: true
comments: true
---

While working on one of my projects that uses the Facebook API, I started wondering, what is a gem exactly? It works like a library, gives your application some ready-to-use functionality, but how it actually works?

Every RoR developer will have to modify a gem at least once in his or her career, but not everybody has actually created a gem. For the development of that project, I frequently had to use various Facebook widgets. I googled out for some good rubygems that provide such provisions but the scenario raised my eyebrow, not a single rubygem that offered support to widgets of more than one social media. 

Each gem was dealing with one specific social media at a time. Thats really frustrating when you are using lot of social widgets in one application because everytime you have to add different gems for different widgets. 

This is what got me going. I had to know exactly HOW you create a gem and  I created my first ever rubygem that comes to the rescue. The gem is called [go_social](http://rubygems.org/gems/go_social).


<h1 id="step1">Step1: Get Started</h1>
To get a gem started you need to run:

{% highlight ruby %}
bundle gem your_gem_name
{% endhighlight %}

This will create some basic files and directories that you need to start developing a gem. For example:
<img src="/img/posts/create-gem.png"></img>


<h1 id="step2">Step2: Naming The Gem</h1>
Don’t think for a second that the name of a gem is some random string though. Keeping such a large and open community as is RoR in order needs defining guidelines for pretty much everything. This is no exception:
<ul>
  <li>every dash represents a structure (folder, module) immersion</li>
  <li>every underscore represents a joining in the class name</li>
</ul>
Let me give you some examples to make it clear:
<ul>
  <li>gem ruby_parser</li>
  <li>require 'ruby_parser'</li>
  <li>module/class RubyParser</li>
</ul>
and:
<ul>
  <li>gem gem-structure-gem_name</li>
  <li>require 'gem/structure/gem_name</li>
  <li>module/class Gem::Structure::GemName</li>
</ul>



<h1 id="step3">Step3: The Package</h1>
Ok, let’s go through what the bundle command did for us. Besides basic stuff, like a LICENSE.txt, README.md files and initializing a GitHub repo in our directory we get:

Gemfile - well, we’ve all seen in it before, but here this file looks a bit differently. It’s practically empty. That’s because all our development dependencies go into the *.gemspec file, which is included here. If your gem needs to use some other gems to work after it’s included to a RoR app, you should put it into this Gemfile.

*.gemspec - this is where you add all of your gem’s development dependencies, and much more.

What is a development dependency? It’s what you use while creating the gem. Things like rspec, rake and bundler should be in this file, because those might not be necessary for the person adding this gem to his or hers Gemfile. In this file you will need to declare the version of your gem as well. You can do it by referencing YourGem module’s variable ‘VERSION’.

Here you will also need to list all the files that should be included to your gem. By default the bundler uses git ls-files command, but if you don’t want to use git it’s up to you how you list them.

Rakefile sounds familiar as well.

Here, at the start it’s a simple one line file, where you require gem_tasks from the bundler.

And finally the your_gem_name.rb file! As you can see, your code goes there ;).



<h1 id="step4">Step4: Extend Rails</h1>
So, now you can start coding, you can test your gem and so on, but it still won’t be ‘tied’ to a Rails application if you add it to its Gemfile.

To extend Rails with your gem you will need to use Railtie, create a Railtie class which inherits from Rails::Railtie within your gem’s namespace. This class will be loaded during the Rails boot up.

Now you can use your gem with Rails! :)



<h1 id="step5">Step5: Gem Versioning</h1>
Since you’re all set up to create your gem, you should know a couple of things about sharing what you create.
<ol>
  <li>There is a strict convention in regards to the gem versioning system. If you want to push your gem out to the world, you need to keep track of the changes you make.</li>
  <li>A gem version is a string of 3 numbers divided by dots - ‘X.X.X’.</li>
  <li>Incrementing either of those 3 numbers means a different type of change has occurred in the gems implementation.</li>
    <ul>
      <li>incrementing the third number, called the ‘build’ number means that the change was small (e.g. changing text on a button) and did not affect the functionality of the gem</li>
      <li>incrementing the second number, called the ‘minor’ number means that changes included adding new functionality, but the gem did not lose compatibility with the previous versions.</li>
      <li>incrementing the first number, called the ‘major’ number means that the changes made to the gem were so severe that it’s no longer compatible with the previously released versions.</li>
    </ul>
</ol>
There is a gem that helps you version your gem. Check it out: [gem-release](https://github.com/svenfuchs/gem-release). It lets you bump the version on any of those three numbers with a simple ‘bump’ command.


<h1 id="step6">Step6: Push The Gem</h1>
Finally, there is one last thing to do… Push the gem! :) To get it done, you’ll need to create an account on RubyGems.org. Once that’s finished, use your email and password when pushing the gem (RubyGems saves the credentials in ~/.gem/credentials for you so you only need to log in once).

After that it’s just a matter of making it available to other rubyists all over the world through rubygems.org. This is done with with two simple commands:

{% highlight ruby %}
rake build
{% endhighlight %}

and once built:

{% highlight ruby %}
gem push your_gem_name-0.0.1.gem
{% endhighlight %}


<h1 id="step7">Step7: Final Touch!</h1>
You can add badges of gem-version and code-climate. And that’s all it takes to create a gem! Have fun creating amazing new gems and share them with us! :)

