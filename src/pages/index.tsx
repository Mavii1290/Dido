import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dido");
  }, [router]);

  return (<div>
        <div className="p-6">
      <div className="bg-red-500 text-white p-4 md:bg-blue-500">
        Tailwind Test: Red on mobile, Blue on desktop
      </div>
    </div>
  </div>);
};

export default Index;


// import Dido from "./dido";
// export default Dido;


// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { PostHogProvider } from 'posthog-js/react';
// import posthog from 'posthog-js';
// import { Banner } from '@/Banner';

// // Optional: wrap in layout only if needed
// import { App } from './_app';

// posthog.init("<ph_project_api_key>", {
//   api_host: "https://us.i.posthog.com",
// });

// export default function IndexPage() {
//   const router = useRouter();

//   useEffect(() => {
//     router.push("/dido"); // ✅ Client-side redirect
//   }, [router]);

//   return (
//     <PostHogProvider client={posthog}>
//       {/* This renders while redirect happens */}
//       <Banner />
//     </PostHogProvider>
//   );
// }
