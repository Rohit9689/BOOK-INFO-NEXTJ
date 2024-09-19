"use client";
import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";
import axios from "axios";
import styles from "./Page.module.css";
import toast from "react-hot-toast";

const Page = () => {
  const [userData, setUserData] = useState({ data: [] });
  const [searchData, setSearchData] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const confirmDelete = (id) => {
    setDeleteId(id);
  };
  const cancleDelete = () => {
    setDeleteId(null);
  };

  useEffect(() => {
    const GetData = async () => {
      try {
        let response = await axios.get(`http://localhost:3003/books/get-books`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    GetData();
  }, []);

  const handleDelete = async (_id) => {
    try {
      const deleteURL = `http://localhost:3003/books/delete-books/${_id}`;
      console.log("Delete URL:", deleteURL);

      const deletedBookData = await axios.delete(deleteURL);
      console.log("Deleted book data:", deletedBookData);

      toast.success("Data is Deleted Successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.error("Deleting of Data failed");
    }
  };

  return (
    <>
      <NavBar term={searchData} setTerm={setSearchData} />

      <div className={styles.container}>
        <h1>Posts</h1>
        <div className={styles.postList}>
          {userData.data
            ?.filter((obj) =>
              obj.title.toLowerCase().includes(searchData.toLowerCase())
            )
            .map((post) => (
              <div key={post.id} className={styles.postItem}>
                <h2>{post.title}</h2>
                <p>{post.author}</p>
                <p>{post.price}</p>
                <p>{post.comments}</p>
                <p>{post.rating}</p>
                {deleteId === post._id ? (
                  <div className={styles.confirmationDialog}>
                    <p>Are you sure you want to delete this post?</p>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className={styles.confirmButton}
                    >
                      Yes, Delete
                    </button>
                    <button
                      onClick={cancleDelete}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => confirmDelete(post._id)}
                    className={styles.deleteButton}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;
