const mailer = require("nodemailer");

/**
 * --- EMAIL UTILITY ---
 * Handles sending automated emails through Gmail.
 */

const sendingMail = async (to, subject, text) => {
  // Set up the connection to the Gmail SMTP server
  const transpoter = mailer.createTransport({
    service: "gmail",
    auth: {
      user: "patelmuhammad192@gmail.com",
      pass: "mmpq ujon hkws gkkn",
    },
  });

  // Define what the email looks like
  const mailOption = {
    from: "patelmuhammad192@gmail.com",
    to: to,
    subject: subject,
    html: text,
  };

  // Actually send the thing and log the result
  const mailresponse = await transpoter.sendMail(mailOption);
  console.log("Email sent successfully:", mailresponse.messageId);

  return mailresponse;
};

module.exports = {
  sendingMail,
};