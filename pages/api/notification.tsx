import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/util/mongodb';
import checkEnvironment from '@/util/check-environment';
import shortId from 'shortid';
import uniqid from 'uniqid';
import nodemailer from 'nodemailer';
import buildEmail from '@/util/templent';

export async function sendGenericMail(email, subject, body): Promise<void> {
  const host = process.env.MAIL_HOST;
  const from = process.env.EMAIL;
  const pass = process.env.MAIL_PASSWORD;

  const mailOptions = {
    from: from,
    to: email,
    subject: subject,
    html: body
  };

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: from,
      pass: pass
    }
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return false;
    } else {
      console.log('Email sent: ' + info.response);
      return true;
    }
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const requestType = req.method;

  switch (requestType) {
    case 'POST': {
      const { email, subject, body } = req.body;

      await sendGenericMail(email, subject, body);

      res.status(200);

      return;
    }

    default:
      res.send({ message: 'DB error' });
      break;
  }
}
