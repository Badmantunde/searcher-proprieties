export const CONTACT = {
  phoneDisplay: "09093652468",
  phoneE164: "+2349093652468",
  whatsappNumber: "2349093652468",
  email: "Hello@searcherproperties.com",
  officeAddress: "No 7 Ebun Street, Abule Oja, Yaba, Lagos",
} as const;

export const SOCIAL = {
  instagram:
    "https://www.instagram.com/searcherproperties?igsh=bXNscjkxam9udzU5",
} as const;

export function telHref(phone = CONTACT.phoneE164): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function mailtoHref(
  email = CONTACT.email,
  options?: { subject?: string; body?: string },
): string {
  const params = new URLSearchParams();
  if (options?.subject) params.set("subject", options.subject);
  if (options?.body) params.set("body", options.body);
  const qs = params.toString();
  return `mailto:${email}${qs ? `?${qs}` : ""}`;
}

export function mapsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function whatsappHref(
  text?: string,
  number = CONTACT.whatsappNumber,
): string {
  const base = `https://wa.me/${number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
