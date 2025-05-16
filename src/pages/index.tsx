import { useRouter } from "next/router";
import { useEffect } from "react";

const Index: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dido");
  }, [router]);

  return <div></div>;
};

export default Index;
