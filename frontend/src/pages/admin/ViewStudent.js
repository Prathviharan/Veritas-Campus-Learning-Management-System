import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { FiDownload, FiPlus } from 'react-icons/fi';
import html2pdf from 'html2pdf.js';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewStudent() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const navigate = useNavigate();

  // Fetch students from backend
 useEffect(() => {
    axios.get("http://localhost:5000/api/students/all")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  }, []);


  // Delete student handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(prev => prev.filter(student => student._id !== id));
    } catch (err) {
      alert("Failed to delete student.");
      console.error(err);
    }
  };

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === '' || student.gender === genderFilter;
    return matchesName && matchesGender;
  });

  // Generate PDF report
  const downloadPageAsPDF = () => {
    const element = document.getElementById("download-section");
    html2pdf().from(element).save("All_Students.pdf");
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Students</h1>
        <div className="flex gap-3">
          <button
            className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
            onClick={downloadPageAsPDF}
          >
            <FiDownload /> Generate Report
          </button>
          <button
            className="bg-lime-500 hover:bg-lime-600 text-white font-semibold py-2 px-4 rounded flex items-center gap-2"
            onClick={() => navigate(`/admin/add-student`)}
          >
            <FiPlus /> Add Student
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="flex-1 border border-gray-300 rounded px-4 py-2 mt-3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="w-auto max-w-xs border border-black rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div id="download-section">
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-4 py-2">IMAGE</th>
                <th className="text-left px-4 py-2">NAME</th>
                <th className="text-left px-4 py-2">AGE</th>
                <th className="text-left px-4 py-2">PHONE NUMBER</th>
                <th className="text-left px-4 py-2">ADDRESS</th>
                <th className="text-left px-4 py-2">DEGREE</th>
                <th className="text-left px-4 py-2">GENDER</th>
                <th className="text-left px-4 py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? filteredStudents.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={student.image ? `http://localhost:5000/uploads/${student.image}` : 'https://via.placeholder.com/40'}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">{student.age}</td>
                  <td className="px-4 py-2">{student.mobile}</td>
                  <td className="px-4 py-2">{student.address}</td>
                  <td className="px-4 py-2">{student.course?.title || 'N/A'}</td>
                  <td className="px-4 py-2">{student.gender}</td>
                  <td className="px-4 py-2 ">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/admin/editStudent/${student._id}`)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 pl-3"
                      onClick={() => handleDelete(student._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">No students found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewStudent;
