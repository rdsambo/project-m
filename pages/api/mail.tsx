import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';
import checkEnvironment from '@/util/check-environment';
import sgMail from '@sendgrid/mail';
import shortId from 'shortid';
import uniqid from 'uniqid';
import nodemailer from 'nodemailer';
import buildEmail from '@/util/templent';

const sendMail = async (email, res, emailData, user) => {
  const url = checkEnvironment();
  const page = 'signup';
  const host = process.env.MAIL_HOST;
  const from = process.env.EMAIL;
  const pass = process.env.MAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: from,
      pass: pass
    }
  });

  const link = `${url}/${page}?token=${emailData.token}&email=${email}&boardId=${emailData.boardId}`;
  const title = 'Você está convidado a participar de um quadro do Gerenciador de Tarefas';
  const body = `Saudações, você foi convidado para participar de um quadro do Gerenciador de Tarefas. Clique no link abaixo para aceitar o convite.`;

  const mailOptions = {
    from: from,
    to: email,
    subject: title,
    html: buildEmail(link, title, body, 'aceitar o convite')
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const { db, client } = await connectToDatabase();

  if (client.isConnected()) {
    const requestType = req.method;

    switch (requestType) {
      case 'POST': {
        const { email, boardId } = req.body;

        const token = uniqid();
        const id = shortId.generate();

        const emailData = {
          id,
          token,
          boardId
        };

        await db
          .collection('token')
          .insertOne({ token, userId: id, status: 'valid', email, boardId });
        const user = await db.collection('users').findOne({ email });

        await sendMail(email, res, emailData, user);

        res.status(200);

        return;
      }

      default:
        res.send({ message: 'DB error' });
        break;
    }
  } else {
    res.send({ msg: 'DB connection error', status: 400 });
  }
}
