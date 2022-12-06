import * as apiConfig from './api-config.json';
import * as mongoConfig from './mongo-config.json';

export const baseConfig = {
	name: 'pokerapi',
	poweredBy: 'poker api',
	secretKey: 'x-poker-api-key',
	secretKeyHash: 'jNQmvnxXEjR7KXwfucgerTf6YwZV5Amz5awwxf5PFgkpGrb3Pl',
	socketWhiteList: ['http://localhost:3002'],
	api: apiConfig,
	mongo: mongoConfig,
};
