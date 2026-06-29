"use client";

import { type FormEvent, useId, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FooterConfig } from "@/data/footer";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type NewsletterFormProps = {
  config: FooterConfig["newsletter"];
};

export function NewsletterForm({ config }: NewsletterFormProps) {
  const emailId = useId();
  const messageId = useId();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });

    if (!parsed.success) {
      setErrorMessage(config.errorMessage);
      setMessage("");
      return;
    }

    setEmail("");
    setErrorMessage("");
    setMessage(config.successMessage);
  }

  return (
    <form
      aria-describedby={messageId}
      className="grid gap-3"
      onSubmit={onSubmit}
    >
      <Label className="text-on-ink font-medium" htmlFor={emailId}>
        {config.label}
      </Label>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <Input
          aria-describedby={messageId}
          aria-invalid={Boolean(errorMessage)}
          className="border-white/20 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white"
          id={emailId}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
            setMessage("");
          }}
          placeholder={config.placeholder}
          type="email"
          value={email}
        />
        <Button
          aria-label={config.buttonAriaLabel}
          className="text-ink bg-white hover:bg-white/90"
          type="submit"
        >
          {config.buttonLabel}
        </Button>
      </div>
      <p
        className="text-small min-h-5 text-white/75"
        id={messageId}
        role={errorMessage ? "alert" : message ? "status" : undefined}
      >
        {errorMessage || message}
      </p>
    </form>
  );
}
