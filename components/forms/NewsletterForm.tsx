"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FooterConfig } from "@/data/footer";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

type NewsletterFormProps = {
  config: FooterConfig["newsletter"];
};

export function NewsletterForm({ config }: NewsletterFormProps) {
  const emailId = useId();
  const messageId = useId();
  const [message, setMessage] = useState("");

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<NewsletterFormValues>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(newsletterSchema),
  });

  async function onSubmit() {
    setMessage(config.successMessage);
    reset();
  }

  return (
    <form
      aria-describedby={messageId}
      className="grid gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label className="text-on-ink font-medium" htmlFor={emailId}>
        {config.label}
      </Label>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <Input
          aria-describedby={messageId}
          aria-invalid={Boolean(errors.email)}
          className="border-white/20 bg-white/10 text-white placeholder:text-white/60 focus-visible:ring-white"
          id={emailId}
          placeholder={config.placeholder}
          type="email"
          {...register("email", {
            onChange: () => setMessage(""),
          })}
        />
        <Button
          aria-label={config.buttonAriaLabel}
          className="text-ink bg-white hover:bg-white/90"
          disabled={isSubmitting}
          type="submit"
        >
          {config.buttonLabel}
        </Button>
      </div>
      <p
        className="text-small min-h-5 text-white/75"
        id={messageId}
        role={errors.email ? "alert" : message ? "status" : undefined}
      >
        {errors.email ? config.errorMessage : message}
      </p>
    </form>
  );
}
