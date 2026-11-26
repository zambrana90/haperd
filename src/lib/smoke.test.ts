import { describe, expect, it } from "vitest";
import { smoke } from "@/lib/smoke";

describe("test setup", () => {
  it("runs tests and resolves the @/ alias", () => {
    expect(smoke()).toBe("ok");
  });
});
