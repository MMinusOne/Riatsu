import { IAnimeResult } from "@consumet/extensions";

export declare type ContentEnvironmentState =
  | {
      stream: NegativeStream;
      episode: PostiveEpisodeMeta;
      videoControls: EpisodeControls;
    }
  | {
      stream: NegativeStream;
      episode: NegativeEpisodeMeta;
      videoControls: EpisodeControls;
    }
  | {
      stream: PositiveStream;
      episode: PostiveEpisodeMeta;
      videoControls: EpisodeControls;
    }
  | {
      stream: PositiveStream;
      episode: NegativeEpisodeMeta;
      videoControls: EpisodeControls;
    };

export interface PositiveStream {
  loadingStream: boolean;
  streams: Stream[];
  currentStream: Stream;
  meta: StreamMeta;
  subtitles: Subtitle[];
  proxiedStream: string;
}

export interface NegativeStream {
  loadingStream: boolean;
  streams: Stream[] | [];
  currentStream: Stream | null;
  meta: StreamMeta | null;
  subtitles: Subtitle[] | [];
  proxiedStream: string | null;
}

export interface PostiveEpisodeMeta {
  loadingEpisode: false;
  meta: EpisodeMeta;
  episodeIndex: number;
}

export interface NegativeEpisodeMeta {
  loadingEpisode: true;
  meta: null;
  episodeIndex: null;
}

export interface EpisodeControls {
  autoSkipIntro: boolean;
  autoSkipOutro: boolean;
  server: SERVER_NAME;
}

export interface Stream {
  url: string;
  type: string;
  isM3U8: boolean;
}

export interface StreamMeta {
  intro: {
    start: number;
    end: number;
  };
  outro: {
    start: number;
    end: number;
  };
}

export interface EpisodeMeta {
  id: string;
  number: number;
  title: string;
  isFiller: boolean;
  url: string;
}

export interface Subtitle {
  url: string;
  lang: string;
}

export enum SERVER_NAME {
  ZORO = "zoro",
  GOGO = "gogo",
}

export enum SUB_OR_DUB {
  DUB = "dub",
  SUB = "sub",
}

export interface EpisodeDisplayProps {
  episodesData: any[];
  selectedEpisode: PostiveEpisodeMeta;
  onEpisodeSelect: (episodeData: any, episodeIndex: number) => void;
}

export interface VideoDisplayProps {
  contentEnvironment: ContentEnvironmentState;
  animeData: IAnimeResult;
}

export interface ConfigurationDisplayProps {
  contentEnvironment: ContentEnvironmentState;
  onSelectAutoSkipIntro: (selected: boolean) => void;
  onSelectAutoSkipOutro: (selected: boolean) => void;
}

export interface ServerDisplayProps {
  onServerSelect: () => void;
  contentEnvironment: ContentEnvironmentState;
  selectedServer: SERVER_NAME;
}

export interface ServerTableProps {
  name: SUB_OR_DUB;
  servers: SERVER_NAME[];
  onServerSelect: () => void;
  selectedServer: SERVER_NAME;
}

export interface InfoDisplayProps {
  animeData: IAnimeResult;
}
