const app = require('../../src/app');

describe('\'QuestionTypes\' service', () => {
  it('registered the service', () => {
    const service = app.service('question-types');
    expect(service).toBeTruthy();
  });
});
