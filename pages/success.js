import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/router";
import { API_URL } from "../utils/utils";

import Link from "next/link";

const useOrder = async (session_id) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/orders/confirm`, {
          method: "POST",
          body: JSON.stringify({
            checkout_session: session_id,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });

        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setOrder(null);
      }
      setLoading(false);
    };
    if (session_id) {
      fetchOrder();
    }
  }, [session_id]);

  return { order, loading };
};

export default function Success() {
  const router = useRouter();
  const { session_id } = router.query;
  console.log(session_id);
  const { order, loading } = useOrder(session_id);
  return (
    <div>
      <h2>Hold on!</h2>
      {loading && <p>We're confirming your purchase!</p>}
      {!loading && order && (
        <p>
          Your order was processed successfully!{" "}
          <Link href="/account">View Orders</Link>
        </p>
      )}
    </div>
  );
}
