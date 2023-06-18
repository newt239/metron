"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CallbackPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = window.location.href.split(/\=|\&/)[1];
    if (token) {
      window.document.cookie = `spotify_token=${token}`;
      router.push("/app");
    }
  }, []);
  return <div></div>;
};

export default CallbackPage;
