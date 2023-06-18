import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const IndexPage: React.FC = async () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${
    process.env.NEXT_PUBLIC_API_SPOTIFY_CLIENT_ID
  }&redirect_uri=${encodeURIComponent(
    "http://localhost:3000/callback"
  )}&scope=${encodeURIComponent(
    process.env.NEXT_PUBLIC_API_SPOTIFY_SCOPES || ""
  )}&response_type=token&state=xxxxxxxxxxxxxxxx&show_dialog=true`;

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {siteConfig.description}
        </h1>
      </div>
      <div className="flex gap-4">
        <Link className={buttonVariants()} href={url}>
          Sign In
        </Link>
      </div>
    </section>
  );
};

export default IndexPage;
