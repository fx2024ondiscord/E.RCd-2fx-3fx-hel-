export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { type } = req.body;

            if (!type || (type !== 'free' && type !== 'premium')) {
                return res.status(400).json({ error: 'Invalid key type provided. Use "free" or "premium".' });
            }

            const timestamp = Date.now();
            const randomPart = Math.random().toString(36).substring(7).toUpperCase();
            const key = type === 'free' 
                ? `TEST-${randomPart}`
                : `PREMIUM-${randomPart}-${timestamp}`;

            return res.status(200).json({ key });
        } else {
            res.setHeader('Allow', ['POST']);
            return res.status(405).json({ error: 'Method not allowed. Use POST.' });
        }
    } catch (error) {
        console.error('Error generating key:', error);
        return res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
}
