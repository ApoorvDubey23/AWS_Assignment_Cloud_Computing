import express from "express";
import { S3Client,PutObjectCommand ,GetObjectCommand,ListObjectsV2Command} from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import multer from "multer";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

upload.single('post');//adding the name samw as coming from the freontend

//cloud-computing-assignment


const accessKey=process.env.ACCESS_KEY;
const secretAccessKey=process.env.SECRET_ACCESS_KEY;
const bucketName=process.env.BUCKET_NAME;
const bucketRegion=process.env.BUCKET_REGION;

const s3=new S3Client({
    region:bucketRegion,
    credentials:{
        accessKeyId:accessKey,
        secretAccessKey:secretAccessKey
    }
});

app.get("/api/posts",async(req,res)=>{
    console.log("requested");
   const listParams = {
       Bucket: bucketName,
       Prefix: ""
   };
   const command1=new ListObjectsV2Command(listParams);
   const data=await s3.send(command1);
//    console.log(data);
   
    const posts=await Promise.all(data.Contents.map(async({Key})=>{
        const getObjectParams = {
            Bucket: bucketName,
            Key
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        return { id: Key, url };
    }));
    console.log(posts);
    res.json(posts);
});
app.post("/api/posts",upload.single('post'),async(req,res)=>{
    console.log("title:",req.body.title);
    console.log("image:",req.file);
    const command=new PutObjectCommand({
        Bucket:bucketName,
        Key:`${Date.now()}____${req.body.title}____${req.file.originalname}`,
        Body:req.file.buffer,
        ContentType:req.file.mimetype
    });
    await s3.send(command);

    res.send({});
})

app.listen(8800, () => {
    console.log("Server is running on port 8800");
});