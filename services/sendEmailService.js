const nodemailer = require("nodemailer");

// Mailtrap SMTP configuration
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "59cd2fdc376d99", // Replace with your Mailtrap username
    pass: "0470da9bbc56a9", // Replace with your Mailtrap password
  },
});

/**
 * Send an email using Nodemailer
 * @param {string} from - The sender's email address
 * @param {string} to - The recipient's email address
 * @param {string} subject - The subject of the email
 * @param {string} text - The plain text body of the email
 * @param {string} html - The HTML body of the email
 */
const sendEmail = async (from, to, subject, text, html) => {
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error while sending email:", error);
  }
};

// Export the sendEmail function
module.exports = sendEmail;
