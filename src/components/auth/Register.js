import React, { useEffect, useState } from "react";
// import loginimg from "../../assets/images/letast/signup1.avif";
import loginimg from "../../assets/images/letast/undraw_online_stats_0g94.png";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../../Apiurls";
import toast, { Toaster } from 'react-hot-toast'
import axios from "axios";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import success from "../../assets/images/letast/success.gif"


const Register = () => {
    const [form, setform] = useState([])
    console.log(form)
    const [codes, setcodes] = useState([])
    const navigate = useNavigate();

    const handlechange = (e) => {
        const myUser = { ...form }
        myUser[e.target.name] = (e.target.value)
        setform(myUser)
    }

    const signupform = () => {
        const mydata = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            countryCode: form.countryCode,
            phone: form.phone,
            gender: form.gender,
            address: form.address,
            termsAgreed: form.termsAgreed,
        }
        axios.post(URL.signup, mydata).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                // toast.success(res.data.message)
                setOpen(true)
                // navigate("/login")
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
        signupform()
    }

    const getCountrycodes = () => {
        axios.post(URL.getallCountrycodes).then((res) => {
            console.log(res.data)
            setcodes(res.data.countrycodes)
        })
    }

    useEffect(() => {
        getCountrycodes()
    }, [])

    const [open, setOpen] = useState(false);
    const [focusAfterClose, setFocusAfterClose] = useState(true);
    return (
        <div >
            <body>
                <div className="d-flex justify-content-center ">
                    <div style={{ marginTop: "20px", }} className="card shadow-lg p-3 bg-white rounded">
                        <div style={{ background: "none" }} className="card-body">
                            <div style={{width:"800px "}} className="row logheight1" >
                                <div className="col-md-6">
                                    <div className="mt-5 pt-5">
                                        <img className="logheight" src={loginimg} style={{ height: "300px" }} />
                                        <p className="text-dark text-center">Please register your account to access our website</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h1 style={{ color: "#000" }} className="text-center mt-3">Register</h1>
                                    <form className="mt-2" onSubmit={(e) => { formsubmit(e) }}>
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label style={{ color: "#000" }}>First Name </label>
                                                <input required name="firstName" value={form.firstName} onChange={(e) => { handlechange(e) }} type="text" placeholder="Please Enter First Name " className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label style={{ color: "#000" }}>Last Name </label>
                                                <input required name="lastName" value={form.lastName} onChange={(e) => { handlechange(e) }} type="text" placeholder="Please Enter Last Name " className="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label style={{ color: "#000" }}>Email </label>
                                                <input required name="email" value={form.email} onChange={(e) => { handlechange(e) }} type="email" placeholder="Please Enter Your Email id" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label style={{ color: "#000" }}>Mobile No</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <select required value={form.countryCode} onChange={(e) => { handlechange(e) }} style={{ width: "70px" }} name="countryCode" className="form-select">
                                                            <option value="">Choose</option>
                                                            {codes.map((data, key) =>
                                                            (
                                                                <option key={key} value={data.countryCode}>{data.countryCode}</option>
                                                            )
                                                            )}
                                                        </select>
                                                    </div>
                                                    <input required name="phone" value={form.phone} onChange={(e) => { handlechange(e) }} type="number" className="form-control" placeholder="Enter Mobile No" aria-label="Username" aria-describedby="basic-addon1" />
                                                </div>
                                                {/* <input type="password" placeholder="Please Enter Your Password" className="form-control" id="exampleInputPassword1" /> */}
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label style={{ color: "#000" }}>Gender</label>
                                                <div className="row ml-2 ">
                                                    <div className="form-check col">
                                                        <input required onChange={(e) => { handlechange(e) }} name="gender" className="form-check-input" type="radio" id="exampleRadios1" value="male" />
                                                        <label className="form-check-label text-dark" htmlFor="exampleRadios1">
                                                            Male
                                                        </label>
                                                    </div>
                                                    <div className="form-check col">
                                                        <input required onChange={(e) => { handlechange(e) }} name="gender" className="form-check-input" type="radio" id="exampleRadios2" value="female" />
                                                        <label className="form-check-label text-dark" htmlFor="exampleRadios2">
                                                            Female
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12 form-group">
                                                <label style={{ color: "#000" }}>Address </label>
                                                <textarea required name="address" value={form.address} onChange={(e) => { handlechange(e) }} type="email" placeholder="Please Enter Your Address" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                            </div>
                                            <div class="form-group form-check ml-3">
                                                <input name="termsAgreed" onChange={(e) => { handlechange(e) }} value="accepted" required style={{ height: "20px", width: "20px" }} type="checkbox" class="form-check-input " id="exampleCheck1" />
                                                <label class="form-check-label text-dark mt-1 ml-3" for="exampleCheck1">
                                                    By Sining Up. I Agree with <Link style={{ color: "#fb6e0a" }} to="/termscondition">Terms & Condition </Link>
                                                </label>
                                            </div>
                                            <div className="col-md-12">
                                                {/* <Link to="/">  */}
                                                <button type="submit" className="btn btn-dark form-control">Register</button>
                                                {/* </Link><br /> */}

                                            </div>
                                            <span className="text-dark">Do you have an account ?</span><Link to="/login" className="text-primary"> Sign in</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Toaster />
                <Modal returnFocusAfterClose={focusAfterClose} isOpen={open}>
                    <ModalBody >
                        <div className="text-center mt-2 mb-3">
                            <img src={success} />
                            <p className="text-dark">"Thank you for signing up with ACE Batting!" "We have sent an email to the registered email address you provided to verify your account and set your password."</p>
                            <Link to="/login">  <button style={{ width: "80px" }} className="btn btn-success" >OK</button></Link><br />
                            <span style={{ color: "#c1c1c1", fontSize: "14px" }}>If you do not receive the email within a few minutes, please check your spam folder or contact our customer support team for assistance.</span>
                        </div>
                    </ModalBody>

                </Modal>
            </body>
        </div>
    )
}
export default Register;