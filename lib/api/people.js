'use strict';

const assign = require('lodash/assign');

const helpers = require('../helpers');
const apiBase = require('../mixins/api-base');

/**
 * [People description]
 * @param {[type]} harvest [description]
 */
function People(harvest) {
  this.harvest = harvest;
  this.harvest.request = harvest.request;

  this.name = 'people';
  this.baseUri = `/${this.name}/`;
}

assign(People.prototype, apiBase);

/**
 * [toggle description]
 * @param  {[type]}   options [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
People.prototype.toggle = function(options, cb) {
  if (!helpers.has(options, ['id'])) {
    return cb(new Error('toggling a person requires an id'));
  }

  let uri = this.baseUri + options.id + '/toggle';

  this.harvest.request('POST', uri, {}, cb);
};

/**
 * [reset description]
 * @param {[type]}   options [description]
 * @param {Function} cb      [description]
 */
People.prototype.reset = function(options, cb) {
  if (!helpers.has(options, ['id'])) {
    return cb(new Error('reseting a persons password requires an id'));
  }

  let uri = this.baseUri + options.id + '/reset_password';

  this.harvest.request('POST', uri, {}, cb);
};

module.exports = People;