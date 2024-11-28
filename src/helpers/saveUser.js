import { User } from "../models/User.js";
import { v4 as uuidv4 } from "uuid";

export const saveUser = async (ctx, api) => {
	console.log(ctx, api);
	return;
	const telegramId = object.id;
	let user = await User.findOne({ telegramId });


	if (!user) {
		const userUid = uuidv4();
		const firstName = object.first_name;
		const username = object.username || `user${telegramId}`;
		const languageCode = object.language_code || "en";
		const isBot = object.is_bot || false;

		const userPhotos = await api.getUserProfilePhotos(telegramId);
		const profilePhoto = userPhotos.total_count > 0 ? userPhotos.photos[0][0].file_id : null;
		user = new User({
			userUid,
			telegramId,
			firstName,
			username,
			languageCode,
			isBot,
			userPhotos,
			profilePhoto,
			joinedAt: new Date(),
			lastActiveAt: new Date(),
		});
		await user.save();
		console.log(`New user added: ${username}`);
	}

	return user;
}
