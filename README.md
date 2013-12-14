## AngularJS SPA Template for Visual Studio

This project is a skeleton for a simple single-page web application (SPA) built on top of the:

 - **[AngularJS 1.2.3](http://www.angularjs.org)** - JavaScript Framework
 - **[Bootstrap 3.0.3](http://getbootstrap.com/)** - CSS Framework (based on [LESS](http://lesscss.org/))
 - **[HTML5 Boilerplate](http://html5boilerplate.com/)** - HTML5 best practices
 - **[ASP.NET Web Pages 3.0](http://www.asp.net/web-pages)** (Razor) - AngularJS templates / views
 - **[ASP.NET Web Optimization Framework](http://www.asp.net/mvc/tutorials/mvc-4/bundling-and-minification)** - Bundling & Minification

You can use it to quickly bootstrap your AngularJS web app projects and dev environment for these projects.

Just clone the repo, open solution file from the ```Source``` folder and you are ready to develop
and test your application.

### Demo Site

http://angular-demo.tarkus.me

### Visual Studio Extension

[![AngularJS SPA Template for Visual Studio](http://i.imgur.com/sl8JZtz.png)](http://visualstudiogallery.msdn.microsoft.com/5af151b2-9ed2-4809-bfe8-27566bfe7d83)

### Project Structure

![AngularJS SPA Project Structure](http://i.imgur.com/gEBRhe6.png)

### Development Environment

 - [Visual Studio 2013](http://www.visualstudio.com) with extension(s):
   - [Web Essentials 2013](http://visualstudiogallery.msdn.microsoft.com/56633663-6799-41d7-9df7-0f2a504ca361)

*Hint: make sure that you have the latest version and updates for Visual Studio and required extensions installed*

### Getting Started

To clone the repo run:

```bash
git clone -o base https://github.com/KriaSoft/AngularJS-SPA-Template.git MyApp
````

Where ```MyApp``` is your project name. Then rename the included solution file:

```bash
git mv Source/Application.sln Source/MyApp.sln
git add .
git commit -m 'Rename Application.sln file'
```

Open ```MyApp.sln``` in Visual Studio and you are ready to go.

Later on you can always pull and merge the latest changes from [AngularJS SPA Template](https://github.com/KriaSoft/AngularJS-SPA-Template)
repo into your project by running the following commands:

```bash
git fetch base
# Fetches any new changes from the AngularJS SPA Template repository (base)
git merge base/master
# Merges any changes fetched into your working files
```

### Feedback

Have questions or need help? Email me at [hello@tarkus.me](mailto:hello@tarkus.me) or Skype: koistya
