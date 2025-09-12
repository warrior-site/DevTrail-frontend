import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchJournals } from "../store/journalAction";
import JournalCreate from "../components/JournalCreate";
import {toast} from "react-toastify"

function Journal() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user?._id);

  const [isCreateForm, setIsCreateForm] = useState(false);

  const { loading, journal } = useSelector((state) => state.journal);
  const journals = journal?.data || [];

useEffect(()=>{
  const  fetch = async ()=>{
    if(userId && journals.length === 0){
     const response = await dispatch(fetchJournals(userId));
      console.log("Fetched journals for user:", userId);
      console.log(response)
      if (response.data.message) {
            toast.success(response.data.message)
          } else {
            toast.error(response.data.message)
          }
    }
  }
  fetch();
},[userId,journals.length,dispatch]);
 

  return (
    <div className="p-6 w-full min-h-screen">
      <div className="flex flex-row items-center justify-between w-full mb-6">
        <h1 className="text-2xl font-bold mb-6">📓 My Journals</h1>

      {/* Toggle Button */}
      <button
        onClick={() => setIsCreateForm((prev) => !prev)}
        className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition"
      >
        {isCreateForm ? "Close Form" : "Create Journal"}
      </button>
      </div>
      

      {/* Conditional Rendering */}
      {isCreateForm ? (
        <JournalCreate />
      ) : loading ? (
        <p className="text-gray-400">Loading journals...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {journals.length === 0 ? (
            <p className="text-gray-400 col-span-full">
              No journals found. Either click "Create Journal" to add one or
              click "Fetch Journals".
            </p>
          ) : (
            journals.map((journal, idx) => (
              <motion.div
                key={journal._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.5 }}
                className="bg-gray-900 text-white rounded-2xl p-5 shadow-lg border border-gray-700"
              >
                <h2 className="text-xl font-semibold">{journal.title}</h2>
                <p className="text-gray-300 mt-2">{journal.content}</p>

                {/* Tags */}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {journal.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-blue-600 px-2 py-1 rounded-md text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <p className="text-sm mt-3 text-gray-400">
                  Visibility:{" "}
                  <span className="font-medium">{journal.visibility}</span>
                </p>

                {/* Attachments */}
                {journal.attachments.length > 0 && (
                  <div className="mt-3">
                    <h3 className="font-medium">Attachments:</h3>
                    {journal.attachments.map((file, i) => (
                      <a
                        key={i}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 underline text-sm block"
                      >
                        {file.filename}
                      </a>
                    ))}
                  </div>
                )}

                <p className="text-xl text-gray-500 mt-3">
                  Created at:{" "}
                  {new Date(journal.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Fetch button (only if no journals and not in create mode) */}
      {/* {!isCreateForm && journals.length === 0 && (
        <button
          onClick={handleFetch}
          className="mt-6 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium transition"
        >
          Fetch Journals
        </button>
      )} */}
    </div>
  );
}

export default Journal;
