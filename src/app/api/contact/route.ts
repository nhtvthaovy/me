
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Hàm xử lý POST request
export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Kiểm tra dữ liệu
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Cấu hình transporter gửi email
    const transporter = nodemailer.createTransport({
      service: "gmail", // Hoặc dùng SMTP provider khác
      auth: {
        user: process.env.EMAIL_USERNAME, 
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Cấu hình nội dung email
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USERNAME}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USERNAME,
      subject: "New Contact Message from Portfolio",
      html: `
        <h3>New Message from ${name}</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    // Gửi email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
  } catch (err) {
    console.error("Email error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
