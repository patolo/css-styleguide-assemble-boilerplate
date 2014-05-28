/*
 * Assemble, component generator for Grunt.js
 * https://github.com/assemble/
 *
 * Copyright (c) 2014 Upstage
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    site: grunt.file.readYAML('src/data/site.yml'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    open: {
      dev: {
        path: 'http://localhost:<%= connect.server.options.port %>'
      }
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: '<%= site.destination %>'
        }
      }
    },
    // Watch tasks.
    watch: {
      src: {
        files: ['src/**/*.*'],
        tasks: ['sass', 'copy:compexample']
      }
    },
    assemble: {
      // Task-level options
      options: {
        prettify: {
          indent: 2
        },
        marked: {
          sanitize: false
        },
        production: true,
        data: 'src/**/*.{json,yml}',
        assets: '<%= site.destination %>/assets',
        helpers: 'src/helpers/helper-*.js',
        layoutdir: 'src/templates/layouts',
        partials: ['src/templates/includes/**/*.hbs'],
      },
      // Site configuration.
      site: {
        // Target-level options
        options: {
          layout: 'default.hbs'
        },
        files: [{
          expand: true,
          cwd: 'src/templates/pages',
          src: ['*.hbs'],
          dest: '<%= site.destination %>/'
        }]
      }
    },
    // Copy tasks.
    copy: {
      compexample: {
        cwd: 'src/templates/assets',
        expand: true,
        nonull: true,
        src: ['!**/common/*.scss', '!**/scss/*', '**/css/**/*.css'],
        dest: '<%= site.destination %>/assets'
      }
    },
    // Jshint tasks
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },
      gruntfile: {
        src: ['Gruntfile.js']
      }
    },
    // Sass configuration.
    sass: {
      dev: {
        options: {
          includePaths: require('node-bourbon').includePaths,
          sourceComments: 'none'
        },
        files: {
          '<%= site.destination %>/assets/css/main.css': 'src/templates/assets/scss/main.scss',
          '<%= site.destination %>/assets/css/component-styleguide.css': 'src/templates/assets/css/common/component-styleguide.scss'
        }
      }
    },
    //Bower configuration.
    bower: {
      install: {
        options: {
          cleanBowerDir: true,
          cleanTargetDir: true,
          targetDir: '<%= root %>',
          layout: 'byComponent'
        }
      }
    },
    // Before generating any new files,
    // remove any previously-created files.
    clean: {
      destination: ['<%= site.destination %>'],
      packagetgz: ['package.tgz']
    },
    compress: {
      server: {
        options: {
          mode: 'tgz',
          archive: 'package.tgz'
        },
        files: [{
          src: [
            'package.json',
            'bower.json.json',
            'server.js',
            '<%= destination %>**/*'
          ],
          expand: true
        }]
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  require('matchdep').filterDev('assemble*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('release', 'Builds a release package', ['clean', 'build', 'compress']);
  grunt.registerTask('build', ['clean', 'sass', 'assemble', 'copy:compexample']);

  // Default task to be run.
  grunt.registerTask('default', ['build', 'jshint:gruntfile', 'connect', 'open:dev', 'watch']);
};