import { ApiResponse } from '../app/services/api-response/api-response.service';
import { Mongo } from '../app/services/mongo/mongo.service';
import { Helper } from '../app/services/helper/helper.service';

// import { Test } from '../app/v1/core/test/test.component';
import { Users } from '../app/v1/core/users/users.component';

export function setup(app, ioRoom, config, mongoModels) {
	const response = new ApiResponse(),
		helper = new Helper(config),
		mongo = new Mongo(config);

	app.version('v1/core', (appCore) => {
		appCore.use((req, res, next) => {
			res.startTime = new Date().getTime();
			if (
				typeof req.headers === 'undefined' ||
				helper.isEmpty(req.headers[config.secretKey]) ||
				Buffer.from(req.headers[config.secretKey], 'base64').toString('ascii') !== config.secretKeyHash
			) {
				return response.failed(res, 'token', '', 401);
			}

			req.mongoModels = mongoModels;

			if (!req.mongoModels) {
				return response.failed(res, 'model', '', 500);
			}

			next();
		});

		// new Test(appCore, response);
		new Users(appCore, response, helper, ioRoom, mongo);
	});

	return app;
}
