import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


export const upload_image = async (file_path: string, name_product: string) => {

    return await cloudinary.uploader.upload(file_path, {
        folder: `products/${ name_product }`
    })
}


export const delete_image = async( public_id: string ) => {
    return await cloudinary.uploader.destroy(public_id)
}


