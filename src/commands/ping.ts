import { Command, type CommandContext, Declare, Embed } from "seyfert";

@Declare({
	name: "ping",
	description: "Show bot latency",
})
export default class PingCommand extends Command {
	override async run(ctx: CommandContext) {
		return ctx.write({
			embeds: [
				new Embed()
					.setTitle(`**NOKSITO IS ON**`)
					.setDescription(`Latency: ${ctx.client.gateway.latency}ms`)
					.setAuthor({
						name: "SrPlugin",
						iconUrl: "https://avatars.githubusercontent.com/u/221761270?v=4",
					})
					.setColor("Blue"),
			],
		});
	}
}
