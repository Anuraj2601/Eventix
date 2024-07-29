/* import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import signupMan from "../assets/signupMan.png";
import { useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [role, setRole] = useState("student");
  const [errors, setErrors] = useState({
    firstname:'',
    lastname:'',
    regNo:'',
    email:'',
    password:'',
    confirmpassword:''
  }); */
  /*  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    regNo: "",
    email: "",
    password: "",
    confirmpassword: "",
    role:"student",
  });
  const [errors, setErrors] = useState({}); */

 /*  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBackClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleOkClick = () => {
    handleClosePopup();
    navigate("/");
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@stu\.ucsc\.cmb\.ac\.lk$/;
    const regNoRegex = /^(\d{4}cs\d{3}) || (\d{4}is\d{3})$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; */

    /* if (!formData.firstname) newErrors.firstname = "First Name is required";
    if (!formData.lastname) newErrors.lastname = "Last Name is required";
    if (!formData.regNo) newErrors.regNo = "Registration Number is required";
    else if (!regNoRegex.test(formData.regNo))
      newErrors.regNo = "Invalid Registration Number format";
    if (!formData.email) newErrors.email = "Student Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid Email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (!passwordRegex.test(formData.password))
      newErrors.password =
        "Password must be at least 8 characters long and contain both letters and numbers";
    if (formData.password !== formData.confirmpassword)
      newErrors.confirmpassword = "Passwords do not match";
    if (!formData.confirmpassword)
      newErrors.confirmpassword = "Confirm Password is required"; */

   /*  if (!firstname) newErrors.firstname = "First Name is required";
    if (!lastname) newErrors.lastname = "Last Name is required";
    if (!regNo) newErrors.regNo = "Registration Number is required";
    else if(!regNoRegex.test(regNo)) newErrors.regNo = "Invalid Registration Number format";

    if(!email) newErrors.email = "Student Email is  required";
    else if(!emailRegex.test(email)) newErrors.email = "Invalid Email format";

    if(!password) newErrors.password = "Password is required";
    else if(!passwordRegex.test(password)) newErrors.password = "Password must be at least 8 characters long and contain both letters and numbers";

    if (!confirmpassword)
        newErrors.confirmpassword = "Confirm Password is required"; 

    if(password !== confirmpassword) newErrors.confirmpassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }; */

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validate()) {
      
      
    

    try { */
     /*  const token = localStorage.getItem("token"); */
     /*  console.log("test1");
      
      const userData = await UsersService.register(firstname,lastname,email,password,regNo,role);
      console.log("test2"); */

      /* setFormData({
        firstname: "",
        lastname: "",
        regNo: "",
        email: "",
        password: "",
        confirmpassword: "",
        role: "student",
      }); */
     /*  alert(
        "User registered successfully\nAn OTP sent to your Email verify that within 5 minutes"
      );
      console.log(userData);
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("An error occurred while registering user");
      setErrors({ ...errors, global: error.message });
      setTimeout(() => {
        setErrors({ ...errors, global:''});
      }, 5000)
    }
  }
  }; */

  /* const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  }; */

  /* return (
    <div className="flex h-screen justify-center bg-dark-400  "> */
      {/* Left Side */}
     /*  <div
        className="w-1/3 flex flex-col items-center justify-center relative ml-20"
        style={{
          backgroundColor: "#AEC90A",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        <span
          className="absolute top-4 left-4 cursor-pointer text-black hover:text-dark-400 text-3xl"
          onClick={handleBackClick}
        >
          <IoArrowBackCircleOutline />
        </span> */
        {/* <div className="text-center">
                <h1 className="text-2xl font-bold mt-10 text-dark-400">Create New Account</h1>
                <p className="text-[15px] font-semibold text-dark-400 mt-2"> Signup to Eventix</p>
            </div> */}
       /*  <img src={signupMan} alt="signup" className="w-[700px] mt-32 h-auto" />
      </div> */

      {/* Right Side */}
      {/* <div className = "w-1/2 bg-dark-background flex flex-col justify-center px-10 border-l border-white border-opacity-30">
      <div className = "space-y-2 mx-auto w-[50%] py-10">
      <div className = "flex space-x-4">
      <div className = "w-1/2">
              <label
                htmlFor   = "firstname"
                className = "block text-white text-sm mb-2"
              >
                First Name
              </label> */}
              {/* <input
                type="text"
                id="firstname"
                name="firstname"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="Cusherah"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {errors.firstname */} /* && error.includes('Firstname') *//*  && (
                <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
              )}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastname"
                className="block text-white text-sm mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="Kugananthan"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              {errors.lastname */
               /* && error.includes('Lastname') */ /* && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="regNo" className="block text-white text-sm mb-2">
              Registration Number
            </label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
              placeholder="2021cs100"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />
            {errors.regNo */ /* && error.includes('RegNo') */ /* && (
              <p className="text-red-500 text-sm mt-1">{errors.regNo}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-2">
              Student Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
              placeholder="2021cs100@stu.ucsc.cmb.ac.lk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email *//*  && error.includes('Email') */ /* && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-white text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password  *//* && error.includes('Password') */ /* && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmpassword"
              className="block text-white text-sm mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmpassword"
                name="confirmpassword"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="Confirm your password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmpassword */ /* && error.includes('ConfirmPassword') *//*  && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmpassword}
              </p>
            )}
          </div>

          <div>
            <button
              className="w-full bg-primary text-black py-2 h-[50px] rounded-full font-bold hover:bg-secondary"
              onClick={handleSubmit}
            >
              SIGNUP
            </button>
          </div>
        </div>
      </div> */

      {/* Popup */}
     /*  {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
          <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative">
            <span
              className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400"
              onClick={handleClosePopup}
            >
              &times;
            </span>
            <h2 className="text-[15px] font-semibold text-dark-400 mb-4">
              Leave without SignUp?
            </h2>
            <button
              className="bg-primary text-white px-4 py-2 w-32 text-[14px] rounded font-medium mr-2 hover:bg-dark-400"
              onClick={handleOkClick}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup; */
import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import signupMan from "../assets/signupMan.png";
import { useNavigate } from "react-router-dom";
import UsersService from "../service/UsersService";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [role, setRole] = useState("student");
  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    regNo: '',
    email: '',
    password: '',
    confirmpassword: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const emailRegex = /^[\d{4}(cs|is)\d{3}]+@stu\.ucsc\.cmb\.ac\.lk$/;
  const regNoRegex = /^(\d{4}(cs|is)\d{3})$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  useEffect(() => {
    if (isSubmitted) {
      validateField('firstname', firstname);
    }
  }, [firstname]);

  useEffect(() => {
    if (isSubmitted) {
      validateField('lastname', lastname);
    }
  }, [lastname]);

  useEffect(() => {
    if (isSubmitted) {
      validateField('regNo', regNo);
    }
  }, [regNo]);

  useEffect(() => {
    if (isSubmitted) {
      validateField('email', email);
    }
  }, [email]);

  useEffect(() => {
    if (isSubmitted) {
      validateField('password', password);
    }
  }, [password]);

  useEffect(() => {
    if (isSubmitted) {
      validateField('confirmpassword', confirmpassword);
    }
  }, [confirmpassword]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleBackClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleOkClick = () => {
    handleClosePopup();
    navigate("/");
  };

  const validateField = (field, value) => {
    let error = '';
    switch (field) {
      case 'firstname':
        if (!value) error = "First Name is required";
        break;
      case 'lastname':
        if (!value) error = "Last Name is required";
        break;
      case 'regNo':
        if (!value) error = "Registration Number is required";
        else if (!regNoRegex.test(value)) error = "Invalid Registration Number format";
        break;
      case 'email':
        if (!value) error = "Student Email is required";
        else if (!emailRegex.test(value)) error = "Invalid Email format";
        break;
      case 'password':
        if (!value) error = "Password is required";
        else if (!passwordRegex.test(value)) error = "Password must be at least 8 characters long and contain both letters and numbers";
        break;
      case 'confirmpassword':
        if (!value) error = "Confirm Password is required";
        else if (value !== password) error = "Passwords do not match";
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [field]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    validateField('firstname', firstname);
    validateField('lastname', lastname);
    validateField('regNo', regNo);
    validateField('email', email);
    validateField('password', password);
    validateField('confirmpassword', confirmpassword);

    if (Object.values(errors).every(error => error === '') && Object.values({ firstname, lastname, regNo, email, password, confirmpassword }).every(field => field !== '')) {
      try {
        const userData = await UsersService.register(firstname, lastname, email, password, regNo, role);
        alert("User registered successfully\nAn OTP sent to your Email verify that within 5 minutes");
        navigate("/");
      } catch (error) {
        console.error("Error registering user:", error);
        alert("An error occurred while registering user");
      }
    }
  };

  return (
    <div className="flex h-screen justify-center bg-dark-400">
      {/* Left Side */}
      <div
        className="w-1/3 flex flex-col items-center justify-center relative ml-20"
        style={{
          backgroundColor: "#AEC90A",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
        }}
      >
        <span
          className="absolute top-4 left-4 cursor-pointer text-black hover:text-dark-400 text-3xl"
          onClick={handleBackClick}
        >
          <IoArrowBackCircleOutline />
        </span>
        <img src={signupMan} alt="signup" className="w-[700px] mt-32 h-auto" />
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-dark-background flex flex-col justify-center px-10 border-l border-white border-opacity-30">
        <div className="space-y-2 mx-auto w-[50%] py-10">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="firstname"
                className="block text-white text-sm mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="Cusherah"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              {isSubmitted && errors.firstname && (
                <p className="text-red-500 text-sm mt-1">{errors.firstname}</p>
              )}
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastname"
                className="block text-white text-sm mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="Kugananthan"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              {isSubmitted && errors.lastname && (
                <p className="text-red-500 text-sm mt-1">{errors.lastname}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="regNo" className="block text-white text-sm mb-2">
              Registration Number
            </label>
            <input
              type="text"
              id="regNo"
              name="regNo"
              className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
              placeholder="2021cs100"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />
            {isSubmitted && errors.regNo && (
              <p className="text-red-500 text-sm mt-1">{errors.regNo}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-white text-sm mb-2">
              Student Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
              placeholder="2021cs100@stu.ucsc.cmb.ac.lk"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {isSubmitted && errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-white text-sm mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {isSubmitted && errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmpassword"
              className="block text-white text-sm mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmpassword"
                name="confirmpassword"
                className="w-full px-4 py-2 h-[40px] bg-dark-400 text-white border border-white opacity-50 rounded mb-2"
                placeholder="Confirm your password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-white cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {isSubmitted && errors.confirmpassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmpassword}</p>
            )}
          </div>

          <div>
            <button
              className="w-full bg-primary text-black py-2 h-[50px] rounded-full font-bold hover:bg-secondary"
              onClick={handleSubmit}
            >
              SIGNUP
            </button>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-dark-500 opacity-50"></div>
          <div className="bg-white w-[27vw] h-[20vh] p-8 rounded-lg text-center relative">
            <span
              className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center cursor-pointer text-white text-[22px] font-medium hover:bg-dark-400"
              onClick={handleClosePopup}
            >
              &times;
            </span>
            <h2 className="text-[15px] font-semibold text-dark-400 mb-4">
              Leave without SignUp?
            </h2>
            <button
              className="bg-primary text-white px-4 py-2 w-32 text-[14px] rounded font-medium mr-2 hover:bg-dark-400"
              onClick={handleOkClick}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
