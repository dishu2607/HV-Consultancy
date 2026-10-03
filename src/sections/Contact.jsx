import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import Reveal from "../components/Reveal";
import Eyebrow from "../components/Eyebrow";
import { FloatingField } from "../components/ui/floating-input";

// ---------------------------------------------------------------------------
// Where enquiries go: a private Google Sheet, not an inbox.
//
// This posts the form straight to a Google Apps Script "Web App" URL, which
// appends a row to a Sheet only you have access to. No email is sent to
// anyone — the visitor just gets the on-screen confirmation below, and you
// read new enquiries in the Sheet whenever you check it.
//
// One-time setup (see SETUP.md in the project root for the full script to
// paste in):
//
// 1. Create a Google Sheet — e.g. "HV Consultancy — Enquiries".
// 2. Extensions -> Apps Script, paste the doPost() from SETUP.md, Deploy
//    -> New deployment -> Web app -> Execute as "Me" -> Who has access
//    "Anyone" -> Deploy. Copy the /exec URL it gives you.
// 3. Paste that URL below.
//
// ---------------------------------------------------------------------------

const SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbw_3w-Htgbq0ktAXIc6pi05nGN5MSpfq477onCuNOklljXSnYHbL04avR0Umy2J-z-B/exec";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    // Honeypot — a hidden field real visitors never fill in.
    if (formData.get("company_website")) {
      setStatus("sent");
      return;
    }

    setStatus("sending");

    const payload = new URLSearchParams({
      name: formData.get("name") ?? "",
      email: formData.get("email") ?? "",
      message: formData.get("message") ?? "",
    });

    try {
      // Apps Script Web Apps don't return CORS headers we can read, so this
      // request is fired in "no-cors" mode: we can't inspect the response,
      // but the row still lands in the Sheet. A genuine network failure
      // (offline, DNS, blocked) still rejects and falls into the catch below.
      await fetch(SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });

      setStatus("sent");
      e.target.reset();
    } catch (err) {
      console.error("Enquiry submission error:", err);
      setStatus("error");
    }
  }

  return (
    <section
      id="contact"
      className="relative bg-ink text-paper overflow-hidden"
    >
      <div className="relative max-w-content mx-auto px-6 md:px-10 pt-8 md:pt-10 pb-12 md:pb-16 grid md:grid-cols-[0.9fr_1.1fr] gap-14">
        {/* Left: framing + ledger-style contact meta */}
        <Reveal>
          <Eyebrow dark>Get in touch</Eyebrow>

          <h2 className="font-display text-3xl md:text-5xl leading-tight mt-4 mb-8">
            Tell us which deliverable you need, and by when.
          </h2>

          <p className="text-paper/80 leading-relaxed mb-10 max-w-sm">
            One message is usually enough for us to scope the engagement and
            quote a fixed fee. Expect a reply within a business day or two.
          </p>

          <div className="space-y-4">
            {[
              {
                label: "Response time",
                value: "1–2 business days",
              },
              {
                label: "Regions served",
                value: "US · UK · EMEA · APAC",
              },
            ].map((row) => (
              <div
                key={row.label}
                className="ledger-row-dark flex items-baseline justify-between py-3"
              >
                <span className="text-xs text-paper/70 font-mono">
                  {row.label}
                </span>

                <span className="text-sm text-paper/90">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <a
            href="mailto:contact.hvconsultancy@gmail.com"
            className="group mt-8 inline-flex items-center gap-2 text-sm text-paper/85 hover:text-amber transition-colors"
          >
            <Mail size={15} />

            contact.hvconsultancy@gmail.com

            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </Reveal>

        {/* Right: the form itself, aligned with the main heading */}
        <Reveal
          delay={0.1}
          className="md:pt-[3.25rem]"
        >
          <div className="relative rounded-3xl border border-rule-dark bg-ink-2/70 backdrop-blur-sm p-8 md:p-10">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.15,
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                    }}
                    className="h-16 w-16 rounded-full bg-amber/15 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2
                      size={30}
                      className="text-amber"
                      strokeWidth={1.5}
                    />
                  </motion.div>

                  <h3 className="font-display text-2xl mb-2">
                    Message received
                  </h3>

                  <p className="text-paper/80 text-sm max-w-xs">
                    Thanks — your enquiry has been logged and we'll follow up
                    within 1–2 business days.
                  </p>

                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-8 text-xs text-paper/70 underline underline-offset-4 hover:text-paper/85 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  onSubmit={handleSubmit}
                  className="space-y-7"
                >
                  <FloatingField
                    label="Name"
                    id="name"
                    name="name"
                    required
                  />

                  <FloatingField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    required
                  />

                  <FloatingField
                    label="Message"
                    id="message"
                    name="message"
                    as="textarea"
                    rows={4}
                    required
                  />

                  {/* Honeypot field — hidden from real visitors via CSS, not aria-hidden,
                      so screen readers still skip it correctly while bots that fill every
                      field get caught. */}
                  <div
                    className="absolute -left-[9999px]"
                    aria-hidden="true"
                  >
                    <label htmlFor="company_website">
                      Company website
                    </label>

                    <input
                      type="text"
                      id="company_website"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={{
                      scale:
                        status === "sending"
                          ? 1
                          : 1.02,
                    }}
                    whileTap={{
                      scale:
                        status === "sending"
                          ? 1
                          : 0.98,
                    }}
                    className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber text-ink font-medium rounded-full px-7 py-3.5 text-sm overflow-hidden disabled:opacity-70 transition-colors hover:bg-amber-2"
                  >
                    <AnimatePresence
                      mode="wait"
                      initial={false}
                    >
                      {status === "sending" ? (
                        <motion.span
                          key="sending"
                          initial={{
                            opacity: 0,
                            y: 4,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -4,
                          }}
                          className="inline-flex items-center gap-2"
                        >
                          <Loader2
                            size={16}
                            className="animate-spin"
                          />

                          Sending…
                        </motion.span>
                      ) : (
                        <motion.span
                          key="idle"
                          initial={{
                            opacity: 0,
                            y: 4,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -4,
                          }}
                          className="inline-flex items-center gap-2"
                        >
                          Send message

                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {status === "error" && (
                    <motion.p
                      initial={{
                        opacity: 0,
                      }}
                      animate={{
                        opacity: 1,
                      }}
                      className="flex items-center gap-2 text-sm text-red-400"
                    >
                      <Mail size={14} />

                      Something went wrong — please try again in a moment.
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}