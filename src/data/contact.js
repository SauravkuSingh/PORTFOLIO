// Email people can reach Saurav at directly.
export const EMAIL = "sauravksinghdev@gmail.com";

// Phone numbers people can call directly.
export const PHONES = ["+91 7415727270", "+91 8839745270"];

// "+91 7415727270" -> "tel:+917415727270"
export const telHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;
