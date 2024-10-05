"use client";
import { useEffect, useState } from "react";
import httpRequest from "./utils/httpRequest";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await httpRequest({
          uri: "/",
          method: "GET",
        });
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>
      )}
    </>
  );
}
// // app/page.js
// import httpRequest from "./utils/httpRequest";

// const Home = async () => {
//   let data = null;

//   try {
//     data = await httpRequest({
//       url: "/", // Ensure this points to your API endpoint
//       method: "GET",
//     });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     data = null; // Handle error as needed
//   }

//   return (
//     <>{!data ? <div>Loading...</div> : <div>{JSON.stringify(data)}</div>}</>
//   );
// };

// export default Home;
