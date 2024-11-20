import axios from "axios";

export default async function getSpotlightAnime() {
  try {
    const { data } = await axios.get(`/api/anime/spotlight`);
    return data;
  } catch (e) {
    return e;
  }
}
