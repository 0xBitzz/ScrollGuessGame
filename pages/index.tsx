
import Layout from "@/components/Layout";
import Game from "@/components/Game";
import Head from "next/head";

// Export the Home component
export default function Home() {
  return (
    <div>
      <Head>
        <title>Guessy</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        ></meta>
      </Head>
      <Game />
    </div>
  );
}
