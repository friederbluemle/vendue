/**
 * Product
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,

  attributes: {

    title: {
      type: 'string',
      required: true
    },

    description: {
      type: 'text'
    },

    category: {
      type: 'string',
    },

    photoUri: {
      type: 'string'
    },

    itemUri: {
      type: 'string'
    },

    viewCount: {
      type: 'integer'
    },

    likeCount: {
      type: 'integer'
    }

  }

};
