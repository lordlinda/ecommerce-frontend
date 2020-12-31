import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";

import AuthContext from "../context/AuthContext";
import { API_URL } from "../utils/utils";

const useOrders = (user, getToken) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      if (user) {
        try {
          const token = await getToken();
          const orderRes = await fetch(`${API_URL}/orders`);
          const data = await orderRes.json();
          if (data.statusCode === 401) {
            setOrders([]);
          } else {
            setOrders(data);
          }
        } catch (err) {
          setOrders([]);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  return { orders, loading };
};

export default () => {
  const { user, logoutUser, getToken } = useContext(AuthContext);

  const { orders, loading } = useOrders(user, getToken);

  if (!user) {
    return (
      <div>
        <p>Please Login or Register before accessing this page</p>
        <Link href="/">
          <a>Go Back</a>
        </Link>
      </div>
    );
  }
  console.log(orders, user);
  return (
    <div>
      <Head>
        <title>Your Account</title>
        <meta name="description" content="Your orders will be shown here" />
      </Head>
      <h2>Account Page</h2>

      <h3>Your Orders</h3>
      {loading && <p>Orders are Loading</p>}
      {orders.map((order) => (
        <div key={order.id}>
          {new Date(order.createdAt).toLocaleDateString("en-EN")}{" "}
          {order.product.name} ${order.total} {order.status}
        </div>
      ))}
      <hr />
      <p>Logged in as {localStorage.user}</p>
      <p>
        <a href="#" onClick={logoutUser}>
          Logout
        </a>
      </p>
    </div>
  );
};
