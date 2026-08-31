export type Track = {
  id: string;
  title: string;
  duration: string;
};

export type Album = {
  id: string;
  title: string;
  artist: string;
  year?: number;
  genre?: string;
  durationLabel?: string;
  coverUrl: string;
  tracklist?: Track[];
};

/** 0–5, in 0.5 increments for display. */
export type Rating = number;

export type DiaryEntry = {
  id: string;
  album: Album;
  rating: Rating;
  review?: string;
  dateLabel: string; // e.g. "OCT 24, 1974"
};

export type Friend = {
  id: string;
  name: string;
  avatarUrl?: string;
  initials?: string;
};

export type ActivityAction = 'logged' | 'wantlist';

export type ActivityItem = {
  id: string;
  user: Friend;
  action: ActivityAction;
  album: Album;
  rating?: Rating;
  review?: string;
  timeLabel: string; // e.g. "2h ago"
};

export type RankedEntry = {
  rank: number;
  album: Album;
};

export type List = {
  id: string;
  title: string;
  description?: string;
  albumIds: string[];
};
