import React, { useEffect, useState } from "react";
import {
  useGetNotificationById,
  useUpdateNotification,
} from "../Services/notificationService";
import { useNavigate, useParams } from "react-router-dom";

export default function EditNotification() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    recipient: "",
    message: "",
  });

  const {
    data: notificationData,
    error: fetchError,
    loading: fetchLoading,
  } = useGetNotificationById(id);

  const {
    updateNotification,
    error: updateError,
    loading: updateLoading,
    response: updateResponse,
  } = useUpdateNotification();

  useEffect(() => {
    if (notificationData && notificationData.data) {
      setFormData({
        title: notificationData.data.title || "",
        recipient: notificationData.data.recipient || "",
        message: notificationData.data.message || "",
      });
    }
  }, [notificationData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateNotification(id, formData);
    navigate("/send-notification");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Notification</h1>
      <form action="">
        <div className="flex flex-col p-4">
          <div class="mb-6 w-full md:w-[30%]">
            <label
              for="title"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div class="mb-6 w-full md:w-[30%]">
            <label
              for="recipient"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Recipient
            </label>
            <input
              type="text"
              id="recipient"
              value={formData.recipient}
              onChange={handleInputChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>

          <div class="mb-6 w-full md:w-[30%]">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              Message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleInputChange}
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="flex">
            <button
              type="button"
              onClick={handleSubmit}
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 "
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
