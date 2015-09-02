(function() {
  var Boom, Hoek, _, mongoose, mongooseOauthStoreMultiTenant;

  _ = require('underscore');

  Hoek = require("hoek");

  mongoose = require('mongoose');

  Boom = require('boom');

  mongooseOauthStoreMultiTenant = require('mongoose-oauth-store-multi-tenant');

  module.exports.register = function(server, options, cb) {
    var defaults, i, len, methods, models, n, oauthStore, ref, ref1, v;
    if (options == null) {
      options = {};
    }
    defaults = {
      mongodbUrl: null,
      autoIndex: false,
      needConnection: false
    };
    options = Hoek.applyToDefaults(defaults, options);
    oauthStore = mongooseOauthStoreMultiTenant.store({
      autoIndex: options.autoIndex
    });
    methods = {};
    ref = ['oauthScopes', 'oauthApps', 'oauthAuth'];
    for (i = 0, len = ref.length; i < len; i++) {
      n = ref[i];
      methods[n] = oauthStore[n];
    }
    models = {};
    ref1 = oauthStore.models;
    for (n in ref1) {
      v = ref1[n];
      models[n] = v;
    }
    server.expose('oauthStore', oauthStore);
    server.expose('methods', methods);
    server.expose('models', models);
    return cb();
  };

  module.exports.register.attributes = {
    pkg: require('../package.json')
  };

}).call(this);

//# sourceMappingURL=index.js.map
