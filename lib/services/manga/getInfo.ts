import axios from "axios";

export default async function getMangaInfo(id: string) {
  try {
    console.log({ id });
    const { data } = await axios.post(`/api/manga/info`, { id });
    return data;
  } catch (e) {
    return e;
  }
}
