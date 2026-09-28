import type { NextRequest } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, message } = body

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string" || !name || !email || !message) {
    return Response.json(
      {
        success: false,
        error: "Missing required fields. Please fill out all fields.",
      },
      { status: 400 },
    )
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev", // must be verified in Resend
      to: ["namandadhich15592@gmail.com"],
      replyTo: email,
      subject: `New Message from ${name.slice(0, 120)}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
             <p><strong>Email:</strong> ${escapeHtml(email)}</p>
             <p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>`,
    })

    if (error) {
      console.error("Resend API error:", error)
      return Response.json(
        {
          success: false,
          error: `Email service error: ${error.message || "Unknown error"}`,
        },
        { status: 500 },
      )
    }

    return Response.json({
      success: true,
      messageId: data?.id,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    )
  }
}
