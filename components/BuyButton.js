import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import { API_URL, STRIPE_PK } from "../utils/utils";
import styles from "../styles/BuyButton.module.css";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const stripePromise = loadStripe(
  "pk_test_51HD4TXGZmvdMGd5u0B04fLH1vXDAp4a3sIqX1WeVSs59ZLgTICkw7ORLF17xzk3qkEdZ3Jm2s2xRU7CgMCMdQ0rb00wE0zKTga"
);

export default function BuyButton({ product }) {
  const { user, getToken } = useContext(AuthContext);
  const router = useRouter();

  const handleBuy = async (e) => {
    const stripe = await stripePromise;
    e.preventDefault();
    const res = await fetch(`${API_URL}/orders/`, {
      method: "POST",
      body: JSON.stringify({
        product,
        user: localStorage.user,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const session = await res.json();
    console.log("session", session);
    if (session.id) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    }
  };

  const redirectToLogin = async () => {
    router.push("/login");
  };

  return (
    <>
      {user && (
        <button className={styles.buy} onClick={handleBuy}>
          BUY
        </button>
      )}
      {!user && (
        <button className={styles.buy} onClick={redirectToLogin}>
          Login to Buy
        </button>
      )}
    </>
  );
}
