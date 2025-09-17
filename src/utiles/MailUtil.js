const nodemailer = require("nodemailer");

const sendingMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587, // TLS port
      secure: false, // must be false for port 587
      auth: {
        user: process.env.BREVO_USER, // verified email in Brevo
        pass: process.env.BREVO_PASS, // Brevo API key
      },
    });

    const mailOption = {
      from: process.env.BREVO_USER, // must match your Brevo verified sender
      to,
      subject,
      text: text.replace(/<[^>]*>?/gm, ""), // fallback plain text (remove HTML tags)
      html: text, // HTML content
    };

    const mailresponse = await transporter.sendMail(mailOption);
    console.log("✅ Mail sent successfully:", mailresponse.messageId);
    return mailresponse;
  } catch (err) {
    console.error("❌ Error sending email:", err.message);
    throw err;
  }
};

module.exports = { sendingMail };
