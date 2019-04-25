import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
  const options = {
    auth: {
      api_user: process.env.SENDGRID_USERNAME,
      api_key: process.env.SENDGRID_PASSWORD
    }
  };
  const client = nodemailer.createTransport(sgTransport(options));
  return client.sendMail(email);
};

/* console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD); //잘되는지 확인하기 */

export const sendSecretMail = (address, secret) => {
  const email = {
    from: "han_gang@naver.com",
    to: address,
    subject: "Login Secret for HKgram",
    html: `안녕하세요. 당신의 비밀 로그인은 <strong>${secret}</strong> 입니다.<br/>Copy paste on the app/website to log in`
  };
  return sendMail(email);
};
