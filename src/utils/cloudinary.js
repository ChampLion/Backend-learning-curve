import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

 cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });

const uploadonCloudinary = async(filepath)=> {
    try {
        if(filepath) {
            const response = await cloudinary.uploader.upload(filepath,{
                resource_type:"auto"
            })
            fs.unlinkSync(filepath)
            return response
        }
        else return null
    } catch (error) {
        fs.unlinkSync(filepath)
        return null
    }
}

export {uploadonCloudinary}