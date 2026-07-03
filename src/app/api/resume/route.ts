import { NextResponse } from "next/server";
import PDFDocument from "pdfkit";

export async function GET() {
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 50, bottom: 50, left: 50, right: 50 },
  });

  const buffers: Buffer[] = [];
  doc.on("data", (chunk: Buffer) => buffers.push(chunk));

  return new Promise<Response>((resolve) => {
    doc.on("end", () => {
      const pdf = Buffer.concat(buffers);
      resolve(
        new NextResponse(pdf, {
          headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "attachment; filename=Hisham_Al_Sayed_Gomaa_Resume.pdf",
          },
        }),
      );
    });

    const gray = "#666666";
    const black = "#111111";
    const lightGray = "#f5f5f5";
    const bold = "Helvetica-Bold";
    const reg = "Helvetica";

    // Helper
    function section(title: string) {
      doc.moveDown(0.8);
      doc.rect(50, doc.y, doc.page.width - 100, 22).fill(lightGray);
      doc.fillColor(black).fontSize(11).font(bold).text(title, 55, doc.y + 5, { lineBreak: false });
      doc.moveDown(0.3);
      doc.fillColor(gray).fontSize(9).font(reg);
    }

    function line(text: string, boldText = false) {
      doc.font(boldText ? bold : reg).fontSize(9).fillColor(black).text(text, { indent: 0 });
    }

    function bullet(text: string) {
      doc.font(reg).fontSize(9).fillColor(black).text(`• ${text}`, { indent: 10 });
    }

    // --- Header ---
    doc.fontSize(22).font(bold).fillColor(black).text("Hisham Al Sayed Gomaa", { align: "center" });
    doc.moveDown(0.2);
    doc.fontSize(11).font(reg).fillColor(gray).text("MERN Stack Developer", { align: "center" });
    doc.moveDown(0.15);
    doc.fontSize(8).fillColor(gray).text(
      "heshamelsauied@gmail.com  •  +201092045221  •  Al Sharqiya",
      { align: "center" },
    );
    doc.fontSize(8).fillColor(gray).text("LinkedIn  •  GitHub", { align: "center" });
    doc.moveDown(0.5);

    // --- Summary ---
    section("Summary");
    line(
      "MERN Stack Developer experienced in building full-stack web applications using React, Node.js, Express, and MongoDB. Strong knowledge of REST APIs, authentication, and state management. Focused on performance, scalability, and clean code.",
    );

    // --- Education ---
    section("Education");
    line("Bachelor's Degree in Computer Science (CS Department)", true);
    line("Obour Institutes, Obour City, Cairo  |  Grade: Good");
    line("June 2020 – June 2024");

    // --- Skills ---
    section("Skills");
    line("Front End:", true);
    line("HTML, CSS, Tailwind CSS, JavaScript, TypeScript, React.js, Next.js, Redux Toolkit, Shadcn UI, Axios, React Router, React Hook Form, Framer Motion");
    doc.moveDown(0.2);
    line("Back End:", true);
    line("Node.js, Express.js, MongoDB with Mongoose, PostgreSQL, Prisma, REST APIs, JWT Authentication, Role-Based Access Control, MVC Architecture");
    doc.moveDown(0.2);
    line("Tools:", true);
    line("Git & GitHub, Postman");

    // --- Soft Skills ---
    section("Soft Skills");
    bullet("Effective communication and teamwork");
    bullet("Quick adaptation to new technologies");
    bullet("Ability to work independently and in teams");
    bullet("Time and task management skills");
    bullet("Ability to build scalable full stack applications");
    bullet("Self and Fast Learning");

    // --- Projects ---
    section("Projects");
    line("MERN Stack E-Commerce Platform  |  React.js & Express.js", true);
    line("Live Store • Live Dashboard System  |  March 2026");
    bullet("Built using MongoDB, Express.js, React.js, and Node.js with clear separation between frontend (User + Admin)");
    bullet("Implemented secure authentication and authorization using JWT, allowing different access levels");
    bullet("Designed a flexible product system supporting variants (colors & sizes), dynamic pricing, stock tracking");
    bullet("Developed a cart system with real-time quantity updates and strict stock validation");
    bullet("Built full order lifecycle handling including creation, status updates, tracking, and admin-side order control");
    bullet("Integrated charts and statistics for sales, orders, and product performance");
    bullet("Implemented coupon-based discount logic with validation rules and dynamic price calculation");
    bullet("Structured backend using MVC architecture with clean, reusable, and scalable API endpoints");
    bullet("Managed application state using Context API and built responsive UI using React and Tailwind CSS");

    doc.end();
  });
}
