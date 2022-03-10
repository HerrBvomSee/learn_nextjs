import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export default function Home({ data, countries }) {
  console.log(countries);

  return (
    <div className={styles.container}>
      <Head>
        <title>Cov19 tracker</title>
        <meta name="description" content="Covid19 data tracker example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch("https://api.covid19api.com/summary");
  const data = await res.json();
  const countries = await data.Countries.filter(
    (country) => country.TotalConfirmed < 5000
  );
  countries.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed ? 1 : -1));
  return {
    props: { data, countries }, // will be passed to the page component as props
  };
}
