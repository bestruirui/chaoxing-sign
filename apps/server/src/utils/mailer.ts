import nodemailer from 'nodemailer';
import { request } from './request';

export function sendEmail(args: { aid: string; uid: string; realname: string; status: string | null; mailing: MailConfig; }) {
  const { uid, realname, aid, status, mailing } = args;
  const transporter = nodemailer.createTransport({
    host: mailing.host,
    port: mailing.port,
    secure: mailing.ssl,
    auth: {
      user: mailing.user,
      pass: mailing.pass,
    },
  });
  transporter.sendMail(
    {
      from: `"BESTRUI" <${mailing.user}>`,
      to: mailing.to,
      subject: '小瑞的学习通签到通知',
      html: `<table border="1"><thead><th>姓名</th><th>签到结果</th></thead><tbody><td>${realname}</td><td>${status}</td></tbody></table>`,
    },
    () => {
      transporter.close();
    }
  );
}

interface PushPlusType {
  token: string;
  title?: string;
  content: string;
  template?: 'html' | 'txt' | 'json' | 'markdown';
  channel?: 'wechat' | 'webhook' | 'mail' | 'sms';
}

export const pushplusSend = (args: PushPlusType) => {
  return request(
    'http://www.pushplus.plus/send',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    args
  );
};
