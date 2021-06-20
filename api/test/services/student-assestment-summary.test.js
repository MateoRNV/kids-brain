const app = require('../../src/app');

describe('\'StudentAssestmentSummary\' service', () => {
  it('registered the service', () => {
    const service = app.service('student-assestment-summary');
    expect(service).toBeTruthy();
  });
});
