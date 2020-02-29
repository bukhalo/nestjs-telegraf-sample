import { Injectable } from '@nestjs/common';
import {
  TelegrafTelegramService,
  TelegramActionHandler,
} from 'nestjs-telegraf';
import { ContextMessageUpdate } from 'telegraf';

@Injectable()
export class BotService {
  constructor(
    private readonly telegrafTelegramService: TelegrafTelegramService,
  ) {}

  @TelegramActionHandler({onStart: true})
	async start(ctx: ContextMessageUpdate) {
		const me = await this.telegrafTelegramService.getMe();
		console.log(me);
		await ctx.replyWithMarkdown('test', {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'test',
							callback_data: 'test_callback',
						},
					],
				]
			},
			parse_mode: 'Markdown',
		});
	}

	@TelegramActionHandler({ action: 'test_callback'})
	protected async debugLogs(ctx: ContextMessageUpdate) {
		console.log('1');
	}

	@TelegramActionHandler({ message: ''})
	async reply(ctx: ContextMessageUpdate) {
		await ctx.reply(`You say ${ctx.message.text}`)
	}
}
