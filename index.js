/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-sitemap',
  includedCommands: function() {
    return {
      'sitemap': require('./lib/commands/sitemap')
    }
  }
};
