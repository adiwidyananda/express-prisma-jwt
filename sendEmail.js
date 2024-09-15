const sendEmail = require("./services/sendEmailService");

// Example usage of the sendEmail function
const main = async () => {
  const from = "sender@example.com";
  const to = "recipient@example.com";
  const subject = "Test Email from Node.js";
  const text =
    "Hello, this is a test email sent from a Node.js script using Mailtrap!";
  const html =
    "<p>Hello, this is a test email sent from a <b>Node.js</b> script using Mailtrap!</p>";

  await sendEmail(from, to, subject, text, html);
};

main();
