"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const EMPTY = { name: "", email: "", phone: "", message: "", _honey: "" };

const ContactDialog = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }
      setStatus("success");
      setFormData(EMPTY);
      // Auto-close after a moment
      setTimeout(() => {
        onOpenChange(false);
        setTimeout(() => setStatus("idle"), 400); // reset after fade
      }, 2000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong.");
    }
  };

  const handleOpenChange = (next) => {
    // Block close while sending
    if (status === "sending") return;
    onOpenChange(next);
    if (!next) {
      // Reset error when dialog closes
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg("");
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] w-[95vw] max-w-[95vw] max-h-[90vh] overflow-y-auto p-4 sm:p-6 bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 shadow-2xl text-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center tracking-tight mt-2">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Connect
            </span>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-400 text-center mt-2 font-medium">
            Fill out the form below and I'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 py-10 px-2"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white tracking-tight mb-1">
                  Message sent
                </h3>
                <p className="text-sm text-gray-400">
                  Thanks — I'll get back to you soon.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 mt-6 px-2"
            >
              {/* Honeypot — invisible, bot-trap */}
              <input
                type="text"
                name="_honey"
                value={formData._honey}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  width: 1,
                  height: 1,
                  opacity: 0,
                }}
              />

              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-gray-300 font-medium ml-1">
                  Name *
                </Label>
                <Input
                  required
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={status === "sending"}
                  className="bg-white/5 border-white/10 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 text-white placeholder:text-zinc-500 rounded-xl h-12 mt-4 disabled:opacity-60"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-gray-300 font-medium ml-1">
                  Email *
                </Label>
                <Input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status === "sending"}
                  className="bg-white/5 border-white/10 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 text-white placeholder:text-zinc-500 rounded-xl h-12 mt-4 disabled:opacity-60"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-gray-300 font-medium ml-1">
                  Phone
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter Your Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={status === "sending"}
                  className="bg-white/5 border-white/10 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 text-white placeholder:text-zinc-500 rounded-xl h-12 mt-4 disabled:opacity-60"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="message"
                  className="text-gray-300 font-medium ml-1"
                >
                  Message *
                </Label>
                <Textarea
                  required
                  id="message"
                  name="message"
                  placeholder="How can I help you?"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "sending"}
                  className="bg-white/5 border-white/10 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 text-white placeholder:text-zinc-500 rounded-xl min-h-[120px] resize-none mt-4 disabled:opacity-60"
                />
              </div>

              {/* Error message */}
              <AnimatePresence>
                {status === "error" && errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-400/30 text-red-300 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-center mt-2 w-full pb-2">
                <ShimmerButton
                  type="submit"
                  shimmerColor="#a855f7"
                  className="w-full h-14 disabled:opacity-70"
                  disabled={status === "sending"}
                >
                  <span className="flex items-center justify-center gap-2 text-base font-semibold text-white tracking-wide">
                    {status === "sending" ? (
                      <>
                        Sending...
                        <Loader2 className="ml-1 w-5 h-5 animate-spin" />
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </span>
                </ShimmerButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
