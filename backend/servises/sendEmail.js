const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "svitlanabardashova@meta.ua",
    pass: "Maxim050921",
  },
});

async function sendEmail({ userName, userEmail, userMessage }) {
  let output = `<h1 style="color:green">Вітаємо!Ви отримали листа</h1>
    <h2>Вам пише: ${userName}</h2>
    <h2>Імейл для зв'язку: ${userEmail}</h2>
    <h2>Текст повідомлення: ${userMessage}</h2>
    <h3 style="color:blue">Дякуємо,що звернулись до нас!</h3>`;

  const info = await transporter.sendMail({
    from: "svitlanabardashova@meta.ua",
    to: "svitlana112@outlook.es",
    subject: "Лист для директора",
    text: userMessage,
    html: output,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;
