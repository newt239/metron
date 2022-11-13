import type { NextPage } from "next";

import Profile from "@/components/Profile";
import TopTracks from "@/components/TopTracks";

const Me: NextPage = () => {
  return (
    <div>
      <Profile />
      <TopTracks />
    </div>
  );
};

export default Me;
