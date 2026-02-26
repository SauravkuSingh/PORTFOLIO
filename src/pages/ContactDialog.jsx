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
import { Send } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const ContactDialog = ({ open, onOpenChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // reset
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    // close dialog after submit
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 shadow-2xl text-white rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center tracking-tight mt-2">
            Let's{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              Connect
            </span>
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-400 text-center mt-2 font-medium">
            Fill out the form below and I'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6 px-2">
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
              className="bg-white/5 border-white/10 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 text-white placeholder:text-zinc-500 rounded-xl h-12 mt-4"
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
              className="bg-white/5 border-white/10 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 text-white placeholder:text-zinc-500 rounded-xl h-12 mt-4"
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
              className="bg-white/5 border-white/10 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 text-white placeholder:text-zinc-500 rounded-xl h-12 mt-4"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-gray-300 font-medium ml-1">
              Message *
            </Label>
            <Textarea
              required
              id="message"
              name="message"
              placeholder="How can I help you?"
              value={formData.message}
              onChange={handleChange}
              className="bg-white/5 border-white/10 focus-visible:ring-violet-500/50 focus-visible:border-violet-500/50 text-white placeholder:text-zinc-500 rounded-xl min-h-[120px] resize-none mt-4"
            />
          </div>

          <div className="flex justify-center mt-4 w-full pb-2">
            <button type="submit" className="w-full">
              <ShimmerButton shimmerColor="#a855f7" className="w-full h-14">
                <span className="flex items-center justify-center gap-2 text-base font-semibold text-white tracking-wide">
                  Send Message <Send className="ml-2 w-5 h-5" />
                </span>
              </ShimmerButton>
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
