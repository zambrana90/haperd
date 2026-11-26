import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/contact/route";

const { createTransport, sendMail } = vi.hoisted(() => {
  const sendMail = vi.fn();
  return { sendMail, createTransport: vi.fn(() => ({ sendMail })) };
});

// No test may reach a real mail server.
vi.mock("nodemailer", () => ({ default: { createTransport } }));

const recipient = ["owner", "example.test"].join("@");
const message = "Texto privado de la visita";
const genericError = { success: false, error: "No se pudo enviar el mensaje." };

function post(body: string) {
  return POST(
    new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }),
  );
}

describe("POST /api/contact", () => {
  const log = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    createTransport.mockImplementation(() => ({ sendMail }));
    for (const method of ["log", "info", "warn", "error", "debug"] as const) {
      vi.spyOn(console, method).mockImplementation(log);
    }
    vi.stubEnv("CONTACT_TO_EMAIL", recipient);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllEnvs();
  });

  it("sends the message to the address in CONTACT_TO_EMAIL", async () => {
    const response = await post(JSON.stringify({ message }));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ success: true });
    expect(sendMail).toHaveBeenCalledOnce();
    expect(sendMail).toHaveBeenCalledWith(
      expect.objectContaining({ to: recipient, text: message }),
    );
    expect(log).not.toHaveBeenCalled();
  });

  it.each([undefined, ""])(
    "returns the generic error when CONTACT_TO_EMAIL is %j",
    async (value) => {
      vi.stubEnv("CONTACT_TO_EMAIL", value);

      const response = await post(JSON.stringify({ message }));

      expect(response.status).toBe(500);
      expect(await response.json()).toEqual(genericError);
      expect(createTransport).not.toHaveBeenCalled();
      expect(log.mock.calls).toEqual([
        ["Contact email not sent: CONTACT_TO_EMAIL is not set."],
      ]);
    },
  );

  it.each([
    ["the error code", { code: "EAUTH" }, "EAUTH"],
    ["the error name without a code", {}, "Error"],
  ])("on a failed send logs only %s", async (_case, extra, label) => {
    sendMail.mockRejectedValue(
      Object.assign(new Error(`Rejected ${recipient}: ${message}`), {
        rejected: [recipient],
        ...extra,
      }),
    );

    const response = await post(JSON.stringify({ message }));

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual(genericError);
    expect(log.mock.calls).toEqual([["Error sending contact email:", label]]);
  });

  it.each([message, "null"])(
    "returns the generic error and logs nothing for the body %j",
    async (body) => {
      const response = await post(body);

      expect(response.status).toBe(500);
      expect(await response.json()).toEqual(genericError);
      expect(sendMail).not.toHaveBeenCalled();
      expect(log).not.toHaveBeenCalled();
    },
  );

  it("rejects an empty message", async () => {
    const response = await post(JSON.stringify({ message: "  " }));

    expect(response.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
});
