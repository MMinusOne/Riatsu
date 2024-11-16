import axios from "axios";

export default async function getTrendingAnime() {
  try {
    const { data } = await axios.get(`/api/anime/trending`);
    return data;
  } catch (e) {
    return e;
  }
}
