const app = require('../../src/app');

describe('\'age-levels\' service', () => {
  it('registered the service', () => {
    const service = app.service('age-levels');
    expect(service).toBeTruthy();
  });
});
