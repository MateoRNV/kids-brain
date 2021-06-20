const {
  hashPassword
} = require('@feathersjs/authentication-local').hooks;
const { sendEmailVarification } = require('../../libs/notify');
const errors = require('@feathersjs/errors');

module.exports = {
  
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async context => {
        const user = await context.app.service('users').find({query: { email: { email: context.data.email }}})
        if(user && user.total > 0) {
          throw new errors.BadRequest('User already exist');
        }
      },
      hashPassword('password'),
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      context => {
        sendEmailVarification(context.data.email, context.app.get('deployment').ip);
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
