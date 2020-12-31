export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
export const MAGIC_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "pk_test_1CDC9FFE78D75ED8";

export const STRIPE_PK =
  process.env.NEXT_PUBLIC_STRIPE_PK ||
  "pk_test_51HD4TXGZmvdMGd5u0B04fLH1vXDAp4a3sIqX1WeVSs59ZLgTICkw7ORLF17xzk3qkEdZ3Jm2s2xRU7CgMCMdQ0rb00wE0zKTga";

export const fromImageToUrl = (image) => {
  if (!image) {
    return "/vercel.svg"; //Or default image here
  }
  if (image.url.indexOf("/") === 0) {
    //It's a relative url, add API URL
    return `${API_URL}${image.url}`;
  }

  return image.url;
};
