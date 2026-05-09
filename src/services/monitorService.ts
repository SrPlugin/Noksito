import type { Client } from "seyfert";
import { MonitorRepository } from "../database/repositories";
import { checkURL } from "../utils/urlChecker";
import { EmbedsUtils } from "../utils/embeds";

export const MonitorService = {

    async startChecking(client: Client){
        setInterval(async () => {
            
            const sites = await MonitorRepository.getAllMonitors();

            for (const site of sites) {

                const result = await checkURL(site.url);

                if (!result.online){
                    client.messages.write(process.env.MONITOR_CHANNEL_DOWN!, {
                        embeds: [EmbedsUtils.monitorDown(site.url, String(result.latency), String(result.status))], 
                    });
                }else if (result.online){
                    client.messages.write(process.env.MONITOR_CHANNEL_UP!, {
                        embeds: [EmbedsUtils.monitorUp(site.url, String(result.latency), String(result.status))], 
                    });
                }
            }

        }, Number(process.env.INTERVAL_CHECK));

    }
}