import { Command, CommandContext, Declare, Embed, Middlewares } from "seyfert";
import os from "node:os";
import { MessageFlags } from "seyfert/lib/types";

@Declare({
    name: "status",
    description: "Show bot status.",
})
export default class StatusCommand extends Command {

    override async run(ctx: CommandContext) {
        
        const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const usedRam = (Number(totalRam) - Number(freeRam)).toFixed(2);

        const botRam = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
        const botCpu = (process.cpuUsage().user / 1000000).toFixed(2);

        const uptime = os.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);

        const cpus = os.cpus();
        const cpuModel = cpus[0]?.model || 'Unknown';
        const cpuCores = cpus.length;

        const embed = new Embed()
            .setTitle("🖥️ Bot Status")
            .setColor('Blue')
            .addFields(
                { 
                    name: "🤖 Processor", 
                    value: `\`\`\`${cpuModel}\`\`\`\n**Cores:** ${cpuCores}`, 
                    inline: false 
                },
                { 
                    name: "📊 RAM Memory", 
                    value: `**System:** ${usedRam}/${totalRam} GB\n**Bot:** ${botRam} MB`, 
                    inline: true 
                },
                { 
                    name: "🤖 CPU Usage", 
                    value: `**Bot:** ${botCpu}%`, 
                    inline: true 
                },
                { 
                    name: "⏱️ Uptime", 
                    value: `${days}d ${hours}h ${minutes}m`, 
                    inline: true 
                },
                { 
                    name: "💻 Platform", 
                    value: `${os.platform()} (${os.arch()})`, 
                    inline: true 
                },
				{
					name: "🔗 Bot Latency",
					value: `${ctx.client.gateway.latency}ms`, 
					inline: true 
				}
            )
            .setFooter({ text: `Noksito Status` })
            .setTimestamp();

        return ctx.write({ embeds: [embed], flags: MessageFlags.Ephemeral});
    }
}