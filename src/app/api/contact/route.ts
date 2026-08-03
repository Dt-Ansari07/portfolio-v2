import { NextResponse, type NextRequest } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const parsed = contactFormSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { message: firstIssue?.message ?? "Invalid form submission." },
        { status: 422 }
      );
    }

    // Honeypot tripped -- silently accept without sending, so bots don't
    // learn their submission was rejected.
    if (parsed.data.company) {
      return NextResponse.json({ message: "Message sent." }, { status: 200 });
    }

    await sendContactEmail(parsed.data);

    return NextResponse.json({ message: "Message sent." }, { status: 200 });
  } catch (error) {
    // Never leak internals (stack traces, provider error bodies) to the client.
    console.error("[contact-api] failed to process submission:", error);
    return NextResponse.json(
      {
        message:
          "Something went wrong while sending your message. Please try again or email me directly.",
      },
      { status: 500 }
    );
  }
}
