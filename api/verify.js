// vercel/api/verify.js
export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { key, checkpoint } = req.query;
        
        if (!key) {
            return res.status(400).json({ error: 'No key provided' });
        }

        // Verify Linkvertise completion here
        const linkvertiseResponse = await fetch(`https://publisher.linkvertise.com/api/v1/redirect/link/${key}/target`);
        const linkvertiseData = await linkvertiseResponse.json();

        if (linkvertiseData.success) {
            res.status(200).json({
                success: true,
                checkpoint: parseInt(checkpoint || 0) + 1
            });
        } else {
            res.status(400).json({ error: 'Linkvertise verification failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
