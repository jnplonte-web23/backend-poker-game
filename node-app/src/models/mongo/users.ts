export interface UsersAttributes {
	walletId?: string;
	name?: string;

	coins?: number;
	data?: object;

	active?: boolean;

	updatedAt?: Date;
	createdAt?: Date;
}

export default function usersModel(mongoose) {
	const userSchema = mongoose.Schema(
		{
			walletId: {
				type: String,
				required: true,
				unique: true,
			},
			name: {
				type: String,
			},

			coins: {
				type: Number,
				default: 0,
			},
			data: {
				type: Object,
				default: {},
			},

			active: {
				type: Boolean,
				default: true,
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

	userSchema.index({ walletId: 1 });

	return {
		name: 'users',
		model: mongoose.model('users', userSchema),
	};
}
