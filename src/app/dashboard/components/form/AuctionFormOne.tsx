"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import { useEffect, useState } from "react";
import Select from "@/components/ui/Form/Select";
import Loader from "@/components/common/Loader";
import { useDropzone } from "react-dropzone";
import { gql } from "@apollo/client";
import graphqlHelper from "@/utils/graphqlClient";
import uploadBase64Image from "@/utils/image-upload";
import { CategoryProps, getCategoryItem } from "../util/getCategory";
const CREATE_AUCTION_MUTATION = gql`
  mutation CreateAuction(
    $title: String!
    $description: String!
    $startPrice: Float!
    $category: String!
    $startDate: String!
    $expiresAt: String!
    $deadlineHours: Int
    $ticketPrice:Float
    $image: String!
    $isPremium: Boolean!
  ) {
    createAuction(
      input: {
        title: $title
        description: $description
        startPrice: $startPrice
        category: $category
        startDate: $startDate
        expiresAt: $expiresAt
        deadlineHours:$deadlineHours
        ticketPrice:$ticketPrice
        image: $image
        isPremium: $isPremium
      }
    ) {
      id
      title
      description
      startPrice
      category
      startDate
      image
      expiresAt
      isPremium
    }
  }
`;
const AuctionFormOne = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [startPrice, setStartPrice] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [expireAtDate, setExpireAtDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
const [categories, setCategories] = useState<CategoryProps>()
const [deadlineHours, setDeadlineHours] = useState<string>("");
const [ticketPrice, setTicketPrice] = useState<string>("");

 /**
   * Handles file selection and converts the file to Base64.
   * @param event - The file input change event.
   */
 const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      const base64 = await convertFileToBase64(file);
      setImage(base64);
    } catch (error) {
      console.error('Error converting file to Base64:', error);
      alert('Failed to convert file to Base64.');
    }
  }
};

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
    setIsLoading(true);

    try {
      const variables = {
        title,
        description,
        startPrice: parseFloat(startPrice),
        category,
        startDate,
        deadlineHours:parseInt(deadlineHours),
        ticketPrice:parseFloat(ticketPrice),
        expiresAt: expireAtDate,
        image:"https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ=",
        isPremium,
      };

      // Simulate API call
      const data = await graphqlHelper.executeMutation(CREATE_AUCTION_MUTATION, variables);
      await uploadBase64Image(image,data?.createAuction.id)
      //console.log(JSON.stringify(data?.createAuction.id))
      alert("Auction Created");      
      
      alert("Auction Created Successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating auction:", error);
      alert("Error creating auction");
      setIsLoading(false);
    }
  };
useEffect(()=>{
getCategoryItem().then((item)=>{
   setCategories(item);
   console.log(categories)
})
},[])
  return (
    <div className="mx-auto max-w-270">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Upload Auction
                </h3>
              </div>
              <div className="p-7">
                <form onSubmit={handleSubmit}>
                  {/* Title Input */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="auctionTitle"
                      >
                        Title
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        id="auctionTitle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter auction title"
                      />
                    </div>

                    {/* Start Price Input */}
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="startPrice"
                      >
                        Start Price
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        id="startPrice"
                        value={startPrice}
                        onChange={(e) => setStartPrice(e.target.value)}
                        placeholder="Enter start price"
                      />
                    </div>
                  </div>
  {/* Deadline Input */}
  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="auctionTitle"
                      >
                        Payment Deadline
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        id="deadLineHours"
                        value={deadlineHours}
                        onChange={(e) => setDeadlineHours(e.target.value)}
                        placeholder="Auction redeem deadline"
                     required
                     />
                    </div>

                    {/* Start Price Input */}
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="startPrice"
                      >
                        Ticket Price
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        id="startPrice"
                        value={ticketPrice}
                        onChange={(e) => setTicketPrice(e.target.value)}
                        placeholder="Enter ticket price"
                      required
                      />
                    </div>
                  </div>
                  {/* Date Pickers */}
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <DatePickerOne
                      label="Start Date"
                      onChange={setStartDate}
                    />
                    <DatePickerOne
                      label="End Date"
                      onChange={setExpireAtDate}
                    />
                  </div>

                  {/* Category Select */}
                  <div className="mb-5.5">
                    {<Select
                      label="Category"
                      options={categories?.getCategory||[]}
                      onChange={(e) => setCategory(e.target.value)}
                    />}
                    {/*<select
                    onChange={(e) => setCategory(e.target.value)}
                    >
                      {categories?.getCategory.map((cat)=>
                      <option value={cat.name}>{cat.name}</option>
                      )}
                    </select>*/}
                  </div>

                  {/* Description Textarea */}
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="description"
                    >
                      Item Description
                    </label>
                    <textarea
                      className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      id="description"
                      rows={6}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Write the item description"
                    ></textarea>
                  </div>

                  {/* Premium Checkbox */}
                  <div className="mb-5.5">
                    <label
                      htmlFor="checkboxLabelOne"
                      className="flex cursor-pointer select-none items-center"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabelOne"
                          className="sr-only"
                          checked={isPremium}
                          onChange={() => setIsPremium(!isPremium)}
                        />
                        <div
                          className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                            isPremium && "border-primary bg-gray dark:bg-transparent"
                          }`}
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-sm ${
                              isPremium && "bg-primary"
                            }`}
                          ></span>
                        </div>
                      </div>
                      Set this auction as Premium?
                    </label>
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
                </form>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
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

                {/* Display Image Preview */}
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
        </div>
      )}
    </div>
  );
};

export default AuctionFormOne;