import { config } from "seyfert";

export default config.bot({
	token: process.env.BOT_TOKEN,
	locations: {
		base: "src",
		commands: "commands",
	},
	intents: ["Guilds", "GuildMembers", "GuildPresences"],
	publicKey: process.env.PUBLIC_KEY,
});
