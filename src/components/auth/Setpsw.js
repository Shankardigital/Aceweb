import React, { useState } from "react";
import loginimg from "../../assets/images/letast/mypass.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { URL } from "../../Apiurls";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const OTP = () => {


    const [form, setform] = useState([])
    const navigate = useNavigate();

    const handlechange = (e) => {
        const myUser = { ...form }
        myUser[e.target.name] = (e.target.value)
        setform(myUser)
        
    }
    const myemail = sessionStorage.getItem("emailid")
    const userotp = sessionStorage.getItem("userotp")

    const resetpsw = () => {
        const mydata = {
            newpassword: form.newpassword,
            confirmpassword: form.confirmpassword,
            email: myemail,
            otp: userotp,
        }
        axios.post(URL.resetpassword, mydata).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                toast.success(res.data.message)
                navigate("/login")
            }
        },
            error => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message)
                }
            }
        )
    }

    const formsubmit = (e) => {
        e.preventDefault();
        resetpsw()
    }

    return (
        <div >
            <body>
                <div className="d-flex justify-content-center ">
                    <div style={{ marginTop: "120px", backgroundColor: "#fbfbfb" }} className="card shadow-lg p-3 bg-white rounded">
                        <div style={{ background: "none" }} className="card-body">
                            <div className="row logheight1" >
                                <div className="col-md-6">
                                    <div className="mt-5">
                                        <img  className="logheight"  src={loginimg} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h1 style={{ color: "#000" }} className="text-center "> Reset Password</h1>
                                    <form className="mt-4" onSubmit={(e) => { formsubmit(e) }}>
                                        {/* <div className="form-group">
                                            <label style={{ color: "#000" }}>Email </label>
                                            <input type="email" placeholder="Please Enter Your Email id" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div> */}
                                        <div className="form-group">
                                            <label style={{ color: "#000" }}> Password</label>
                                            <input required name="newpassword" value={form.newpassword} onChange={(e) => { handlechange(e) }} type="password" placeholder="Please Password" className="form-control" id="exampleInputPassword1" />
                                        </div>
                                        <div className="form-group">
                                            <label style={{ color: "#000" }}>Confirm Password</label>
                                            <input required name="confirmpassword" value={form.confirmpassword} onChange={(e) => { handlechange(e) }} type="password" placeholder="Please Confirm Password" className="form-control" id="exampleInputPassword1" />
                                        </div>
                                        <Link to="/login" style={{ color: "#000" }}>Go back to log in page</Link><br />

                                        {/* <Link to="/login"> */}
                                        <button type="submit" className="btn btn-dark form-control">Reset</button>
                                        {/* </Link>  */}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <Toaster />
                    </div>
                </div>
            </body>
        </div>
    )
}
export default OTP;