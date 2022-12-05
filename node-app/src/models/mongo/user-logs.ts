export interface UserLogsAttributes {
	walletId?: string;

	message?: string;
	data?: object;

	updatedAt?: Date;
	createdAt?: Date;
}

export default function userLogsModel(mongoose) {
	const userLogSchema = mongoose.Schema(
		{
			walletId: {
				type: String,
				required: true,
				unique: true,
			},

			message: {
				type: String,
			},
			data: {
				type: Object,
				default: {},
			},

			updatedAt: {
				type: Date,
				default: new Date(),
			},
			createdAt: {
				type: Date,
				default: new Date(),
			},
		},
		{ collation: { locale: 'en_US', strength: 2 } }
	);

	userLogSchema.index({ walletId: 1 });

	return {
		name: 'userLogs',
		model: mongoose.model('userLogs', userLogSchema),
	};
}
