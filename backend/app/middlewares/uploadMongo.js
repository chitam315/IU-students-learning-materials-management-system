import multer from "multer"
import path, { join } from "path"
import { fileURLToPath } from 'url';
import { GridFsStorage} from "multer-gridfs-storage"
import {nanoid} from "nanoid"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filter = (req,file,cb) => {
    // const allowedExtension = [".pdf"]
    // const regex = new RegExp(allowedExtension.join("|"),"i")
    console.log(file);
    const fileExtension = path.extname(file.originalname)
    // console.log(fileExtension);
    if (/\.pdf/g.test(fileExtension)) {
        // console.log("you are allowed to upload file");
        cb(null,true)
    } else {
        // console.log("you are not allowed to upload file");
        cb(new Error("Your file is not allowed"),false)
    }
}

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req,file) => {
        return {
            filename: `${nanoid(32)}${path.extname(file.originalname)}`,
            bucketName: process.env.BUCKET_NAME
        }
    }
})

export const uploadMongo = multer({storage, fileFilter: filter})