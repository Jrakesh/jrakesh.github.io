---
title: AngularJS For Beginners
layout: post
toc: true
share: true
comments: true
---

AngularJS is a JavaScript framework developed by Google that makes coding web apps painless, quick, and easy! In this tutorial, I'll try to guide you through the basics of this framework and what it has to offer.

<h1 id="enable">Enabling AngularJS</h1>

To install AngularJS into your web project, just head over to [AngularJS's website](http://angularjs.org/) and click the download button. This will show you a couple of options. Personally, I use the CDN as the following:

{% highlight html %}
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Learning AngularJS</title>
</head>
<body>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
</body>
</html>
{% endhighlight %}

Now that AngularJS is available to us, we must tell it where our web app is. This is simply accomplished by including an `ng-app` attribute inside the container that houses our app. For now, we'll put it inside the `html` tag as such:

{% highlight html %}
<!DOCTYPE html>
<html lang="en" ng-app>
<head>
	<meta charset="utf-8">
	<title>Learning AngularJS</title>
</head>
<body>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
</body>
</html>
{% endhighlight %}

<h1 id="dataBinding">Basic Data Binding</h1>

Now that the installation is complete, we can start with the basics of AngularJS! Data binding permits your web app's HTML to directly communicate with the app's JavaScript. Those of you familiar with the [MVC pattern](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) (Model-View-Controller) should know that data binding in this framework allows the view and model to directly communicate and update based on the other's data. The following is an example of data binding:

{% highlight html %}
<!DOCTYPE html>
<html lang="en" ng-app>
<head>
	<meta charset="utf-8">
	<title>Learning AngularJS</title>
</head>
<body>
	<input type="text" ng-model="user_name" />
	<p>{% raw %}{{ user_name }}{% endraw %}</p>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
</body>
</html>
{% endhighlight %}

Here, the `ng-model` tells AngularJS to make the data from the `input` a variable that can be accessed and manipulated through the web application's script. In addition, a programmer can output any variables that he/she defines through AngularJS by using double braces (\{\{ \}\}) as shown above. In the code, the user's name is retrieved using `ng-model="user_name"` and then it is displayed in `<p>` tags using <code>&#123;&#123; user_name &#125;&#125;</code>. Here's what it produces:

<div class="codepen"><pre class="codepen" data-height="300" data-type="result" data-href="cuwyI" data-user="srig99" data-safe="true"> <code> </code> <a href="http://codepen.io/srig99/pen/cuwyI">Check out this Pen!</a> </pre> <script src="http://codepen.io/assets/embed/ei.js"> </script></div>

One can also output answers to simple math using AngularJS. For example, two numbers can be taken from `<input type="number">` tags and then their sum can be displayed like so:

{% highlight html %}
<!DOCTYPE html>
<html lang="en" ng-app>
<head>
	<meta charset="utf-8">
	<title>Learning AngularJS</title>
</head>
<body>
	<input type="number" ng-model="num1" />
	<input type="number" ng-model="num2" />
	<p>The sum is: {% raw %}{{ num1 + num2 }}{% endraw %}</p>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
</body>
</html>
{% endhighlight %}

Here's what the previous code creates:

<div class="codepen"><pre class="codepen" data-height="300" data-type="result" data-href="Fsila" data-user="srig99" data-safe="true"> <code> </code> <a href="http://codepen.io/srig99/pen/Fsila">Check out this Pen!</a> </pre> <script src="http://codepen.io/assets/embed/ei.js"> </script></div>

<h1 id="controllers">Controllers</h1>

> Controllers allow the user to change the web application's data and thus manipulate the app's output (or the view in MVC terms).

What if you needed more functionality than the simple apps seen above? Well, AngularJS provides controllers just for that reason! Controllers allow the user to change the web application's data and thus manipulate the app's output (or the view in MVC terms). Let's create a simple app to demonstrate.

The HTML:

{% highlight html %}
<!DOCTYPE html>
<html lang="en" ng-app ng-controller="MainCtrl">
<head>
	<meta charset="utf-8">
	<title>Learning AngularJS</title>
</head>
<body>
	<h1>The People App</h1>
	<h4>View People</h4>
	<ul>
		<li ng-repeat="person in people">
			{% raw %}{{ person.name }} from {{ person.city }}, {{ person.state }}{% endraw %}
		</li>
	</ul>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
</body>
</html>
{% endhighlight %}

The JavaScript:

{% highlight javascript %}
function MainCtrl ($scope) {
  $scope.people = [
    {
      name: 'John Doe',
      city: 'New York City',
      state: 'New York'
    },
    {
      name: 'John Smith',
      city: 'Oklahoma City',
      state: 'Oklahoma'
    },
    {
      name: 'Henry Black',
      city: 'Topeka',
      state: 'Kansas'
    }
  ];
}
{% endhighlight %}

First off, in the HTML, we tell AngularJS that the app uses the controller named *MainCtrl* by typing `ng-controller="MainCtrl"` as a `<html>` tag attribute. This allows the HTML to communicate with the JavaScript. Next, we use `ng-repeat` to loop through each `person` in the `people` JSON object that is created in the JavaScript code. The following description of `ng-repeat` is from the AngularJS [API](http://docs.angularjs.org/api/):

> The ngRepeat directive instantiates a template once per item from a collection. Each template instance gets its own scope, where the given loop variable is set to the current collection item, and $index is set to the item index or key.

Inside each `<li>` the values for the name, city, and state keys are used from the JSON object using the `person` variable defined in `ng-repeat`. Let's take a look at the result of the code above:

<div class="codepen"><pre class="codepen" data-height="300" data-type="result" data-href="tEAnJ" data-user="srig99" data-safe="true"> <code> </code> <a href="http://codepen.io/srig99/pen/tEAnJ">Check out this Pen!</a> </pre> <script src="http://codepen.io/assets/embed/ei.js"> </script></div>

Next, we can add a feature to allow the user to input names into the `people` object! First, we will need to modify the HTML as so:

{% highlight html %}
<!DOCTYPE html>
<html lang="en" ng-app ng-controller="MainCtrl">
<head>
	<meta charset="utf-8">
	<title>Learning AngularJS</title>
</head>
<body>
	<h1>The People App</h1>
	<h4>View People</h4>
	<ul>
		<li ng-repeat="person in people">
			{% raw %}{{ person.name }} from {{ person.city }}, {{ person.state }}{% endraw %}
		</li>
	</ul>

	<h4>Add People</h4>
	Enter the person's name: <input type="text" ng-model="person_name" />
	<br />
	<br />
	Enter the person's city: <input type="text" ng-model="person_city" />
	<br />
	<br />
	Enter the person's state: <input type="text" ng-model="person_state" />
	<br />
	<br />
	<button ng-click="addPerson()">Add the Person!</button>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
</body>
</html>
{% endhighlight %}

Next, we'll update the JavaScript as so:

{% highlight javascript %}
function MainCtrl ($scope) {
  $scope.people = [
    {
      name: 'John Doe',
      city: 'New York City',
      state: 'New York'
    },
    {
      name: 'John Smith',
      city: 'Oklahoma City',
      state: 'Oklahoma'
    },
    {
      name: 'Henry Black',
      city: 'Topeka',
      state: 'Kansas'
    }
  ];
  $scope.addPerson = function () {
	$scope.people.push({
		name: $scope.person_name,
		city: $scope.person_city,
		state: $scope.person_state
	});
	$scope.person_name = '';
	$scope.person_city = '';
	$scope.person_state = '';
  }
}
{% endhighlight %}

In the HTML, `ng-click` allows the `MainCtrl` function `addPerson()` to get executed when the button is clicked. The function `addPerson()` simply pushes the new person, with the data from the three `<input>` tags, into the `people` JSON object. Then, the list we created earlier (to display the people) gets automatically updated with the new person that was just added. Here's the updated app:

<div class="codepen"><pre class="codepen" data-height="300" data-type="result" data-href="qEiDH" data-user="srig99" data-safe="true"> <code> </code> <a href="http://codepen.io/srig99/pen/qEiDH">Check out this Pen!</a> </pre> <script src="http://codepen.io/assets/embed/ei.js"> </script></div>

<h1 id="filters">Filters</h1>

AngularJS filters filter data inside your web application. This can lead to features such as searching, ordering, and more! Let's add a search functionality to The People App that we have been working on. First, we need to add a new `<input>` tag for the search text. Then we will need to filter the results in the `<ul>` list using the search text. The new modified code will be:

{% highlight html %}
<!DOCTYPE html>
<html lang="en" ng-app ng-controller="MainCtrl">
<head>
	<meta charset="utf-8">
	<title>Learning AngularJS</title>
</head>
<body>
	<h1>The People App</h1>
	<h4>View People</h4>
	Search! <input type="text" ng-model="search" />
	<ul>
		<li ng-repeat="person in people | filter:search">
			{% raw %}{{ person.name }} from {{ person.city }}, {{ person.state }}{% endraw %}
		</li>
	</ul>

	<h4>Add People</h4>
	Enter the person's name: <input type="text" ng-model="person_name" />
	<br />
	<br />
	Enter the person's city: <input type="text" ng-model="person_city" />
	<br />
	<br />
	Enter the person's state: <input type="text" ng-model="person_state" />
	<br />
	<br />
	<button ng-click="addPerson()">Add the Person!</button>

	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js"></script>
</body>
</html>
{% endhighlight %}

The only new code we needed to add was of course the search `<input>` and the `filter:search` inside the `ng-repeat` attribute! The pipe character (|) inside the `ng-repeat` simply allows the filter to use the data from the `people` JSON object. Let's view the search in action!

<div class="codepen"><pre class="codepen" data-height="300" data-type="result" data-href="DrFfs" data-user="srig99" data-safe="true"> <code> </code> <a href="http://codepen.io/srig99/pen/DrFfs">Check out this Pen!</a> </pre> <script src="http://codepen.io/assets/embed/ei.js"> </script></div>

<h1 id="directives">Directives</h1>

The final topic we will be discovering in AngularJS today will be directives, which are custom HTML elements or attributes created using AngularJS. Making a new directive is simple! Let's say you wanted to create a directive (we will name it emphasize) which looks like this: `<p emphasize></p>` or this: `<emphasize></emphasize>`. First, we will need to declare a module (see [this](http://upload.wikimedia.org/wikipedia/commons/f/fd/MVC-Process.png) if you need to see how a model interacts with a view and controller) like so:

{% highlight javascript %}
angular.module('sampleDirective', []);
{% endhighlight %}

Next, we can chain the `directive()` method onto the previous code to add a directive to the module.

{% highlight javascript %}
angular.module('sampleDirective', []).directive('emphasize', function () {
	return {
		restrict: 'E,A',
		template: '<span style="color: red;font-size: 40px;">This is the emphasize directive!</span>'
	};
});
{% endhighlight %}

Inside the directive function, we are restricting the directive to only elements and attributes using `restrict: 'E,A'`. Whenever the emphasize directive is used, the element that contains the attribute or the emphasize tag itself will be replaced with the content present in `template` above. You can view the code below!

<div class="codepen"><pre class="codepen" data-height="300" data-type="result" data-href="qIdBE" data-user="srig99" data-safe="true"> <code> </code> <a href="http://codepen.io/srig99/pen/qIdBE">Check out this Pen!</a> </pre> <script src="http://codepen.io/assets/embed/ei.js"> </script></div>

<h1 id="furtherReading">Further Reading</h1>

Well, that's it for now! To discover more about AngularJS, you can go to the framework's amazing API [here](http://docs.angularjs.org/api/) and the AngularJS official website [here](http://angularjs.org/). You can watch some awesome videos on AngularJS [here](http://www.egghead.io/) and [here](http://www.youtube.com/watch?feature=player_detailpage&v=i9MHigUZKEM). Go to [Built With AngularJS](http://builtwith.angularjs.org/) to see actual apps created with AngularJS in action! If you still need resources, check out [this](https://github.com/angular/angular.js/wiki/JsFiddle-Examples) exhaustive list of JSFiddles dealing with AngularJS. Thanks for reading and be sure to check out future tutorials that I will be making about AngularJS!

