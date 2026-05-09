import { Client, type ParseClient } from "seyfert";
import { MonitorService } from "./services/monitorService";

async function boostrap() {
	const client = new Client();

	client.start().then(() =>
		client.uploadCommands({
			cachePath: "commands.json",
		}),
	);

	MonitorService.startChecking(client);
}

boostrap().catch((error) => {
	console.error(`Something went wrong: ${error}`);
	process.exit(1);
});

declare module "seyfert" {
	interface UsingClient extends ParseClient<Client<true>> {}
}
