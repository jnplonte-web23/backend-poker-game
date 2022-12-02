export {};

declare module '*.json' {
	const value: any;
	export default value;
}

declare global {
	namespace Express {
		interface Response {
			startTime?: number;
		}
	}
}
