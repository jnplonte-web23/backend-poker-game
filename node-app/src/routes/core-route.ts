import { ApiResponse } from '../app/services/api-response/api-response.service';
import { Helper } from '../app/services/helper/helper.service';

import { Test } from '../app/v1/core/test/test.component';

export function setup(app, config) {
	const response = new ApiResponse(),
		helper = new Helper(config);

	app.version('v1/core', (appMain) => {
		appMain.use((req, res, next) => {
			res.startTime = new Date().getTime();
			if (
				typeof req.headers === 'undefined' ||
				helper.isEmpty(req.headers[config.secretKey]) ||
				Buffer.from(req.headers[config.secretKey], 'base64').toString('ascii') !== config.secretKeyHash
			) {
				return response.failed(res, 'token', '', 401);
			}

			next();
		});

		new Test(appMain, response);
	});

	return app;
}
