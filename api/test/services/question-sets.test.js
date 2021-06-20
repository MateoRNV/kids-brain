const app = require('../../src/app');

describe('\'questionSets\' service', () => {
  it('registered the service', () => {
    const service = app.service('question-sets');
    expect(service).toBeTruthy();
  });
});
