import { queryClient, dogByName } from "@/api";
import { dehydrate, useQuery } from "react-query";

export async function getServerSideProps({ params }) {
  await queryClient.prefetchQuery("dog", () =>
    dogByName({
      name: params.name,
    })
  );

  return {
    props: {
      name: params.name,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function DogDetailPage({ name }) {
  const { data } = useQuery(["dog"], () => dogByName({ name }));

  if (!data.dog) {
    return <div>No dog found!</div>;
  }

  return (
    <div>
      <div>DogDetailPage</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}

export default DogDetailPage;
