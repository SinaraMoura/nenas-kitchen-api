require('dotenv').config();
const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.endpoint_s3);

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.id_key,
        secretAccessKey: process.env.app_key
    }
});

const uploadFile = async (path: any, buffer: any, mimetype: any) => {
    const arquivo = await s3.upload({
        Bucket: process.env.bucket,
        Key: path,
        Body: buffer,
        ContentType: mimetype
    }).promise();

    return {
        url: arquivo.Location,
        path: arquivo.Key
    };
}

const listFile = async () => {
    const arquivos = await s3.listObjects({
        Bucket: process.env.bucket
    }).promise();

    const files = arquivos.Contents.map((file: any) => {
        return {
            url: `https://${process.env.bucket}.${process.env.endpoint_s3}/${file.Key}`,
            path: file.Key
        }
    })

    return files;
}

module.exports = { uploadFile, listFile }