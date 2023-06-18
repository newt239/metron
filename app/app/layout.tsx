import { cookies } from "next/headers";
import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ProfileProps } from "@/types/spotify";

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = async ({ children }) => {
  const tokenCookie = cookies().get("spotify_token");

  if (!tokenCookie) return null;

  const profile: ProfileProps = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${tokenCookie.value}`,
    },
  }).then((res) => res.json());

  return (
    <div className={cn("container", "flex")}>
      <aside
        className={cn(
          "w-1/4",
          "h-[calc(100vh-4rem)]",
          "sticky",
          "top-14",
          "p-3",
          "overflow-auto"
        )}
      >
        <div>
          <div className={cn("flex", "items-center")}>
            <Avatar>
              <AvatarImage src={profile.images[0].url} />
            </Avatar>
            <Button asChild className={cn("text-md")} variant="link">
              <Link href="/app/profile">{profile.display_name}</Link>
            </Button>
          </div>
        </div>
      </aside>
      <div className={cn("w-3/4", "p-3")}>{children}</div>
    </div>
  );
};

export default AppLayout;
