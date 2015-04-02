#/*global require*/
'use strict'

require.config
  shim: {
    bootstrap:
      deps: ['jquery'],
      exports: 'jquery'
    material:
      deps: ['jquery'],
      exports: 'jquery'
    ripples:
      deps: ['jquery'],
      exports: 'jquery'
  }
  paths:
    jquery: '../bower_components/jquery/dist/jquery'
    backbone: '../bower_components/backbone/backbone'
    underscore: '../bower_components/lodash/dist/lodash'
    bootstrap: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap'
    material: '../bower_components/bootstrap-material-design/scripts/material.js'
    ripples: '../bower_components/bootstrap-material-design/scripts/ripples.js'

require [
  'backbone'
], (Backbone) ->
  Backbone.history.start()
