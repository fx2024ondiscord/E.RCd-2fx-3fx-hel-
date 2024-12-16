// api/keys.js (Vercel API)
import { Redis } from '@upstash/redis'

const redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
})

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { hash, timestamp } = req.body;
        
        // Check if hash was used
        const used = await redis.get(`key:${hash}`);
        if (used) {
            return res.status(400).json({ error: 'Key already used' });
        }
        
        // Generate encrypted key
        const finalKey = generateSecureKey();
        
        // Store in Redis with 24h expiry
        await redis.set(`key:${hash}`, finalKey, { ex: 86400 });
        
        res.status(200).json({ finalKey });
    }
}

function generateSecureKey() {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const segments = 4;
    const segmentLength = 5;
    
    let key = "RBX-";
    for(let i = 0; i < segments; i++) {
        for(let j = 0; j < segmentLength; j++) {
            key += charset[Math.floor(Math.random() * charset.length)];
        }
        if(i < segments - 1) key += "-";
    }
    return key;
}
