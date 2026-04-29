import nodemailer from 'nodemailer';

export async function sendPredatorAlertEmail(to: string[], predatorType: string, confidence: number, time: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Smart Farm Alert" <${process.env.EMAIL_USER}>`,
    to: to.join(","),
    subject: `Predator Detected: ${predatorType}`,
    text: `A predator (${predatorType}) was detected with ${confidence * 100}% confidence at ${time}. Please check the system for more details.`,
    html: `<b>Predator Detected:</b> ${predatorType}<br><b>Confidence:</b> ${(confidence * 100).toFixed(1)}%<br><b>Time:</b> ${time}<br><br>Please check the system for more details.`
  });

  return info;
}
