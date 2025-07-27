import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (
  email: string,
  token: string,
  isVerify: boolean,
  redirect_url?: string,
) => {
  let url;
  if (isVerify) {
    const params = new URLSearchParams();
    params.set("token", token);
    if (redirect_url) params.set("redirect_url", redirect_url);
    console.log(params)
    url = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?${params.toString()}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  }

  await transporter.sendMail({
    to: email,
    subject: isVerify ? "Verify Your Email" : "Reset Password",
    html: `Click <a href="${url}">here</a> to ${isVerify ? "verify your email" : "reset your password"}.`,
  });
};
