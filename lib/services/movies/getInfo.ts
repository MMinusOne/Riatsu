import axios from "axios";

export default async function getMovieInfo(id: string) {
  try {
    const { data } = await axios.post(`/api/movies/info`, { id });
    return data;
  } catch (e) {
    return e;
  }
}
