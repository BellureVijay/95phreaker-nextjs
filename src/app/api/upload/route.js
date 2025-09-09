import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Force Node.js runtime
export const runtime = 'nodejs';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req) {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Try to get the raw Node.js request
    const nodeReq = req?.[Symbol.for('nodejs.request')];
    if (!nodeReq) {
        return NextResponse.json({ message: 'Raw request not available' }, { status: 500 });
    }

    const form = formidable({
        uploadDir,
        keepExtensions: true,
        filename: (_1, _2, part) => `${Date.now()}-${part.originalFilename}`,
    });

    return new Promise((resolve) => {
        form.parse(nodeReq, (err, fields, files) => {
            if (err) {
                console.error(err);
                resolve(NextResponse.json({ message: 'Upload failed', error: err.message }, { status: 500 }));
                return;
            }

            const fileKey = Object.keys(files)[0];
            if (!fileKey) {
                resolve(NextResponse.json({ message: 'No file uploaded' }, { status: 400 }));
                return;
            }
            const fileObj = Array.isArray(files[fileKey]) ? files[fileKey][0] : files[fileKey];
            const filePath = fileObj?.newFilename;

            resolve(NextResponse.json({ message: 'Upload successful', file: `/uploads/${filePath}` }));
        });
    });
}
