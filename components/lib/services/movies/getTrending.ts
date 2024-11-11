import axios from "axios";

export default async function getTrendingMovies() {
  try {
    const { data } = await axios.get(`/api/movies/trending`);
    return data;
  } catch (e) {
    return e;
  }
}
