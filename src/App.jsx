import React, { useState } from "react";
import {
  GraduationCap,
  Menu,
  Mail,
  BookOpen,
  MoreHorizontal,
  Sidebar
} from "lucide-react";

import {
  statsData,
  initialStudents,
  facultyData,
  coursesData
} from "./data/mockData";

import "./index.css";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
      name: "",
      department: "",
      year: ""
  });

  const addStudent = (e) => {
    e.preventDefault();

    setStudents([
      {
        id: students.length + 1,
        ...newStudent
      },
      ...students
    ]);

     setNewStudent({ name: "", department: "", year: "" });
     setShowModal(false);
  }


  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-slate-900 text-white z-40
        transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform lg:translate-x-0`}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-xl font-bold">EduMaster</h1>
        </div>

        <nav className="mt-6 space-y-2 px-3">
          <button
            onClick={() => {
              setActiveSection("dashboard");
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className="w-full flex gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <GraduationCap size={18} /> Dashboard
          </button>

          <button
            onClick={() => {
              setActiveSection("students");
              if(window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className="w-full flex gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <Mail size={18} /> Students
          </button>

          <button
            onClick={() => {
              setActiveSection("faculty");
              if(window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className="w-full flex gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <GraduationCap size={18} /> Faculty
          </button>

          <button
            onClick={() => {
              setActiveSection("courses");
              if (window.innerWidth < 1024) setSidebarOpen(false);
            }}
            className="w-full flex gap-3 p-3 rounded-lg hover:bg-slate-700"
          >
            <BookOpen size={18} /> Courses
          </button>
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center px-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2"
          >
            <Menu />
          </button>
          <h2 className="ml-4 font-semibold capitalize">
            {activeSection}
          </h2>
        </header>

        <main className="flex-1 overflow-y-auto p-8">

          {/* DASHBOARD */}
          {activeSection === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsData.map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow">
                  <p className="text-sm text-slate-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                </div>
              ))}
            </div>
          )}

          {/* STUDENTS */}
          {activeSection === "students" && (
            <div className="bg-white rounded-xl shadow">
              <div className="p-6 border-b flex justify-between">
                <input
                  placeholder="Search students..."
                  className="border px-3 py-2 rounded-lg w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                > 
                Add Student
                </button>
              </div>

              <table className="w-full">
                <tbody>
                  {students
                    .filter(s =>
                      s.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map(s => (
                      <tr key={s.id} className="border-b">
                        <td className="p-4">{s.name}</td>
                        <td className="p-4">{s.department}</td>
                        <td className="p-4">{s.year}</td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
                onClick={() => setShowModal(false)}
  >
    <div className="bg-white p-6 rounded-xl w-96" onClick={(e) => e.stopPropagation()}>
      <h3 className="font-bold text-lg mb-4">Add Student</h3>

      <form onSubmit={addStudent} className="space-y-4">
        <input
          required
          placeholder="Name"
          className="border px-3 py-2 w-full rounded-lg"
          value={newStudent.name}
          onChange={(e) =>
            setNewStudent({ ...newStudent, name: e.target.value })
          }
        />

        <input
          required
          placeholder="Department"
          className="border px-3 py-2 w-full rounded-lg"
          value={newStudent.department}
          onChange={(e) =>
            setNewStudent({ ...newStudent, department: e.target.value })
          }
        />

        <input
          required
          placeholder="Year"
          className="border px-3 py-2 w-full rounded-lg"
          value={newStudent.year}
          onChange={(e) =>
            setNewStudent({ ...newStudent, year: e.target.value })
          }
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
)}

            </div>
          )}

          {/* FACULTY */}
          {activeSection === "faculty" && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {facultyData.map(f => (
                <div key={f.id} className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-bold">{f.name}</h3>
                  <p className="text-sm text-slate-500">{f.department}</p>
                </div>
              ))}
            </div>
          )}

          {/* COURSES — THIS IS WHERE IT WAS BREAKING */}
          {activeSection === "courses" && (
            <div className="space-y-4">
              {coursesData.map(course => (
                <div
                  key={course.id}
                  className="bg-white p-6 rounded-xl shadow flex justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg">{course.name}</h3>
                    <p className="text-sm text-slate-500">
                      {course.code} — {course.instructor}
                    </p>
                  </div>
                  <MoreHorizontal />
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default App;
