# css styleguide boilerplate

This is a brief NodeJS/Grunt starter project, or a simple bootstrap, for web developers who just want to start simple from scratch with a css styleguide.
No fluff, just start coding right away on HTML5/CSS and Javascript as soon as you clone the project!

## How To Dev

1. Install node w. npm
2. Install grunt with `npm install -g grunt-cli`
3. Install dependencies with `npm install`
4. Run `grunt` to start server and browse to index

To get started look at `_gh_pages/index.html`.

## The "assemble" task

### Overview
In the project's Gruntfile, the example `assemble` task is pre-loaded with paths and options following standard Grunt.js conventions:

```js
grunt.initConfig({
  // The "assemble" task
  assemble: {
    // Task-level options.
    options: {
      flatten: true,
      assets: 'dist/assets',
      layout: 'templates/layouts/default.hbs',
      partials: 'templates/partials/*.hbs',
      data: 'src/data/*.{json,yml}'
    },
    // Templates to build into pages
    pages: {
      files: {
        'dist/': ['templates/pages/*.hbs']
      }
    }
  }
})
```

# Notes for Web Devs

This project is set up to use [Gruntfile](http://gruntjs.com/sample-gruntfile) is set up to the [watch task](https://github.com/gruntjs/grunt-contrib-watch). Javascript files are monitored by default and are running through [JSHint](http://www.jshint.com/).

## More information
More features on [assemble](http://assemble.io/)

## License

![Creative Commons Attribution 4.0 International](http://i.creativecommons.org/l/by/4.0/88x31.png)

This project, except for third-party tools and libraries used, is licensed under a [Creative Commons Attribution 4.0 International license](http://creativecommons.org/licenses/by/4.0/).