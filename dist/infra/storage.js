"use strict";

// src/infra/storage.ts
require("dotenv").config();
var aws = require("aws-sdk");
var endpoint = new aws.Endpoint(process.env.endpoint_s3);
var s3 = new aws.S3({
  endpoint,
  credentials: {
    accessKeyId: process.env.id_key,
    secretAccessKey: process.env.app_key
  }
});
var uploadFile = async (path, buffer, mimetype) => {
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
};
var listFile = async () => {
  const arquivos = await s3.listObjects({
    Bucket: process.env.bucket
  }).promise();
  const files = arquivos.Contents.map((file) => {
    return {
      url: `https://${process.env.bucket}.${process.env.endpoint_s3}/${file.Key}`,
      path: file.Key
    };
  });
  return files;
};
module.exports = { uploadFile, listFile };
