import axios from "axios";

new axios.Axios({})

export default async function getAnimeAiring() {
  try {
    const { data } = await axios.get(`/api/anime/airing`);
    return data;
  } catch (e) {
    return e;
  }
}
