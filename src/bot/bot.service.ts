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

  private async inlineKeyboard(
    ctx: ContextMessageUpdate,
    msg: any,
  ): Promise<void> {
    await ctx.replyWithMarkdown(msg.title, {
      reply_markup: {
        inline_keyboard: msg.buttons,
      },
      parse_mode: 'Markdown',
    });
  }

  @TelegramActionHandler({ onStart: true })
  async start(ctx: ContextMessageUpdate) {
    const me = await this.telegrafTelegramService.getMe();
    console.log(me);
  }

  @TelegramActionHandler({ message: 'test_callback' })
  protected async debugLogs(ctx: ContextMessageUpdate) {
    console.log('1');
    await this.inlineKeyboard(ctx, {
      title: 'message',
      buttons: [
        [
          {
            text: 'test',
            callback_data: 'test_callback',
          },
        ],
      ],
    });
  }
}
