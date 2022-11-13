import { useAtomValue } from "jotai";
import { useRouter } from "next/router";

import type { NextPage } from "next";

import { profileAtom } from "@/jotai";

const Home: NextPage = () => {
  const profile = useAtomValue(profileAtom);
  const router = useRouter();
  const { user_id } = router.query;
  if (!profile || profile.id !== user_id) return <div>no data</div>;
  return (
    <div>
      <ul>
        <li>{user_id}</li>
        <li>{profile.display_name}</li>
      </ul>
    </div>
  );
};

export default Home;
