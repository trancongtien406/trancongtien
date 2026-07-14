import slugifyLib from "slugify";

export function toSlug(input: string) {
  return slugifyLib(input, {
    lower: true,
    strict: true,
    locale: "vi",
    trim: true,
  });
}
