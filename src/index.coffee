_ = require 'underscore'
Hoek = require "hoek"
mongoose = require 'mongoose'
Boom = require 'boom'

mongooseOauthStoreMultiTenant = require 'mongoose-oauth-store-multi-tenant'

module.exports.register = (plugin, options = {}, cb) ->
  defaults =
    mongodbUrl: null
    autoIndex: false
    needConnection: false 

  options = Hoek.applyToDefaults defaults, options

  oauthStore = mongooseOauthStoreMultiTenant.store 
                        autoIndex : options.autoIndex

  methods = {}

  for n in [
        'oauthScopes'
        'oauthApps'
        'oauthAuth'
      ]
    methods[n] = oauthStore[n]

  models = {}
  for n,v of oauthStore.models
    models[n] = v 


  plugin.expose 'oauthStore', oauthStore
  plugin.expose 'methods', methods
  plugin.expose 'models', models

  cb()

module.exports.register.attributes =
    pkg: require '../package.json'
