import axios from 'axios';

export default async function handler(req, res) {
    try {
        const response = await axios.get('https://suitmedia-backend.suitdev.com/api/ideas', {
            params: req.query,
        });

        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
}
