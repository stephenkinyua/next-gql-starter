import { queryClient, getDogs } from "@/api";
import { dehydrate, useQuery } from "react-query";

// import { Inter } from "@next/font/google";
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
