import { SubCommand, Declare, CommandContext, createStringOption, Options, Embed } from "seyfert";
import { MonitorRepository } from "../../database/repositories";
import { EmbedsUtils } from "../../utils/embeds";

const options = {
    url: createStringOption({
        description: "The URL to monitor.",
        required: true
    })
}
@Declare({
    name: "add",
    description: "Add a new monitor."
})
@Options(options)
export default class MonitorAddCommand extends SubCommand {
    override async run(ctx: CommandContext<typeof options>){

        await ctx.deferReply();

        const { url } = ctx.options;

        const monitor = await MonitorRepository.findMonitor(url);
        if (monitor) return ctx.editOrReply({ embeds: [EmbedsUtils.errorEmbed("ERROR", "This monitor already exists")], flags: 64 });

        await MonitorRepository.addMonitor(url);

        return ctx.editOrReply({
            embeds: [EmbedsUtils.successEmbed("A NEW MONITOR HAS BEEN ADDED", `Monitor: ${url}`)],
            flags: 64,
        })

    }
    
}