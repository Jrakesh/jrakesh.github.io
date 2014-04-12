---
title: An evening affair with Rails v4.1.0
layout: post
toc: true
share: true
comments: true
---

Hello rails lovers! Rails 4.1.0 is out there. Let's go over some of my favorite new goodies that it offers, along with some thoughts on why I think they are useful.



<h1 id="spring">Spring</h1>
[Spring](https://github.com/rails/spring) is the new application preloader. An average Rails app probably take around ~5 seconds to boot. That’s 5 seconds wasted every time you run your tests, even when you are just running a single isolated test case! If you are following TDD, you are probably doing this 50 times a day. That’s 5 days wasted in the last five years! Luckily for all of us, new applications generated with Rails 4.1 comes with built-in integration with the spring application preloader. With Spring, your application is a persistent process that can be reused across commands, so only the first run is slow. And it automatically detect code changes, and reload just those parts. It makes a big difference!



<h1 id="mailerPreview">Mailer Preview</h1>
It makes testing an email template while developing dead simple! Fortunately for us, [@pixeltrix](https://github.com/pixeltrix) did the hard work to integrate the [MailView](https://github.com/basecamp/mail_view) gem into Rails 4.1. You can now easily create previews for your mailers and view them in the browser from http://localhost:3000/rails/mailers:

{% highlight ruby %}
# In /test/mailers/previews/notifier_preview.rb
class NotifierPreview < ActionMailer::Preview
  def welcome
    # Mock up some data for the preview
    user = FactoryGirl.build(:user)

    # Return a Mail::Message here (but don't deliver it!)
    Notifier.welcome(user)
  end
end
{% endhighlight %}

It should be noted that although the preview files live under the test directory by default (which can be changed via config.action_mailer.preview_path).



<h1 id="enums">Enums</h1>
Enums to the rescue! Have you ever used multiple boolean columns to compose a single complex state on your models? I’ve definitely done this before and things get out of hand really quickly.

{% highlight ruby %}
class Issue < ActiveRecord::Base
  # Relevant schema change looks like this:
  #
  # create_table :issues do |t|
  #   t.column :status, :integer, default: 0 # defaults to the first value (i.e. :new)
  # end

  enum status: [ :new, :assigned, :in_progress, :resolved, :rejected, :reopened ]

  belongs_to :assignee, class_name: 'Developer'

  def assignee=(developer)
    if developer && self.new?
      self.status = :assigned
    else
      self.status = :new
    end

    super
  end
end

Issue.resolved           # => a scope to find all resolved bugs

Issue.resolved?          # => check if issue has the status :resolved

Issue.resolved!          # => update! the issue with status set to :resolved

Issue.status             # => a symbol describing the issue's status

Issue.status = :resolved # => set the issue's status to :resolved
{% endhighlight %}

Internally, these states are mapped to integers in the database to save space. It’s also worth mentioning that the methods added by the enum macro are mixed-in via a module. This means you can easily override them in your model and use super to reach the original implementation.



<h1 id="actionPackVariants">Action Pack Variants</h1>
With Action Pack Variants in Rails v4.1, you can tailor your views to serve the most relevant content and workflow for specific device categories. You can now have individual templates for the desktop, tablet, and phone views while sharing all the same controller logic.

{% highlight ruby %}
class ApplicationController < ActionController::Base
  before_action :detect_device_variant

  private

    def detect_device_variant
      case request.user_agent
      when /iPad/i
        request.variant = :tablet
      when /iPhone/i
        request.variant = :phone
      end
    end
end

class PostController < ApplicationController
  def show
    @post = Post.find(params[:id])

    respond_to do |format|
      format.json
      format.html               # /app/views/posts/show.html.erb
      format.html.phone         # /app/views/posts/show.html+phone.erb
      format.html.tablet do
        @show_edit_link = false
      end
    end
  end
end
{% endhighlight %}

This example sets up a 'before_action' filter to match the User-Agent HTTP header against certain keywords, and assign the request.variant accordingly. By specifying the supported variants in the 'respond_to' block, Rails will render the appropiate template for the specific format and variant combination. It also allows you to run additional variant-specific code by passing a block.



<h1 id="secrets">Secrets.yml</h1>
A really awesome security change. In the config folder of Rails 4.1, you will now find a secrets.yml file. This is used to manage the secret_key_base for your application. Additionally, this file can be used to store other keys like the ones used for external APIs.
