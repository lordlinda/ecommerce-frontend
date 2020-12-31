export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY;

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK;

export const fromImageToUrl = (image) => {
  if (!image) {
    return "/vercel.svg"; //Or default image here
  }

  return image.url;
};
