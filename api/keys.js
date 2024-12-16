// api/keys.js (Vercel API route)
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { key } = req.body;
        
        // Generate final key
        const finalKey = `RBX-${Math.random().toString(36).substring(7)}-${Date.now()}`;
        
        res.status(200).json({ finalKey });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
