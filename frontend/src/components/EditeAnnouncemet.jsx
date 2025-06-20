// EditAnnouncement.jsx

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAnnouncementById,
  useUpdateAnnouncement,
} from "../Services/announcementService";

export default function EditAnnouncement() {
  const { id } = useParams();

  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    doneBy: "",
    status: "",
    message: "",
    sendTo: "",
  });

  // Fetch the announcement by ID
  const {
    data: announcementData,
    loading: fetchLoading,
    error: fetchError,
  } = useGetAnnouncementById(id);

  // Update announcement hook
  const {
    updateAnnouncement,
    loading: updateLoading,
    error: updateError,
    response: updateResponse,
  } = useUpdateAnnouncement();

  // Populate form when data is loaded
  useEffect(() => {
    console.log("Announcement data:", announcementData); // Debug log
    if (announcementData?.data) {
      setFormData({
        title: announcementData.data.title || "",
        doneBy: announcementData.data.doneBy || "",
        status: announcementData.data.status || "",
        message: announcementData.data.message || "",
        sendTo: announcementData.data.sendTo || "",
      });
    }
  }, [announcementData]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAnnouncement(id, formData);
    navigate("/admin/announcements");
    // Optionally, redirect or show a message after update
  };

  if (fetchLoading) return <div>Loading announcement...</div>;
  if (fetchError)
    return <div className="text-red-500">Error: {fetchError}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Announcement</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center p-4">
          <div className="mb-6 w-full md:w-[30%]">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6 w-full md:w-[30%]">
            <label
              htmlFor="doneBy"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Done By
            </label>
            <input
              type="text"
              id="doneBy"
              value={formData.doneBy}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6 w-full md:w-[30%]">
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Status
            </label>
            <input
              type="text"
              id="status"
              value={formData.status}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-6 w-full md:w-[30%]">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Message
            </label>
            <input
              type="text"
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="flex w-full justify-start items-start gap-10 md:w-[30%]">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Send to
            </label>
          </div>
          <div className="flex justify-center items-center gap-10">
            <div className="flex items-center mb-4">
              <input
                id="sendTo"
                type="radio"
                value="student"
                checked={formData.sendTo === "student"}
                onChange={handleInputChange}
                name="sendTo"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Student
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                id="sendTo"
                type="radio"
                value="instructor"
                checked={formData.sendTo === "instructor"}
                onChange={handleInputChange}
                name="sendTo"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
              />
              <label className="ms-2 text-sm font-medium text-gray-900">
                Instructor
              </label>
            </div>
          </div>
          <div className="flex justify-between w-full md:w-[30%] mt-8">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              disabled
            >
              Attachments
            </button>
            <button
              type="submit"
              disabled={updateLoading}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              {updateLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
        {updateError && (
          <div className="text-red-500 mt-2">
            {updateError.message || "Error updating announcement"}
          </div>
        )}
        {updateResponse && (
          <div className="text-green-500 mt-2 text-center font-bold text-lg">
            Updated successfully!
          </div>
        )}
      </form>
    </div>
  );
}
