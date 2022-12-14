import { expect } from 'chai';
import { Mongo } from './mongo.service';
import { baseConfig } from './../../../config';

import { mongoSetup } from './../../../models';

describe('mongo service', () => {
	let services;
	let models;

	const getfinalData = function (data) {
		data = typeof data.get !== 'undefined' ? data.get({ plain: true }) : data;

		const finalData: Object = { data: data.data || [], pagination: data.pagination || {} };

		return finalData['data'];
	};

	beforeEach((done) => {
		services = new Mongo(baseConfig);
		models = mongoSetup();

		done();
	});

	it('should check if models exists', (done) => {
		expect(models.users).to.exist;
		expect(models.planCustomers.find).to.exist;
		expect(models.planCustomers.find).to.be.a('function');
		expect(models.planCustomers.findOne).to.exist;
		expect(models.planCustomers.findOne).to.be.a('function');
		expect(models.planCustomers.insertMany).to.exist;
		expect(models.planCustomers.insertMany).to.be.a('function');
		expect(models.planCustomers.findOneAndUpdate).to.exist;
		expect(models.planCustomers.findOneAndUpdate).to.be.a('function');
		expect(models.planCustomers.findOneAndRemove).to.exist;
		expect(models.planCustomers.findOneAndRemove).to.be.a('function');

		done();
	});

	it('should mock get all data', (done) => {
		services
			.getAll(models.users, {})
			.then((data) => {
				expect(getfinalData(data)).to.be.a('Array');

				done();
			})
			.catch(done);
	});

	it('should mock get all data with limit', (done) => {
		services
			.getAll(models.users, {}, { limit: 1 })
			.then((data) => {
				expect(getfinalData(data)).to.have.lengthOf(1);

				done();
			})
			.catch(done);
	});

	it('should get one data', (done) => {
		services
			.getOne(models.users, { _id: '5f03fe387223487e3e3f8b92' })
			.then((data) => {
				expect(data).to.be.a('Object');

				done();
			})
			.catch(done);
	});

	it('should get the mongo request', (done) => {
		expect(services.appendRequestQuery({}, 'ENName:LTL|TCName:XXX')).to.have.eql({ ENName: /LTL/i, TCName: /XXX/i });

		done();
	});
});
