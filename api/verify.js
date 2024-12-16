export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { key, checkpoint } = req.query;

            if (!key) {
                return res.status(400).json({ success: false, error: 'No key provided.' });
            }

            // Linkvertise verification
            const linkvertiseURL = `https://publisher.linkvertise.com/api/v1/redirect/link/${key}/target`;

            const linkvertiseResponse = await fetch(linkvertiseURL);
            if (!linkvertiseResponse.ok) {
                return res.status(400).json({
                    success: false,
                    error: 'Failed to connect to Linkvertise API.'
                });
            }

            const linkvertiseData = await linkvertiseResponse.json();

            if (linkvertiseData.success) {
                res.status(200).json({
                    success: true,
                    message: 'Linkvertise verification successful.',
                    checkpoint: parseInt(checkpoint || 0) + 1
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: 'Linkvertise verification failed. Please complete the checkpoint.'
                });
            }
        } catch (error) {
            console.error('Error during verification:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error. Please try again later.'
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ success: false, error: 'Method not allowed.' });
    }
}
