import { expect, it } from "vitest";

it("fails on purpose to check that CI fails (reverted before review)", () => {
  expect(1).toBe(2);
});
