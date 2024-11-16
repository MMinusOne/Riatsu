import axios from "axios";

export default async function getEpisodesInfo(id: string) {
  try {
    const { data } = await axios.post(`/api/anime/episodes/list/`, { id });
    return data;
  } catch (e) {
    return e;
  }
}
