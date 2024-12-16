// vercel/api/keys.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { type } = req.body;
        
        const key = type === 'free' 
            ? `TEST-${Math.random().toString(36).substring(7).toUpperCase()}`
            : `PREMIUM-${Math.random().toString(36).substring(7).toUpperCase()}-${Date.now()}`;
        
        res.status(200).json({ key });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
