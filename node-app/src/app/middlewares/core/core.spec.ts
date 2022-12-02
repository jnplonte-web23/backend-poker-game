import { expect } from 'chai';
import { CoreMiddleware } from './core.middleware';

describe('core middleware', () => {
	let middlewares: any;

	before((done) => {
		middlewares = new CoreMiddleware('sandbox');

		done();
	});

	it('should have the basic method', (done) => {
		expect(middlewares.all).to.exist;
		expect(middlewares.all).to.be.a('function');
		expect(middlewares.get).to.exist;
		expect(middlewares.get).to.be.a('function');
		expect(middlewares.post).to.exist;
		expect(middlewares.post).to.be.a('function');
		expect(middlewares.put).to.exist;
		expect(middlewares.put).to.be.a('function');
		expect(middlewares.delete).to.exist;
		expect(middlewares.delete).to.be.a('function');

		done();
	});
});
