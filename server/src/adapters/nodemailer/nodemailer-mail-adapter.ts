import { MailAdapter, SendMailData } from "../mail-adaper";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a7e466ed12928f",
        pass: "cd48086f4049c8"
    }
});

export class NodeMailerMailAdapter implements MailAdapter {
    async sendMail({subject,body}: SendMailData) {
        await transport.sendMail({
            from:'Equipe Feedget alou@feedget.com',
            to: 'Denilson Sobreira <denilsonsobreira0@gmail.com>',
            subject,
            html:body
        })
    };
}
