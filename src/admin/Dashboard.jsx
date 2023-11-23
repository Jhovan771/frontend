import { useState, useEffect } from "react";
import NavA from "./NavA";
import setting from "../assets/settig.png";
import Axios from "axios";
import Setting from "../assets/setting.png";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  const [sname, setSname] = useState("");
  const [originalSName, setOriginalSName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sectionID, setSectionID] = useState("");
  const [userId, setUserId] = useState("");

  // For Modal Start //
  useEffect(() => {
    const closeModal = () => {
      setIsModalVisible(false);
    };

    const closeEditModal = () => {
      setIsEditModalVisible(false);
    };

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && (isModalVisible || isEditModalVisible)) {
        closeModal();
        closeEditModal();
      }
    });

    return () => {
      document.removeEventListener("keydown", closeModal);
      document.removeEventListener("keydown", closeEditModal);
    };
  }, [isModalVisible, isEditModalVisible]);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const openEditModal = (originalName) => {
    setOriginalSName(originalName);
    setIsEditModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
  };
  // For Modal End //

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      Axios.get("http://localhost:3001/api/getUserId", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setUserId(response.data.userId);
        })
        .catch((error) => {
          console.error("Error fetching user ID:", error);
        });
    }
  }, []);

  const deleteSection = async (sectionName) => {
    try {
      const response = await Axios.delete(
        `http://localhost:3001/api/deleteSection/${sectionName}`
      );

      if (response.status === 204) {
        console.log("Section deleted successfully.");
        alert("Section deleted successfully.");
      } else {
        console.log("Error deleting section:", response.statusText);
        alert("Error deleting section.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the section.");
    } finally {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const updateList = async () => {
    try {
      const response = await Axios.put(
        "http://localhost:3001/api/updateSName",
        {
          newSName: sname,
          sname: originalSName,
        }
      );

      if (response.status === 200) {
        console.log("Name updated successfully.");
        alert("Name updated successfully.");
      } else {
        console.log("Error updating name:", response.statusText);
        alert("Error updating name.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the list");
    } finally {
      closeEditModal();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const addlist = async () => {
    try {
      const response = await Axios.post("http://localhost:3001/api/insection", {
        sname: sname,
        userID: userId, // Include the userId directly in the payload
      });

      console.log(response.data);

      if (response.data.trim() === "data inserted successfully") {
        alert("Successfully added to the list!");
      } else {
        alert("Successfully added to the list!");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      closeModal();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await Axios.get(
          "http://localhost:3001/api/sectionList",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSectionData(response.data);
      } catch (error) {
        console.error(error);
        alert("An error occurred while fetching section data");
      }
    };

    fetchSectionData();
  }, []);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSectionIDChange = (e) => {
    setSectionID(e.target.value);
  };

  const handleAddStudent = async () => {
    console.log("sectionID:", sectionID);

    try {
      const response = await Axios.post("http://localhost:3001/api/students", {
        firstName: firstName,
        lastName: lastName,
        sectionID: sectionID,
      });

      if (response.status === 200) {
        alert("Student added successfully!");
        setFirstName("");
        setLastName("");
        setSectionID("");
      } else {
        alert("Failed to add student.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while adding the student.");
    }
  };

  return (
    <div>
      <NavA />
      <div className='addlist-main'>
        <div className='add-student-to-section'>
          <h3 className='add-new-student-header'>Add New Student</h3>
          <label className='add-new-student-content' htmlFor='fname'>
            First Name :
          </label>
          <input
            autoComplete='off'
            type='text'
            id='fname'
            name='fname'
            onChange={handleFirstNameChange}
            value={firstName}
            style={{ textAlign: "center" }}
          />
          <label className='add-new-student-content' htmlFor='fname'>
            Last Name :
          </label>
          <input
            autoComplete='off'
            type='text'
            id='fname'
            name='fname'
            onChange={handleLastNameChange}
            value={lastName}
            style={{ textAlign: "center" }}
          />
          <label className='add-new-student-content' htmlFor='fname'>
            Assign to Section :{" "}
            <span style={{ color: "gray" }}>Enter Section #</span>
          </label>
          <input
            autoComplete='off'
            type='text'
            id='sectionID'
            name='sectionID'
            onChange={handleSectionIDChange}
            value={sectionID}
            style={{ textAlign: "center" }}
          />
          <div className='button-for-new-student-submission'>
            <button className='submit-new-student' onClick={handleAddStudent}>
              Submit
            </button>
          </div>
        </div>
        <div className='addlist-wrapper'>
          <table className='section-list'>
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>#</th>
                <th className='section-th' style={{ textAlign: "center" }}>
                  Section Name
                </th>
                <th className='th-control'>
                  <img style={{ width: "35px" }} src={Setting} alt='Setting' />
                </th>
              </tr>
            </thead>
            <tbody>
              {sectionData.map((section, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>{section.sectionID}</td>
                  <td style={{ textAlign: "center" }}>{section.sname}</td>
                  <td className='td-control'>
                    <Link to={`/student/${section.sectionID}`}>
                      <button className='btn-view'>View</button>
                    </Link>
                    <button
                      className='btn-edit'
                      onClick={() => openEditModal(section.sname)}>
                      Edit
                    </button>
                    <button
                      className='btn-delete'
                      onClick={() => deleteSection(section.sname)}>
                      Delete
                    </button>
                    <Link
                      className='start-class-btn'
                      to={`/startClass/${section.sectionID}`}>
                      Lessons
                    </Link>
                    <Link
                      style={{ textAlign: "center" }}
                      className='final-class-btn'
                      to={`/finalExam/${section.sectionID}`}>
                      Exam
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Add New Section Modal */}
          <div className='modal-all'>
            <div className='modal-body'>
              <button className='btn2 btn2-open' onClick={openModal}>
                +
              </button>
              {isModalVisible && (
                <section className='modal'>
                  <div className='flex'>
                    <img
                      src={setting}
                      alt='Setting'
                      width='50px'
                      height='50px'
                    />
                    <button className='btn2-close' onClick={closeModal}>
                      X
                    </button>
                  </div>
                  <div>
                    <h3>Add New Section to List</h3>
                    <p>You will need to manually add students later</p>
                  </div>
                  <input
                    value={sname}
                    type='text'
                    id='sectionName'
                    placeholder='eg. Maharlika'
                    onChange={(e) => setSname(e.target.value)}
                  />
                  <input
                    className='user-id'
                    value={userId}
                    type='text'
                    disabled
                  />
                  <button onClick={addlist} className='btn2'>
                    Submit
                  </button>
                </section>
              )}
              {isModalVisible && (
                <div className='overlay' onClick={closeModal}></div>
              )}
            </div>
          </div>
          {/* Add New Section Modal End */}

          {/* Edit Section Modal */}
          {isEditModalVisible && (
            <section className='modal'>
              <div className='flex'>
                <img src={setting} alt='Setting' width='50px' height='50px' />
                <button className='btn2-close' onClick={closeEditModal}>
                  X
                </button>
              </div>
              <div>
                <h3>Update List</h3>
                <p>You can update the list details here.</p>
              </div>
              <input
                value={sname}
                type='text'
                id='sectionName'
                placeholder='eg. Maharlika'
                onChange={(e) => setSname(e.target.value)}
              />
              <button onClick={updateList} className='btn2'>
                Update
              </button>
            </section>
          )}
          {/* Edit Section Modal End */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
