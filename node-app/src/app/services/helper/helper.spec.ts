import { expect } from 'chai';
import { Helper } from './helper.service';
import { baseConfig } from './../../../config';

describe('helper service', () => {
	let services;

	beforeEach((done) => {
		services = new Helper(baseConfig);
		done();
	});

	it('should get the expected json data', (done) => {
		expect(services.toJson('{"test": "test-data"}')).to.eql({ test: 'test-data' });

		done();
	});

	it('should get the expected string data', (done) => {
		expect(services.toString({ test: 'test-data' })).to.equal('{"test":"test-data"}');

		done();
	});

	it('should return a clean data object, array or string', (done) => {
		expect(services.cleanData('<script>')).to.equal('script');

		expect(services.cleanData({ test: '<script>' })).to.eql({ test: 'script' });

		expect(services.cleanData(['<script>'])).to.eql(['script']);

		done();
	});

	it('should check if empty object and array', (done) => {
		expect(services.isEmptyObject({})).to.be.true;

		expect(services.isEmptyObject({ test: 'script' })).to.be.false;

		done();
	});

	it('should check if string exists', (done) => {
		expect(services.stringExist('test', 'e')).to.be.true;

		expect(services.stringExist('test', 'x')).to.be.false;

		done();
	});

	it('should check if data is empty or not empty', (done) => {
		expect(services.isEmpty('')).to.be.true;

		expect(services.isNotEmpty('x')).to.be.true;

		done();
	});

	it('should check if data on array exists', (done) => {
		expect(services.validateData({ test: 'test-data' }, ['test'])).to.be.true;

		done();
	});

	it('should replace html value', (done) => {
		expect(services.replaceHtml('http://www.test.com?k={{key}}', { key: '12345' })).to.equal(
			'http://www.test.com?k=12345'
		);
		expect(services.replaceHtml('test-{{x}}-{{y}}-{{z}}', { x: 'super', y: 'test' })).to.equal('test-super-test-{{z}}');

		done();
	});

	it('should generate random string', (done) => {
		expect(services.generateRandomString().length).to.equal(10);
		expect(services.generateRandomString('20').length).to.equal(20);

		done();
	});

	it('should get default configs', (done) => {
		expect(services.secretKey).to.be.a('string');
		expect(services.secretHash).to.be.a('string');

		done();
	});
});
