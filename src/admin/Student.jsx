import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import NavA from "./NavA";

const Student = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editStudentId, setEditStudentId] = useState(null);
  const { sectionID } = useParams();
  const [studentData, setStudentData] = useState([]);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editSectionID, setEditSectionID] = useState("");

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isEditModalVisible) {
        closeEditModal();
      }
    });

    return () => {
      document.removeEventListener("keydown", closeEditModal);
    };
  }, [isEditModalVisible]);

  const openEditModal = (id) => {
    setEditStudentId(id);
    setIsEditModalVisible(true);
    const studentToEdit = studentData.find((student) => student.id === id);
    if (studentToEdit) {
      setEditFirstName(studentToEdit.firstName);
      setEditLastName(studentToEdit.lastName);
      setEditSectionID(studentToEdit.sectionID);
    }
  };

  const deleteStudent = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmed) {
      try {
        const response = await Axios.delete(
          `http://localhost:3001/api/studentData/${id}`
        );

        if (response.status === 204) {
          alert("Student Deleted Successfully.");
        } else {
          alert("Success Deleting Student.");
        }
      } catch (error) {
        console.log(error);
        alert("An error occurred while deleting the student.");
      } finally {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    }
  };

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3001/api/studentList?sectionID=${sectionID}`
        );
        setStudentData(response.data);
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching student data");
      }
    };

    fetchStudentData();
  }, [sectionID]);

  const updateStudent = async () => {
    try {
      const response = await Axios.put(
        `http://localhost:3001/api/studentData/${editStudentId}`,
        {
          firstName: editFirstName,
          lastName: editLastName,
          sectionID: editSectionID,
        }
      );

      if (response.status === 200) {
        alert("Student Updated Successfully.");
      } else {
        alert("Success Updating Student.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the student.");
    } finally {
      setIsEditModalVisible(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div>
      <NavA />
      <div className='addlist-main'>
        <div className='edit-student-to-section'>
          <h3 className='add-new-student-header'>Update Student Data</h3>
          <label className='add-new-student-content' htmlFor='fname'>
            First Name :
          </label>
          <input
            autoComplete='off'
            type='text'
            id='fname'
            name='fname'
            value={editFirstName}
            onChange={(e) => setEditFirstName(e.target.value)}
            style={{ textAlign: "center" }}
          />
          <label className='add-new-student-content' htmlFor='lname'>
            Last Name :
          </label>
          <input
            autoComplete='off'
            type='text'
            id='lname'
            name='lname'
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
            style={{ textAlign: "center" }}
          />
          <label className='add-new-student-content' htmlFor='sectionID'>
            Assign to Section :
          </label>
          <input
            autoComplete='off'
            type='text'
            id='sectionID'
            name='sectionID'
            value={editSectionID}
            onChange={(e) => setEditSectionID(e.target.value)}
            disabled
            style={{ textAlign: "center" }}
          />
          <div className='button-for-new-student-submission'>
            <button className='submit-new-student' onClick={updateStudent}>
              Submit
            </button>
          </div>
        </div>
        <div className='class-starter'></div>
        <div className='addlist-wrapper'>
          <table className='section-list'>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>#</th>
                <th className='section-th' style={{ textAlign: "center" }}>
                  First Name
                </th>
                <th className='section-th' style={{ textAlign: "center" }}>
                  Last Name
                </th>
                <th className='section-th' style={{ textAlign: "center" }}>
                  Section ID
                </th>
                <th className='section-th' style={{ textAlign: "center" }}>
                  Menu
                </th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={student.id}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{student.firstName}</td>
                  <td style={{ textAlign: "center" }}>{student.lastName}</td>
                  <td style={{ textAlign: "center" }}>{sectionID}</td>
                  <td className='td-control'>
                    <button
                      className='btn-edit'
                      onClick={() => openEditModal(student.id)}>
                      Edit
                    </button>
                    <button
                      className='btn-delete'
                      onClick={() => deleteStudent(student.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Student;
