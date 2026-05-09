import { Command, Declare, Options } from "seyfert";
import MonitorAddCommand from "./monitor-add";
import MonitorRemoveCommand from "./monitor.remove";
import MonitorListCommand from "./monitor-list";

@Declare({
    name: "monitor",
    description: "Manage all your monitors."
})
@Options([MonitorAddCommand, MonitorRemoveCommand, MonitorListCommand])
export default class MonitorCommand extends Command {

}