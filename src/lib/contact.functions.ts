import { createServerFn } from "@tanstack/react-start";
import { ContactInput, deliverContactMessage } from "@/lib/contact.server";

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ContactInput.parse(input))
  .handler(async ({ data }) => deliverContactMessage(data));
