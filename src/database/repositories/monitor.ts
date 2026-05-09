import { eq } from "drizzle-orm";
import { db } from ".."
import { monitor } from "../schemas"


export const MonitorRepository = {
    
    async addMonitor(url: string)  {
        return await db.insert(monitor).values({ url });
    },

    async removeMonitor(url: string){
        return await db.delete(monitor).where(eq(monitor.url, url));
    },

    async getAllMonitors(){
        return await db.select().from(monitor);
    },

    async findMonitor(url: string){
        const [result] = await db.select().from(monitor).where(eq(monitor.url, url)).limit(1);
        return result;
    }

}