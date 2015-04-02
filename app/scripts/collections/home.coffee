define [
  'underscore'
  'backbone'
  'models/Home-model'
], (_, Backbone, HomeModel) ->

  class HomeCollection extends Backbone.Collection
    model: HomeModel