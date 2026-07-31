import { describe, expect, it } from "vitest";
import { contactSchema, submissionSchema } from "./submission-schema";

const validSubmission = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  phone: "+44 20 7946 0958",
  message: "I'd like to discuss a project.",
};

describe("submissionSchema", () => {
  it("accepts a well-formed submission", () => {
    expect(submissionSchema.safeParse(validSubmission).success).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    const parsed = submissionSchema.parse({ ...validSubmission, name: "  Ada  " });
    expect(parsed.name).toBe("Ada");
  });

  it.each([
    ["empty name", { name: "" }],
    ["name over 100 chars", { name: "a".repeat(101) }],
    ["malformed email", { email: "not-an-email" }],
    ["empty message", { message: "" }],
    ["message over 2000 chars", { message: "a".repeat(2001) }],
    ["letters in phone", { phone: "call-me-maybe" }],
  ])("rejects %s", (_label, override) => {
    expect(submissionSchema.safeParse({ ...validSubmission, ...override }).success).toBe(false);
  });

  it("treats phone as optional", () => {
    expect(submissionSchema.safeParse({ ...validSubmission, phone: "" }).success).toBe(true);
    const { phone: _dropped, ...withoutPhone } = validSubmission;
    expect(submissionSchema.safeParse(withoutPhone).success).toBe(true);
  });
});

describe("contactSchema", () => {
  const validContact = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    message: "Hello there.",
  };

  it("accepts a well-formed contact", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("requires a first name but not a last name", () => {
    expect(contactSchema.safeParse({ ...validContact, firstName: "" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...validContact, lastName: "" }).success).toBe(true);
  });

  it("does not carry over the submission-only fields", () => {
    expect(contactSchema.shape).not.toHaveProperty("name");
    expect(contactSchema.shape).not.toHaveProperty("phone");
  });

  it("leaves the honeypot unvalidated so bots reach the handler check", () => {
    // Rejecting here would surface a visible form error and tell the bot what tripped it.
    expect(contactSchema.safeParse({ ...validContact, company: "Spam Corp" }).success).toBe(true);
  });
});
