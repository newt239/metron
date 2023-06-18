import Link from "next/link";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { spotifyClient } from "@/lib/spotify";
import { cn } from "@/lib/utils";
import { ProfileProps } from "@/types/spotify";

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = async ({ children }) => {
  const profile = await spotifyClient<ProfileProps>("me");

  if (!profile) return null;

  return (
    <div className={cn("container", "flex")}>
      <aside
        className={cn(
          "w-1/4",
          "h-[calc(100vh-5rem)]",
          "sticky",
          "top-0",
          "overflow-auto"
        )}
      >
        <div className={cn("relative", "top-3")}>
          <div className={cn("flex", "items-center")}>
            <Avatar>
              <AvatarImage src={profile.images[0].url} />
            </Avatar>
            <Button asChild className={cn("text-md")} variant="link">
              <Link href="/app">{profile.display_name}</Link>
            </Button>
          </div>
        </div>
      </aside>
      <div className={cn("w-3/4")}>
        <div className={cn("p-3")}>{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
