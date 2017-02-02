'use strict';

const assign = require('lodash/assign');

const helpers = require('../helpers');
const apiBase = require('../mixins/api-base');

/**
 * [Projects description]
 * @param {[type]} harvest [description]
 */
function Projects(harvest) {
  this.harvest = harvest;
  this.harvest.request = harvest.request;

  this.name = 'projects';
  this.baseUri = `/${this.name}/`;
}

assign(Projects.prototype, apiBase);

/**
 * [toggleActivation description]
 * @param  {[type]}   options [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
Projects.prototype.toggleActivation = function(options, cb) {
  if (!helpers.has(options, ['id'])) {
    return cb(new Error('toggling activation on a project requires an id'));
  }

  let uri = this.baseUri + options.id + '/toggle';
  delete options.id;

  this.harvest.request('PUT', uri, {}, cb);
};

/**
 * [entries description]
 * @param  {[type]}   options [description]
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
Projects.prototype.entries = function(options, cb) {
  if (!helpers.has(options, ['id', 'from', 'to'])) {
    return cb(new Error('getting project entries requires an id, a from date, and a to date'));
  }

  let uri = this.baseUri + options.id + '/entries';
  delete options.id;

  this.harvest.request('GET', uri, {}, cb);
};

module.exports = Projects;