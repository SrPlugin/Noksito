# Noksito - A bot to monitor your services

- Uses [Seyfert](https://seyfert.dev/) for the Discord bot framework.
- See the status about all your services running. 

## Usage

```
bun run build
bun run start:prod
```

## Commands
- `/monitor add <url>`: Add a new url to monitor. Make sure it includes the protocol (http/https).
- `/monitor remove <url>`: Remove a url from monitoring.
- `/monitor list`: List all the urls being monitored.
- `/monitor <url>`: Show the status of the given url.