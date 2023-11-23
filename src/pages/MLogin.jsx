import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

const MLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    Axios.post("http://localhost:3001/login", { username, password })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token); // Store the token in local storage
        alert("Login successful!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        alert("Login failed. Check your username and password.");
      });
  };

  return (
    <div className='login-main-container'>
      <div className='login-wrapper'>
        <div className='h3-login-wrapper'>
          <h3 className='h3-control-header'>L O G I N</h3>
        </div>
        <div className='textbox-wrapper'>
          <div className='textbox'>
            <h3 className='h3-control'>Username :</h3>
            <div className='textbox-control'>
              <input
                className='input-field'
                type='text'
                placeholder='user@mail.com'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className='textbox-wrapper'>
          <div className='textbox'>
            <h3 className='h3-control'>Password :</h3>
            <div className='textbox-control'>
              <input
                className='input-field'
                type={showPassword ? "text" : "password"}
                placeholder='* * * * * * *'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className='textbox-icon'
                onClick={() => {
                  setShowPassword(!showPassword);
                }}>
                <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAABCRJREFUSEut123on1MYB/DPtSH2YGaTFckUpeTFWLPZTCll06YYE+aViBimRFFTK0mzpIR4IQ/NRlnZ/vMQb5g3Xnl+mBZjY8iYLcaOzn2f/+9/37+H/VLOm9/vPve5z3Vd3+t7fc91Qh6BVP3rjD5T7QVdn/WsHzIR1fv/wXCP00M8bxkuThwr+e2w0Te9HWagAWb3Z00bp+B93IH1PdiOTvQxPDw1IaRORvP60RyPDz5JnIFDWI4NfSkw3EpxsSxs/3RMNhddg2cxDn8LSyWbB0be/WIIV5qv64ib1A7LJC9iPA5iCUaESZKrMA8ziXGkA/gJP+MLPI+93QZGC2ag4UYOlmIjjsCfJd9X4ui2jz0VkR3dGKxJfNyp08KJATnuSUSO9NUBMP+KrwthMyFP6FqXg3wad+L3QTrRhrp+mhpsTpzXteEzWI1v2vMxhbRQWCLFCtKR5f27uFjY36JzqrHoHhOJd0jnlheZXBcKEyT7cBcuwgUF+k/xALaU9TOQHbykPI9gcamUFqO6DefcXl4mn8SNmI+tmDAA+l3B2akiWqfIn8ANJYGPZNgHkKvachUebmz+QzH6VYkwG68JNjrq3R7DrV1O5ap4GwvK/KJgS5PhozmeGtLOVEUV+0iTyoudWFjIND8YSWFil8Bvxz3CTMlDDQdmBB8mphM7SKdX+pA1qxH+LVSe55FL50xhdTHwbYl4R4VAGJFM7A3cXuK4rqPuarxQ1l5fBKoYrq2vxLpC/axgefG9xJqyUTaaYcsIZBHZGkzqOk1/xImVkbGIbsLjxfDN9f9oRTy1qM90fIZZyMp0Nx4sG20PFqSwS4q5pNcxmpK89ysNYmbrM0hZ0SYTv5BOLnu2DOcPVwrrSs29jCuKpx3SBV+mupR2Yy7eoAP7KmJtQSg79CbmtKOtn7rr+ChsI2ZVH4dHcwoKavmoXFuK5XOpgn2PMEfyVmU8HJQswnu1QzGvOLEN5zf7nJbhsulJkg86uapl87aiVrcj12QeWTgy2/eUqHLkk7FfpdNml8h2pTBb8l03GUfLqdkrnFryl+mfYfkr8RSeCxalcF9Jx0eVqjEluD+RWduU5lz/lwoZoTGMB0jmqGPTMrRY0adsxqbCbkmWyXbTWOdnabBpUE/X74Mx4UsVObI4LJaqY7Izes79cECqupZcu/mgyGJxmfDaYSPus1FTC47HtcFpKUyXYlpIx6RwSKqOyHwSvYQ/qnSwqTQT/1A1ELlKWk43n/v22O0Fh3lqNoE50rqZGK92bnmwoa3V/6FF7Q90s4NsbbYsWF+4lEXpLGQE+p7HPSENSUH/q8gYia9LqoPjnOD7OuLsaAP1Zk80hERFX3puPoMAqS4Jvefx8JD61XrrwjWW3nbjPgi+3itMT6i9N4DednVQQz2YPP8CoCloMPidYYsAAAAASUVORK5CYII=' />
              </span>
            </div>
          </div>
        </div>
        <div className='login-btn-wrapper'>
          <button className='login-btn' onClick={login}>
            L O G I N
          </button>
        </div>
        <div className='login-links'>
          <div className='login-or'>
            <p>Dont have an Account?</p>
            <Link className='login-link' to='/register'>
              Create Account
            </Link>
          </div>
        </div>
        <div>
          <div className='login-or'>
            <Link className='login-link' to='/'>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLogin;
