import multer from 'multer';
import crypto from 'node:crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
console.log("🚀 ~ file: multer.ts:7 ~ __filename:", __filename)
const __dirname = path.dirname(__filename);
console.log("🚀 ~ file: multer.ts:9 ~ __dirname:", __dirname)

const upload = multer({
    dest: path.resolve(__dirname, '..', 'tmp', 'uploads'),
    limits: { fileSize: 1024 * 1024 * 20 },
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, '..', 'tmp', 'uploads'));
        },
        filename(req, file, callback) {
            const fileName = `${crypto.randomBytes(20).toString('hex')}${file.originalname
                }`;
            callback(null, fileName);
        },
    }),
});

export { upload };