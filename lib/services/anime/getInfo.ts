import { SUB_OR_DUB } from "@/types";
import axios from "axios";

export default async function getAnimeInfo(
  id: string
) {
  try {
    const { data } = await axios.post(`/api/anime/info`, { id });
    return data;
  } catch (e) {
    return e;
  }
}
