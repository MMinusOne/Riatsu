import axios from "axios";

export default async function getTrendingManga() {
  try {
    const { data } = await axios.get(`/api/manga/trending`);
    return data;
  } catch (e) {
    return e;
  }
}
