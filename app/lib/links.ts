export const CONTACT = {
  phoneDisplay: "+234 801 234 5678",
  phoneE164: "+2348012345678",
  whatsappNumber: "2348012345678",
  email: "Hello@searcherproperties.com",
  officeAddress: "No 7 Ebun Street, Abule Oja, Yaba, Lagos",
} as const;

export const SOCIAL = {
  facebook: "https://www.facebook.com/searcherproperties",
  instagram: "https://www.instagram.com/searcherproperties",
  tiktok: "https://www.tiktok.com/@searcherproperties",
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
