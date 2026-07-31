import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const insert = vi.fn();
const toastSuccess = vi.fn();
const toastError = vi.fn();

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: () => ({ insert }) },
}));
vi.mock("sonner", () => ({
  toast: { success: (m: string) => toastSuccess(m), error: (m: string) => toastError(m) },
}));

const { Contact } = await import("./Contact");

const fill = async (user: ReturnType<typeof userEvent.setup>, fields: Record<string, string>) => {
  for (const [label, value] of Object.entries(fields)) {
    await user.type(screen.getByLabelText(new RegExp(label, "i")), value);
  }
};

describe("<Contact />", () => {
  // Reset here rather than leaning on the global afterEach: these mocks are module-scoped
  // and captured by the hoisted vi.mock factory, so call history survives clearAllMocks.
  beforeEach(() => {
    insert.mockReset().mockResolvedValue({ error: null });
    toastSuccess.mockReset();
    toastError.mockReset();
  });

  it("writes a submission and confirms with a toast", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await fill(user, {
      "first name": "Ada",
      "last name": "Lovelace",
      "work email": "ada@example.com",
      "project details": "Please build us a website.",
    });
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(insert).toHaveBeenCalledTimes(1));
    expect(insert).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada@example.com",
      phone: null,
      message: "Please build us a website.",
      user_id: null,
    });
    expect(toastSuccess).toHaveBeenCalled();
  });

  it("joins only the names that were provided", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await fill(user, {
      "first name": "Ada",
      "work email": "ada@example.com",
      "project details": "No surname supplied.",
    });
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(insert).toHaveBeenCalledTimes(1));
    expect(insert.mock.calls[0][0].name).toBe("Ada");
  });

  it("blocks the write when the honeypot is filled, but still reports success", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await fill(user, {
      "first name": "Spam",
      "work email": "bot@example.com",
      "project details": "Cheap backlinks available now.",
      "leave this field empty": "Spam Corp",
    });
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalled());
    expect(insert).not.toHaveBeenCalled();
  });

  it("shows validation errors and writes nothing when the form is empty", async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByText(/first name is required/i)).toBeInTheDocument();
    expect(insert).not.toHaveBeenCalled();
  });

  it("surfaces an error toast when the insert fails", async () => {
    insert.mockResolvedValue({ error: { message: "boom" } });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const user = userEvent.setup();
    render(<Contact />);

    await fill(user, {
      "first name": "Ada",
      "work email": "ada@example.com",
      "project details": "This one will fail.",
    });
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(toastError).toHaveBeenCalled());
    expect(toastSuccess).not.toHaveBeenCalled();
  });
});
