(function() {
  var Boom, Hoek, Mixed, ObjectId, mongoose, mongooseIdentityStore, _;

  _ = require('underscore');

  Hoek = require("hoek");

  mongoose = require('mongoose');

  Boom = require('boom');

  mongooseIdentityStore = require('mongoose-oauth-store-multi-tenant');

  Mixed = mongoose.Schema.Types.Mixed;

  ObjectId = mongoose.Schema.Types.ObjectId;

  module.exports.register = function(plugin, options, cb) {
    var defaults, oauthStore, methods, models, n, oauthProvider, v, _i, _len, _ref, _ref1;
    if (options == null) {
      options = {};
    }
    defaults = {
      mongodbUrl: null,
      autoIndex: false,
      needConnection: false
    };
    options = Hoek.applyToDefaults(defaults, options);

    /*
    This is just a dummy here and ignored.
     */
    oauthProvider = {
      "authorizeUrl": "/oauth/authorize",
      "accessTokenUrl": "/oauth/token",
      "scopes": [
        {
          "name": "read",
          "description": "Allows read access to your data.",
          "developerDescription": "",
          "roles": ["public"]
        }, {
          "name": "write",
          "description": "Allows write access to your data.",
          "developerDescription": "",
          "roles": ["public"]
        }, {
          "name": "email",
          "description": "Allows access to your email address.",
          "developerDescription": "",
          "roles": ["public"]
        }, {
          "name": "admin",
          "description": "Allows full admin access to the platform.",
          "developerDescription": "",
          "roles": ["admin"]
        }
      ]
    };
    oauthStore = mongooseIdentityStore.store({
      oauthProvider: oauthProvider,
      autoIndex: options.autoIndex
    });
    methods = {};
    _ref = ['users', 'organizations', 'entities', 'oauthScopes', 'oauthApps', 'oauthAuth', 'admin', 'roles'];
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
