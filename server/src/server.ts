import express from 'express';
import nodemailer from 'nodemailer'
import { prisma } from './prisma';

const app = express();

app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a7e466ed12928f",
        pass: "cd48086f4049c8"
    }
});

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body
    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    })
    transport.sendMail({
        from:'Equipe Feedget alou@feedget.com',
        to: 'Denilson Sobreira <denilsonsobreira0@gmail.com>',
        subject:'Novo feedback',
        html:[
            `<div style="font-family:sans-serif; font-size:16px; color:#111">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })
    res.status(201).json({ data: feedback })
})

app.listen(3333, () => {
    console.log('SERVER');
})