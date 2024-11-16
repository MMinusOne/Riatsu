import axios from "axios";

export default async function searchContent(q: string) {
  try {
    const { data } = await axios.post(`/api/content/search`, { q });
    return data;
  } catch (e) {
    return e;
  }
}
