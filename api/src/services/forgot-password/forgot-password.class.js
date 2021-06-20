/* eslint-disable no-unused-vars */
const UsersModel = require('../../models/users.model')();
const Mail = require('../../libs/email');
const errors = require('@feathersjs/errors');
const bcrypt = require('bcryptjs');
const { resetPasswordTemplate } = require('../../libs/email-templates/resetpassword');

exports.ForgotPassword = class ForgotPassword {

  setup(app) {
    this.mailService = Mail.sendEmail;
  }

  async sendEmail(email, message) {
    const mailOptions = {
      to: email,
      subject: 'Password Reset Request',
      html: message
    };
    return this.mailService(mailOptions);
  }


  async get(id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create(data, params) {

    let userEmail = data.email;
    let dbUser = await UsersModel.query().where("email", userEmail);

    if (!dbUser.length) {
      throw new errors.BadRequest('User not found');
    }

    let resetPasswordToken = require('crypto')
      .randomBytes(32)
      .toString('hex').substring(0, 10);;

    let currentTime = new Date();
    currentTime.setHours(currentTime.getHours() + 4);

    let editUser = await UsersModel.query()
      .where('email', userEmail)
      .patch({
        password_reset_token: resetPasswordToken,
        password_reset_expiration: currentTime
      });

    if (editUser) {
      const host = params.headers.host;
      const protocol = "https";
      let link = `${protocol}://${host}/resetpassword?code=${resetPasswordToken}`;
      let htmlMessage = resetPasswordTemplate(link);
      const status = await this.sendEmail("anant.itmsu@gmail.com", htmlMessage);
      if (status) {
        return {
          code: 201,
          status: 'success',
          message: 'Reset password link sent to your email'
        };
      }
    }

    throw new errors.BadRequest('Something went wrong');
  }


  async validRequest(options) {
    const { resetToken } = options;
    let userDetails = await UsersModel.query().where(
      'password_reset_token',
      resetToken
    );

    if (userDetails.length) {

      let passwordResetExpiration = userDetails[0].password_reset_expiration;
      let storedToken = userDetails[0].password_reset_token;
      let currentTimeStamp = new Date();

      if (
        storedToken == resetToken &&
        currentTimeStamp < passwordResetExpiration
      ) {
        return true;
      } else {
        throw new errors.BadRequest('Reset token expired');
      }
    } else {
      throw new errors.BadRequest('Invalid reset token');
    }
  }

  async find(params) {

    let resetToken = params.query.resetToken;
    let validRequest = await this.validRequest({ resetToken });
    if (validRequest) {
      return {
        code: 200,
        status: 'success',
        message: 'Reset token verified'
      };
    }
  }


  async update(id, data, param) {

  }
  async patch(id, data, params) {
    // Password change request
    const newPassword = data.newPassword;
    const resetToken = id;


    let status = await this.validRequest({ resetToken });
    if (status) {
      var hash = bcrypt.hashSync(newPassword);
      let resetPassword = await UsersModel.query()
        .where('password_reset_token', resetToken)
        .patch({
          password: hash,
          password_reset_token: null,
          password_reset_expiration: null
        });

      if (resetPassword) {
        return {
          code: 200,
          status: 'success',
          message: 'Password reset successfully.'
        };
      }
    }
  }

  async remove(id, params) {
    return { id };
  }
};
