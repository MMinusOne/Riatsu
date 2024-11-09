import axios from 'axios';

export default async function getAiring() {
    try {
        const { data } = await axios.get(`/api/airing`);
        return data;
    } catch (e) {
        return e;
    }
}