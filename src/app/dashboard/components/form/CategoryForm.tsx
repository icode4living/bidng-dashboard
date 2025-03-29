"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { useDropzone } from "react-dropzone";
import { gql } from "@apollo/client";
import graphqlHelper from "@/utils/graphqlClient";
import uploadCategoryBase64Image from "@/utils/category-image-upload";
import CategoryTable from "../CategoryTable";
const CREATE_CATEGORY = gql`
mutation createCategory(
    $name: String!
    $image: String!
  ) {
    createCategory(
        name: $name
        image: $image
      
      
    ) {
      id
      name
      createdAt
    }
  }
`;
const GET_CATEGORY_TABLE = gql`
query GetCategory {
    getCategory {
        id
        name
        createdAt
    }
    }`;
const AuctionFormOne = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("")
  const [data, setData] = useState()
  async function getCategory() {
    const data = await graphqlHelper.executeQuery(GET_CATEGORY_TABLE)
  setData(data)
}
useEffect(()=>{
getCategory()
},[])

  // Handle image upload using react-dropzone
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string); // Store Base64 image
      };
      reader.readAsDataURL(file);
    },
  });

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!name?.length) {
      setErrorText("Please enter a unique title");
      return
    }
    setIsLoading(true);

    try {
      const variables = {
        name,
        image:"https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
      };

      // Simulate API call
      const data = await graphqlHelper.executeMutation(CREATE_CATEGORY, variables);
      await uploadCategoryBase64Image(image,data?.createCategory.id)
      //console.log(JSON.stringify(data?.createAuction.id))
      alert("Category Created");      
      
      alert("Category Created Successfully!");
      setIsLoading(false);
      location.reload()
    } catch (error) {
      console.error("Error creating auction:", error);
      alert("Error creating auction");
      setIsLoading(false);
    }
  };

  return (
    <div className="container  p-4">
      {isLoading ? 
        <Loader />
       : 
        <div className="mx-auto">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Create Category
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  {/* Title Input */}
                  <div className="mb-5.5 block">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="auctionTitle"
                      >
                        Name
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        id="auctionTitle"
                        value={name}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter auction title"
                      />
                      <p className="text-pink-700 
                      text-sm">
                        {errorText}
                      </p>
                    </div>
                    <div className="w-full sm:w-1/2 mt-5">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="auctionTitle"
                      >
                        Image Upload
                      </label>
                      <div
                  {...getRootProps()}
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input {...getInputProps()} placeholder="click to upload..." 
                  required/>
                  </div>
                    </div>

</div>
                    

                  


                  {/* Form Buttons */}
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="reset"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      {isLoading ? "Uploading Auction..." : "Save"}
                    </button>
                  </div>
                  <div className="mt-8">
                  <CategoryTable data={data}/>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          {/*
          <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Item Image
                </h3>
              </div>
              <div className="p-7">
                <div
                  {...getRootProps()}
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                          fill="#3C50E0"
                        />
                      </svg>
                    </span>
                    <p>
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                    <p>(max, 800 X 800px)</p>
                  </div>
                </div>

                {image && (
                  <div className="mt-4">
                    <img
                      src={image}
                      alt="Uploaded Preview"
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
              </div>
              
            </div>
          </div>
          */}
        </div>
        
}
        
     
    </div>
      
  );
        
}

export default AuctionFormOne;


