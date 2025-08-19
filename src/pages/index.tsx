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
