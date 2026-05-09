import { 
    ActionRow, 
    Button, 
    type CommandContext, 
    type Embed, 
    type WebhookMessage,
    type Message
} from "seyfert";
import { ButtonStyle, MessageFlags } from "seyfert/lib/types";

export class EmbedPaginator {
    private index = 0;
    private message?: Message | WebhookMessage;
    private customRows: ActionRow<any>[] = [];

    constructor(
        private ctx: CommandContext,
        private pages: Embed[],
        private time = 60000
    ) {}

    private createNavigationRow() {
        const row = new ActionRow<Button>();
        return row.addComponents(
            new Button()
                .setCustomId('prev_page')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(this.index === 0),
            new Button()
                .setCustomId('page_count')
                .setLabel(`${this.index + 1}/${this.pages.length}`)
                .setStyle(ButtonStyle.Primary)
                .setDisabled(true),
            new Button()
                .setCustomId('next_page')
                .setEmoji('➡️')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(this.index === this.pages.length - 1)
        );
    }

    public addRow(row: ActionRow<any>) {
        this.customRows.push(row);
        return this;
    }

    public addEmbed(embed: Embed) {
        this.pages.push(embed);
        return this;
    }

    public setPage(n: number) {
        if (n >= 0 && n < this.pages.length) this.index = n;
        return this;
    }

    public async reply(ephemeral = false) {
        if (this.pages.length === 0) throw new Error("There are no pages to show");

        this.message = await this.ctx.write({
            embeds: [this.pages[this.index]!],
            components: [...this.customRows, this.createNavigationRow()],
            flags: ephemeral ? MessageFlags.Ephemeral : undefined
        }, true);

        const collector = this.message.createComponentCollector({
            idle: this.time,
            onPass: async (i) => {
                await i.write({
                    content: "❌ Only the author can use this.",
                    flags: MessageFlags.Ephemeral
                });
            },
            onStop: () => {
                this.ctx.editResponse({
                    components: this.customRows 
                }).catch(() => null);
            }
        });

        collector.run('prev_page', async (i) => {
            if (i.user.id !== this.ctx.author.id) return;
            await i.deferUpdate();
            this.index--;
            await this.update();
        });

        collector.run('next_page', async (i) => {
            if (i.user.id !== this.ctx.author.id) return;
            await i.deferUpdate();
            this.index++;
            await this.update();
        });

        return this;
    }

    private async update() {
        await this.ctx.editResponse({
            embeds: [this.pages[this.index]!],
            components: [...this.customRows, this.createNavigationRow()],
        });
    }
}