import axios from 'axios';

export default async function getTrending() {
    try {
        const { data } = await axios.get(`/api/trending`);
        return data;
    } catch (e) {
        return e;
    }
}