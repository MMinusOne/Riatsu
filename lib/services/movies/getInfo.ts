import axios from "axios";

export default async function getMovieInfo(id: string) {
  try {
    console.log({ id });
    const { data } = await axios.post(`/api/movies/info`, { id });
    return data;
  } catch (e) {
    return e;
  }
}
