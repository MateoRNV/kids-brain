const fs = require('fs');
const { authenticate } = require('@feathersjs/authentication').hooks;
const UploadsModel = require('../../models/uploads.model')();
const UPLOAD_DIR = './public/uploads/';

function setUser (ctx) {
  ctx.data.userId = ctx.params.user.id;
  return ctx;
}

function rmOldUpload (ctx) {
  const url = `${UPLOAD_DIR}${ctx.oldAttachment.filename}`;
  fs.unlinkSync(url);
}

async function loadOldUpload (ctx) {
  ctx.oldAttachment = await UploadsModel.query()
    .where('id', ctx.id)
    .first();
  return ctx;
}

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [setUser],
    update: [],
    patch: [setUser, loadOldUpload],
    remove: [loadOldUpload]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [rmOldUpload],
    remove: [rmOldUpload]
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
