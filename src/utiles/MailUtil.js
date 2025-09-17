const axios = require("axios");

const sendingMail = async (to, subject, htmlContent) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.BREVO_USER }, // Verified sender
        to: [{ email: to }],
        subject: subject,
        htmlContent: htmlContent,
      },
      {
        headers: {
          "api-key": process.env.BREVO_PASS, // Brevo API key
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Mail sent:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "❌ Error sending email:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = { sendingMail };
