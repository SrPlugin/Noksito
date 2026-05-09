import { CommandContext, Declare, SubCommand, createStringOption, Options } from "seyfert";
import { MonitorRepository } from "../../database/repositories";
import { EmbedsUtils } from "../../utils/embeds";


const options = {
    url: createStringOption({
        description: "The URL to monitor.",
        required: true
    })
}
@Declare({
    name: "remove",
    description: "Remove a monitor."
})
@Options(options)
export default class MonitorRemoveCommand extends SubCommand {


    override async run(ctx: CommandContext<typeof options>){

        await ctx.deferReply();

        const { url } = ctx.options;

        const monitor = await MonitorRepository.findMonitor(url);
        if (!monitor) return ctx.editOrReply({ embeds: [EmbedsUtils.errorEmbed("ERROR", "This monitor does not exist.")], flags: 64 });

        await MonitorRepository.removeMonitor(url);

        return ctx.editOrReply({ embeds: [EmbedsUtils.successEmbed("A MONITOR HAS BEEN REMOVED", `Monitor: ${url}`)], flags: 64 });
    }
    
}