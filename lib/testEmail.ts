import dotenv from "dotenv";
// prefer .env.local when present (local dev), fall back to .env
dotenv.config({ path: ".env.local" });
dotenv.config();
// Import sendEmail after dotenv runs so environment variables are available to the email module
(async () => {
  try {
    const { sendEmail } = await import("./email.ts");

    const info = await sendEmail({
      to: "ajmalcm22@gmail.com",
      subject: "Test email from Litlaces (Brevo SMTP)",
      text: "Hello — test",
      html: "<strong>Hello — test</strong>",
    });

    // Log the full info object — messageId may be undefined depending on provider/type
    console.log("Sent:", info);
  } catch (err) {
    console.error("Send failed:", err);
  }
})();