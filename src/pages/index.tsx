import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { queryClient, getDogs } from "@/api";
import { dehydrate, useQuery } from "react-query";

// const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  await queryClient.prefetchQuery("dog", () => getDogs());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { data } = useQuery(["dogs"], () => getDogs());
  return (
    <>
      <main>
        <h3>Homepage</h3>
        <div>{JSON.stringify(data)}</div>
      </main>
    </>
  );
}
