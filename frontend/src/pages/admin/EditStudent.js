import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    address: "",
    gender: "",
    mobile: "",
    course: "",
  });
  const [image, setImage] = useState(null);
  const [courses, setCourses] = useState([]);

  // Fetch student details
  useEffect(() => {
    axios.get(`http://localhost:5000/api/students/${id}`)
      .then((res) => {
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          age: res.data.age || "",
          address: res.data.address || "",
          gender: res.data.gender || "",
          mobile: res.data.mobile || "",
          course: res.data.course?._id || "",
        });
      })
      .catch((err) => console.error("Failed to fetch student:", err));

    // Fetch all courses for dropdown
    axios.get("http://localhost:5000/api/adminCourseStats/stats")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (image) data.append("image", image);

    try {
      await axios.put(`http://localhost:5000/api/students/edit/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/admin/view-student");
    } catch (err) {
      console.error("Failed to update student:", err);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Student</h1>
      
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Full Name"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Email"
          required
        />

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Age"
          required
        />

        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Mobile Number"
          required
        />

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Address"
        ></textarea>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <select
          name="course"
          value={formData.course}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={handleImageChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded items-center"
        >
          Update Student
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
