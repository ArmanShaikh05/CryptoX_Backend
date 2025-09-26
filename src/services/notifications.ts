import transporter from "../lib/transporter.js";
import { Users } from "../models/userModel.js";
import { io } from "../server.js";

export async function notifyUser(userId: string, payload: any) {
  // Sending realtime alert using socket

  console.log("Notofying User");

  io.to(`user:${userId}`).emit("alert:triggered", payload);

  // Sending alert through email

  const user = await Users.findById(userId);

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>Crypto Price Alert</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        color: #333;
        padding: 0;
        margin: 0;
      }
      .container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .header {
        background-color: #6c63ff;
        color: white;
        padding: 20px;
        text-align: center;
        font-size: 22px;
      }
      .content {
        padding: 20px;
        line-height: 1.6;
      }
      .coin {
        font-weight: bold;
        font-size: 18px;
        color: #333;
      }
      .price {
        font-size: 24px;
        color: #6c63ff;
        font-weight: bold;
        margin-top: 10px;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #999;
        padding: 15px;
      }
      .btn {
        display: inline-block;
        background-color: #6c63ff;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">🚨 Crypto Price Alert</div>
      <div class="content">
        <p>Hi ${user.name || "there"},</p>
        <p>Your alert has been triggered for the following cryptocurrency:</p>
        <p class="coin">${payload.coin.toUpperCase()} (${payload.vs.toUpperCase()})</p>
        <p class="price">$${Number(payload.price).toLocaleString()}</p>
        <p>Keep an eye on the market and take action if needed!</p>
        <a href="https://www.coingecko.com/en/coins/${
          payload.coin
        }" class="btn" target="_blank">View Coin</a>
      </div>
      <div class="footer">
        This is an automated alert from YourApp. You are receiving this email because you set up a price alert.
      </div>
    </div>
  </body>
  </html>
  `;

  if (user?.email) {
    await transporter.sendMail({
      from: `213103@theemcoe.org`,
      to: user.email,
      subject: `Alert: ${payload.coin}`,
      html,
    });
  }
}
