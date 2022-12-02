import * as supertest from 'supertest';
import { expect } from 'chai';

import app from '../../../../app';

const apiKey: string = 'ak5RbXZueFhFalI3S1h3ZnVjZ2VyVGY2WXdaVjVBbXo1YXd3eGY1UEZna3BHcmIzUGw=';

describe('test component', () => {
	it('should be able to call test component', (done) => {
		supertest(app)
			.get('/v1/core/test?test=true')
			.set('x-poker-api-key', apiKey)
			.expect('Content-Type', /json/)
			.expect(200, (err, res) => {
				if (err) {
					return done(err);
				}

				expect(res.body.status).to.equal('success');

				done();
			});
	});
});
