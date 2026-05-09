import { Embed } from "seyfert";

export const EmbedsUtils = {

    successEmbed(title: string, description?: string): Embed{
        return new Embed().setTitle(title).setDescription(description).setColor("Green");
    },

    errorEmbed(title: string, description?: string): Embed{
        return new Embed().setTitle(title).setDescription(description).setColor("Red");
    },

    monitorUp(url: string, latency: string, status: string): Embed{
        return new Embed()
        .setTitle("Site Up")
        .setDescription(`**URL:** ${url}\n**Status:** ✅ Up\n**Latency:** ${latency}\n**HTTP Status:** ${status}`)
        .setColor("Green");
    },

    monitorDown(url: string, latency: string, status: string): Embed{
        return new Embed()
        .setTitle("Site Down")
        .setDescription(`**URL:** ${url}\n**Status:** ❌ Down\n**Latency:** ${latency}\n**HTTP Status:** ${status}`)
        .setColor("Red");
    },

}