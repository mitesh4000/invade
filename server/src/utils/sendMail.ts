import { TestAccount, Transporter } from "nodemailer";

const nodemailer = require("nodemailer");
let email: string;
let password: string;

nodemailer.createTestAccount((err: Error, account: TestAccount) => {
  if (err) {
    console.error("Failed to create a testing account. " + err.message);
    return process.exit(1);
  }
  email = account.user;
  console.log("🚀 ~ nodemailer.createTestAccount ~ email:", email);
  password = account.pass;
  console.log("🚀 ~ nodemailer.createTestAccount ~ password:", password);
  console.log("Credentials obtained, sending message...");

  let transporter: Transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass,
    },
  });

  let message = {
    from: "Sender Name <sender@example.com>",
    to: "Recipient <recipient@example.com>",
    subject: "Nodemailer is unicode friendly ✔",
    text: "Hello to myself!",
    html: "<p><b>Hello</b> to myself!</p>",
  };

  transporter.sendMail(message, (err: Error | null, info: any) => {
    if (err) {
      console.log("Error occurred. " + err.message);
      return process.exit(1);
    }

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
});
