/* eslint-disable no-unused-vars */
const { sendEmailVarification } = require('../../libs/notify');
exports.Notify = class Notify {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return [];
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if(data.email){
      sendEmailVarification(data.email);
    }
    return {message:"varification mail sended successfully", status:'success'};
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
