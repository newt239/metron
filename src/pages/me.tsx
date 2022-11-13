import type { NextPage } from "next";

import TopTracks from "@/components/TopTracks";
import Profile from "@/components/block/Profile";

const Me: NextPage = () => {
  return (
    <div>
      <Profile />
      <TopTracks />
    </div>
  );
};

export default Me;
