// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect, useCallback } from "react"; // Import useCallback
// import "../CSS/style.css";
// import Axios from "axios";
// import { jwtDecode } from "jwt-decode";

// const Login = () => {
//   const [username, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [sectionName, setSectionName] = useState(""); // Define sectionName
//   const [userData, setUserData] = useState([]);
//   const navigate = useNavigate();

//   const getUserIDFromToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       return decoded.userId;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       // Handle the error as needed
//       return null; // or some default value
//     }
//   };

//   const getUserData = useCallback(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token in localStorage:", token); // Log the token
//     const userID = getUserIDFromToken(token); // Extract userID from the token
//     Axios.get("http://localhost:3001/api/user-data", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: { sectionName: sectionName, userID: userID }, // Send sectionName and userID as params
//     })
//       .then((response) => {
//         console.log("Data from /api/user-data:", response.data);
//         setUserData(response.data); // Store the user-specific data in state
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [sectionName]);

//   useEffect(() => {
//     getUserData();
//   }, [sectionName, getUserData]);

//   const login = () => {
//     Axios.post("http://localhost:3001/api/login", {
//       username: username,
//       password: password,
//     })
//       .then((response) => {
//         if (response.data.token) {
//           localStorage.setItem("token", response.data.token);
//           console.log("Token stored in localStorage:", response.data.token);
//           alert("Login successful!");
//           navigate("/homeA"); // Redirect to the home page after successful login
//         } else {
//           alert("Login Failed.");
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("An error occurred during login.");
//       });
//   };

//   return (
//     <div className='make-it-drop'>
//       <div className='main-wrapper'>
//         <div className='wrapper'>
//           <form>
//             <h1>Login</h1>
//             <div className='input-box'>
//               <input
//                 type='text'
//                 placeholder='Username'
//                 value={username}
//                 onChange={(e) => setUserName(e.target.value)}
//                 required
//               />
//               <i className='bx bxs-user'></i>
//             </div>
//             <div className='input-box'>
//               <input
//                 type='password'
//                 placeholder='Password'
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <i className='bx bxs-lock-alt'></i>
//             </div>

//             <button type='button' onClick={login} className='btn'>
//               Login
//             </button>

//             <div className='register-link'>
//               <p>
//                 Dont have an account? <Link to='/register'>Register</Link>
//               </p>
//             </div>
//             <div className='register-link'>
//               <p>
//                 <Link to='/'>Back to home</Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
