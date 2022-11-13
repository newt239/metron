export type ProfileProps = {
  id: string;
  display_name: string;
  images: { url: string }[];
  country: string;
  type: "user";
};

export type TopTracksProps = {
  id: string;
  name: string;
  external_urls: { spotify: string };
  preview_url: string;
  type: "track";
  album: {
    images: {
      url: string;
      width: number;
      height: number;
    }[];
  };
}[];
