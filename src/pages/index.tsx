import Footer from "components/Footer";
import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div  className=" flex flex-col h-screen justify-between">
      <Head>
        <title>SOLANA TOOLS FORK</title>
        <meta
          name="description"
          content="Solana tools to help you in the solana ecosystem"
        />
      </Head>
      <HomeView />
      <Footer/>
    </div>
  );
};

export default Home;
