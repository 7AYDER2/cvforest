import ky from 'ky';
import { env } from '@/env';

export async function sendMessageToChannel(message: string): Promise<boolean> {
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: env.TELEGRAM_CHANNEL_ID,
    text: message,
    parse_mode: 'HTML',
  };

  const res = await ky.post(url, { json: body }).catch(() => {
    return { ok: false };
  });

  return res.ok;
}
