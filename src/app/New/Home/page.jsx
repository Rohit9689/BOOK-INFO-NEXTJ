"use client";
import React, { useState } from "react";
import NavBar from "../NavBar";
import styles from './Page.module.css'; 
import axios from "axios";
import toast from "react-hot-toast";

const Page = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    rating: "",
    price: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleRating = (e) => {
    setBookData({
      ...bookData,
      rating: e.target.value,
    });
  };

   const handleSubmit =async(e)=>{
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:3003/books//add-book',bookData)
        console.log(response.data)
        toast.success("Book Data Added Successfully")
        
    } catch (error) {

      console.error(error,"error posting data")
      toast.error("Enter All Fields")
    }
   }
  return (
    <>
      <NavBar />
      <div className="container mx-auto mt-8 px-4 max-w-lg">
        <div className="bg-black text-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Book Information</h2>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-300 font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={bookData.title}
                onChange={handleChange}
                className="w-full border border-gray-600 rounded-lg p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Title"
              />
            </div>

            {/* Author */}
            <div className="mb-4">
              <label htmlFor="author" className="block text-gray-300 font-medium mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={bookData.author}
                onChange={handleChange}
                className="w-full border border-gray-600 rounded-lg p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Author"
              />
            </div>

            {/* Rating */}
            <div className="mb-4">
              <label htmlFor="rating" className="block text-gray-300 font-medium mb-2">
                Rating
              </label>
              <div className={styles.rating}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star} className={styles.star}>
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      onChange={handleRating}
                      checked={bookData.rating == star}
                    />
                    <span className={styles.starIcon}>★</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-300 font-medium mb-2">
                Price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                value={bookData.price}
                onChange={handleChange}
                className="w-full border border-gray-600 rounded-lg p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Price"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-300 font-medium mb-2">
              Comments
              </label>
              <textarea
                id="comments"
                name="comments"
                value={bookData.comments}
                onChange={handleChange}
                className="w-full border border-gray-600 rounded-lg p-2 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Description"
                rows="4"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
