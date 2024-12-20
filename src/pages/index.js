import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Feed from "../components/Feed";
import style from "../styles/Home.module.css";

export default function Home() {

  return (
    <div>
      <Head>
        <title>Plead Prayer App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Cross-Origin-Opener-Policy" content="same-origin-allow-popups" />
      </Head>
      {/* Header */}
      <Header />
      {/* Feed */}
      <Feed />
    </div>
  );
}
