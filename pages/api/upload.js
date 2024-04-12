import React from "react";
import multiparty from "multiparty";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
const bucket = "freshfare";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import mime from "mime-types";
import { mongo } from "mongoose";
import { isAdmin } from "./auth/[...nextauth]";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
  await mongooseConnect();
      await isAdmin(req, res);
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
  console.log("length:", files.file.length);
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_KEY,
    },
  });
const links = [];
  for (const file of files.file) {
    const extention = file.originalFilename.split(".").pop();
    const fileName = Date.now() + "." + extention;
    console.log({ fileName, file });

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: fileName,
        Body: fs.readFileSync(file.path),
        ACL: "public-read",
        ContentType: mime.lookup(file.path),
      })
    );
    const link = `https://${bucket}.s3.amazonaws.com/${fileName}`;
    links.push(link);
  }

  return res.json({ links });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
