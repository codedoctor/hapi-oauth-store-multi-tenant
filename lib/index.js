(function() {
  var Boom, Hoek, mongoose, mongooseOauthStoreMultiTenant, _;

  _ = require('underscore');

  Hoek = require("hoek");

  mongoose = require('mongoose');

  Boom = require('boom');

  mongooseOauthStoreMultiTenant = require('mongoose-oauth-store-multi-tenant');

  module.exports.register = function(plugin, options, cb) {
    var defaults, methods, models, n, oauthStore, v, _i, _len, _ref, _ref1;
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
    _ref = ['oauthScopes', 'oauthApps', 'oauthAuth'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      n = _ref[_i];
      methods[n] = oauthStore[n];
    }
    models = {};
    _ref1 = oauthStore.models;
    for (n in _ref1) {
      v = _ref1[n];
      models[n] = v;
    }
    plugin.expose('oauthStore', oauthStore);
    plugin.expose('methods', methods);
    plugin.expose('models', models);
    return cb();
  };

  module.exports.register.attributes = {
    pkg: require('../package.json')
  };

}).call(this);

//# sourceMappingURL=index.js.map
