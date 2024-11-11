import axios from "axios";

export default async function getAnimeTrailerData(youtubeId: string) {
  try {
    const { data } = await axios.get(
      `https://pipedapi.kavin.rocks/streams/${youtubeId}`
    );
    return data;
  } catch (error) {
    return error;
  }
}
