const users = require('./users/users.service.js');
const profile = require('./profile/profile.service.js');
const questionTypes = require('./question-types/question-types.service.js');
const questions = require('./questions/questions.service.js');
const studentAssestmentSummary = require('./student-assestment-summary/student-assestment-summary.service.js');
const studentQuestionSummary = require('./student-question-summary/student-question-summary.service.js');
const subjects = require('./subjects/subjects.service.js');
const notify = require('./notify/notify.service.js');
const ageLevels = require('./age-levels/age-levels.service.js');
const countries = require('./countries/countries.service.js');
const forgotPassword = require('./forgot-password/forgot-password.service.js');
const userProfiles = require('./user-profiles/user-profiles.service.js');
const questionSets = require('./question-sets/question-sets.service.js');
const uploads = require('./uploads/uploads.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(profile);
  app.configure(questionTypes);
  app.configure(questions);
  app.configure(studentAssestmentSummary);
  app.configure(studentQuestionSummary);
  app.configure(subjects);
  app.configure(notify);
  app.configure(ageLevels);
  app.configure(countries);

  app.configure(forgotPassword);

  app.configure(userProfiles);
  app.configure(questionSets);
  app.configure(uploads);
};
