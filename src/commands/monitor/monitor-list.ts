import { CommandContext, Declare, SubCommand, Embed } from "seyfert";
import { MonitorRepository } from "../../database/repositories";
import { EmbedPaginator } from "../../utils/paginator";
import { EmbedsUtils } from "../../utils/embeds";

@Declare({
    name: "list",
    description: "List all the monitors."
})
export default class MonitorListCommand extends SubCommand {

    override async run(ctx: CommandContext){


        const monitors = await MonitorRepository.getAllMonitors();

        if (monitors.length === 0) {
            return ctx.editOrReply({
                embeds: [EmbedsUtils.errorEmbed("NO MONITORS FOUND", "You don't have any monitors set up yet.")],
                flags: 64
            });
        }

        const pages: Embed[] = [];
        const chunkSize = 10;

        for (let i = 0; i < monitors.length; i += chunkSize) {
            const chunk = monitors.slice(i, i + chunkSize);
            const description = chunk.map((m, index) => `${i + index + 1}.- ${m.url}`).join("\n");

            const embed = new Embed()
                .setTitle("📡 LIST OF ALL MONITORS")
                .setDescription(description)
                .setColor('Blue') 
                .setFooter({ text: `Total Monitors: ${monitors.length}` })
                .setTimestamp();
            
            pages.push(embed);
        }

        const paginator = new EmbedPaginator(ctx, pages);
        return paginator.reply();
    }
}
