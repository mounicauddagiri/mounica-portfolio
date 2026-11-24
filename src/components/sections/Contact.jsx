import emailjs from "emailjs-com";
import { useState } from "react";

const fieldClass =
  "w-full rounded-lg border border-line bg-panel/70 px-4 py-3 text-fg placeholder:text-muted/60 transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (field) => (e) => setFormData({ ...formData, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        e.target,
        import.meta.env.VITE_PUBLIC_kEY
      )
      .then(() => {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch(() => setStatus("error"));
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 md:py-32">
      <div aria-hidden="true" className="glow pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="text-4xl font-bold tracking-[-0.03em] md:text-5xl">Let's work together</h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            Have a role, a project or an AI idea in mind? Send a message and I'll reply by email.
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Name</span>
              <input type="text" name="name" required value={formData.name} onChange={update("name")} className={fieldClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm text-muted">Email</span>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={update("email")}
                placeholder="you@example.com"
                className={fieldClass}
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Message</span>
            <textarea name="message" required rows={5} value={formData.message} onChange={update("message")} className={fieldClass} />
          </label>
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-lg bg-accent px-5 py-3 font-medium text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12),0_10px_30px_-10px_rgb(139_92_246/0.8)] transition hover:bg-violet-500 disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>
          <p role="status" aria-live="polite" className="min-h-5 text-sm">
            {status === "sent" && <span className="text-emerald-400">Message sent. I'll reply by email soon.</span>}
            {status === "error" && (
              <span className="text-red-400">Your message didn't send. Check your connection and try again.</span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
};
