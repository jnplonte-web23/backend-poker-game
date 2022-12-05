import app from './app';
import { baseConfig } from './config';

const env = process.env.NODE_ENV || 'local';

app.listen(baseConfig.api[env].port, (_error) => {
	if (_error) {
		return console.log(_error);
	}
	console.log('api environment is %s', env.toUpperCase());

	console.log('api listening to http://localhost:%s', baseConfig.api[env].port);
});
