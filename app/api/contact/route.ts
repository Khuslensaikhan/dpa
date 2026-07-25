import { Resend } from "resend";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getField(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const name = getField(payload.name);
  const email = getField(payload.email);
  const phone = getField(payload.phone);
  const industry = getField(payload.industry);
  const projectDescription = getField(payload.projectDescription);
  const website = getField(payload.website);

  if (website) {
    return Response.json({ ok: true });
  }

  if (
    !name ||
    name.length > 120 ||
    !emailPattern.test(email) ||
    email.length > 254 ||
    phone.length > 40 ||
    industry.length > 120 ||
    !projectDescription ||
    projectDescription.length > 5_000
  ) {
    return Response.json(
      {
        error:
          "Enter a valid name, email address, and brief project description.",
      },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;

  if (!apiKey || !from || !to) {
    return Response.json(
      { error: "Messaging is not configured yet. Please email us directly." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `Name: ${name}\nEmail address: ${email}\nPhone number: ${phone || "Not provided"}\nIndustry: ${industry || "Not provided"}\n\nProject description:\n${projectDescription}`,
  });

  if (error) {
    console.error("Unable to send contact form message through Resend", error);

    return Response.json(
      { error: "We could not send your message. Please email us directly." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
