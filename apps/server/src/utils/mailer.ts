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
            html: `<!DOCTYPE html>
            <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml">
            
            <head>
                <title>学习通签到</title>
                <style>
                    .content {
                        box-shadow: 0 10px 30px rgb(0 0 0 / 10%);
                        padding: 31px;
                        background: white;
                        border-radius: 10px;
                        margin: 50px;
                        margin-top: 40%;
                        margin-bottom: 21px;
                    }
            
                    /* p {
                        border-bottom: 3px solid #eaecef;
                        padding-bottom: 1rem;
                    } */
            
                    @media screen and (min-width: 1000px) {
                        .content {
                            padding: 53px;
                            margin-left: 30%;
                            margin-right: 30%;
            
                        }
                    }
                </style>
            </head>
            
            <body>
                <div class="content">
            
                    <p class="title" style="margin: 0; margin-bottom: 45px;  font-size: 45px; font-weight: 600; color: #000000;border-bottom: 3px solid #eaecef;
                    padding-bottom: 1rem;">
                        ${realname}
                    </p>
                    <p class="text" style="font-size: 30px; margin: 0; margin-bottom: 24px;">
                        ${status}
                    </p>
            
            
            
                </div>
            
            </body>
            
            </html>`,
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
