import axios from "axios";

const uploadImage = async (file: File, auctionId: string) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload/${auctionId}`, // Adjust base URL
      formData,
      {
        headers: { "Content-Type": "multipart/form-data",
            "x-api-key":`${process.env.NEXT_PUBLIC_API_KEY}`
         },
      }
    );

    console.log("Image uploaded:", response.data.imageUrl);
    return response.data.imageUrl;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
/*
const uploadCategoryBase64Image = async (base64Image: string, auctionId: string) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/image/category/${auctionId}`, { base64Image,
      headers: { "Content-Type": "application/json",
        "x-api-key":`${process.env.NEXT_PUBLIC_API_KEY}`
     },
     });
    console.log("Image uploaded:", response.data.imageUrl);
    return response.data.imageUrl;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
export default uploadCategoryBase64Image;*/
const uploadCategoryBase64Image = async (base64Image: string, auctionId: string) => {
  try {
    if (!/^data:image\/(png|jpe?g|webp);base64,/.test(base64Image)) {
      console.error("Invalid base64 format");
      return null;
    }

    const cleanBase64 = base64Image.replace(/^data:image\/\w+;base64,/, ""); // Remove header

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/image/category/${auctionId}`,
      { base64Image: cleanBase64 }, // Send only raw base64
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      }
    );

    console.log("Image uploaded:", response.data.imageUrl);
    return response.data.imageUrl;
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
export default uploadCategoryBase64Image;