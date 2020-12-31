import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import { fromImageToUrl, API_URL } from "../utils/utils";
import { twoDecimals } from "../utils/format";
export default function Home({ products }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Classy fashions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {products.map((product) => (
        <div className={styles.product} key={product.id}>
          <Link href={`/products/${product.Slug}`}>
            <a>
              <div className={styles.product__Rows}>
                <div className={styles.product__ColImg}>
                  <img src={fromImageToUrl(product.image)} />
                </div>
                <div className={styles.product__Col}>
                  {product.name} ${twoDecimals(product.price)}
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const product_res = await fetch(`${API_URL}/products/`);
  const products = await product_res.json();

  return {
    props: {
      products,
    },
  };
}
