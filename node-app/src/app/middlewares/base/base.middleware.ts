export class BaseMiddleware {
	constructor(private app) {
		if (app === 'sandbox') {
			// console.log('sandbox mode');
		} else {
			this.registerServices();
		}
	}

	get services(): Object {
		return {};
	}

	middleWare(verb: string = 'get') {
		return (req, res, next) => {
			console.log('==================================================');
			console.log('LOG TIME:', new Date());
			console.log('LOG URL:', req.originalUrl || '');
			console.log('LOG AUTH:', req.authentication ? JSON.stringify(req.authentication) : '');
			console.log('LOG HEADERS:', req.headers['x-node-api-key'] ? JSON.stringify(req.headers['x-node-api-key']) : '');
			console.log('LOG QUERY:', req.query ? JSON.stringify(req.query) : '');
			console.log('LOG BODY:', req.body ? JSON.stringify(req.body) : '');
			console.log('LOG METHOD:', req.method || '');
			console.log('==================================================');

			next();
		};
	}

	registerServices() {
		const routerServices = this.services;
		Object.keys(routerServices).forEach((fullPath: string) => {
			const serviceFunction = routerServices[fullPath];
			const pathItems = fullPath.split(' ');
			const verb = (pathItems.length > 1 ? pathItems[0] : 'get').toLowerCase();
			const path = pathItems.length > 1 ? pathItems[1] : fullPath;

			this.app[verb](path, this.middleWare(verb), this[serviceFunction].bind(this));
		});
	}
}
