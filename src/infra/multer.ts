import multer from 'multer';
import crypto from 'node:crypto';
import path from 'path';
import fs from 'fs';

const pathName = path.resolve(__dirname, 'tmp', 'uploads');
if (!fs.existsSync(pathName)) {
    fs.mkdirSync(pathName, { recursive: true });
}
const upload = multer({
    dest: pathName,
    limits: { fileSize: 1024 * 1024 * 20 },
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, pathName);
        },
        filename(req, file, callback) {
            const fileName = `${crypto.randomBytes(20).toString('hex')}${file.originalname
                }`;
            callback(null, fileName);
        },
    }),
});

export { upload };