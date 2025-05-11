import type { NextRequest } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, message } = body

  if (!name || !email || !message) {
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
      subject: `New Message from ${name}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
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
