import { describe, expect, it } from "vitest";
import { securityHeaders } from "@/lib/security-headers";

const headers = new Map(
  securityHeaders.map(({ key, value }) => [key.toLowerCase(), value]),
);

describe("securityHeaders", () => {
  it.each([
    ["x-content-type-options", "nosniff"],
    ["x-frame-options", "DENY"],
    ["referrer-policy", "strict-origin-when-cross-origin"],
  ])("sets %s to %s", (key, value) => {
    expect(headers.get(key)).toBe(value);
  });

  it.each(["camera", "microphone", "geolocation"])(
    "turns off %s in Permissions-Policy",
    (feature) => {
      expect(headers.get("permissions-policy")).toContain(`${feature}=()`);
    },
  );

  it("does not set a Content-Security-Policy", () => {
    expect(
      [...headers.keys()].filter((key) =>
        key.startsWith("content-security-policy"),
      ),
    ).toEqual([]);
  });
});
