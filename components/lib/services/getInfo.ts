import axios from 'axios';

export default async function getInfo(id: string) {
    try {
        console.log({ id })
        const { data } = await axios.post(`/api/info`, { id });
        return data;
    } catch (e) {
        return e;
    }
}