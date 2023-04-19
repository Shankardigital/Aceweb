import React, { useState } from "react";
// import loginimg from "../../assets/images/loginimg.gif";
import loginimg from "../../assets/images/letast/login.png";
import { Link } from "react-router-dom";
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { URL } from "../../Apiurls";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setform] = useState({email:"", password:""})
    const navigate = useNavigate();

    const handlechange = (e) => {
        const myUser = { ...form }
        myUser[e.target.name] = (e.target.value)
        setform(myUser)
    }

    const loginform = () => {
        const mydata = {
            email: form.email,
            password: form.password,
        }
        axios.post(URL.login, mydata).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                toast.success(res.data.message)
                sessionStorage.setItem("accessToken", res.data.token)
                const jsonString = JSON.stringify(res.data.customer);
                sessionStorage.setItem("customer", jsonString)
                navigate("/")
            }
        },
        error => {
            if (error.response && error.response.status === 404) {
                toast.error(error.response.data.message)
            } else if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message)
            }
        }
        )
    }

    const formsubmit = (e) => {
        e.preventDefault();
        loginform()
    }

    return (
        <div >
            <body>
                <div className="d-flex justify-content-center ">
                    <div style={{ marginTop: "130px", }} className="card shadow-lg p-3 bg-white rounded">
                        <div style={{ background: "none" }} className="card-body">
                            <div className="row logheight1" >
                                <div className="col-md-6 ">
                                    <div className="mt-5">
                                        <img className="logheight" src={loginimg} />
                                        <p style={{ fontSize: "18px" }} className="text-dark text-center ">To access our website, kindly sign in with your account.</p>

                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h1 style={{ color: "#000" }} className="text-center mt-3">Log In</h1>
                                    <form className="mt-4" onSubmit={(e) => { formsubmit(e) }}>
                                        <div className="form-group">
                                            <label style={{ color: "#000" }}>Email </label>
                                            <input required name="email" value={form.email} onChange={(e) => { handlechange(e) }} type="email" placeholder="Please Enter Your Email id" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        <div className="form-group">
                                            <label style={{ color: "#000" }}>Password</label>
                                            <input required name="password" value={form.password}  onChange={(e) => { handlechange(e) }} type="password" placeholder="Please Enter Your Password" className="form-control" id="exampleInputPassword1" />
                                        </div>
                                        <Link to="/forgot_password" style={{ color: "#000" }}>Forgot Password</Link><br />

                                        {/* <Link to="/"> */}
                                        <button type="submit" className="btn btn-dark form-control">Log in</button>
                                        {/* </Link> */}
                                        <span className="text-dark">Don't have an account ?</span><Link to="/register" className="text-primary"> Signup now</Link>
                                    </form>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Toaster/>
            </body>
        </div>
    )
}
export default Login;