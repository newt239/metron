export interface ProfileProps {
  id: string
  display_name: string
  images: { url: string }[]
  country: string
  type: "user"
}

export interface TrackProps {
  album: Album
  artists: DetailedArtist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: ExternalUrls
  href: string
  id: string
  is_playable: boolean
  linked_from: LinkedFrom
  restrictions: Restrictions
  name: string
  popularity: number
  preview_url?: string
  track_number: number
  type: string
  uri: string
  is_local: boolean
}

export interface AudioInfoProps {
  acousticness: number
  analysis_url: string
  danceability: number
  duration_ms: number
  energy: number
  id: string
  instrumentalness: number
  key: number
  liveness: number
  loudness: number
  mode: number
  speechiness: number
  tempo: number
  time_signature: number
  track_href: string
  type: string
  uri: string
  valence: number
}

export interface ArtistProps {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: ImagesEntity[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface ImagesEntity {
  url: string
  height: number
  width: number
}

export interface ExternalUrls {
  spotify: string
}

export interface Image {
  url: string
  height: number
  width: number
}

export interface Restrictions {
  reason: string
}

export interface Artist {
  external_urls: ExternalUrls
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export interface Album {
  album_type: string
  total_tracks: number
  available_markets: string[]
  external_urls: ExternalUrls
  href: string
  id: string
  images: Image[]
  name: string
  release_date: string
  release_date_precision: string
  restrictions: Restrictions
  type: string
  uri: string
  album_group: string
  artists: Artist[]
}
export interface Followers {
  href: string
  total: number
}

export interface DetailedArtist {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}

export interface ExternalIds {
  isrc: string
  ean: string
  upc: string
}

export interface LinkedFrom {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_ids: ExternalIds
  external_urls: ExternalUrls
  href: string
  id: string
  is_playable: boolean
  linked_from: LinkedFrom
  restrictions: Restrictions
  name: string
  popularity: number
  preview_url: string
  track_number: number
  type: string
  uri: string
  is_local: boolean
}
