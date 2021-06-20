const app = require('../../src/app');

describe('\'notify\' service', () => {
  it('registered the service', () => {
    const service = app.service('notify/sendEmailVarification');
    expect(service).toBeTruthy();
  });
});
