import React, {useState} from "react";
// import loginimg from "../../assets/images/forgot1.avif";
import loginimg from "../../assets/images/letast/forgote.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import toast, { Toaster } from 'react-hot-toast';
import { URL } from "../../Apiurls";

const Forgot = () => {
    const [form, setform] = useState([])
    const navigate = useNavigate();

    const handlechange = (e) => {
        const myUser = { ...form }
        myUser[e.target.name] = (e.target.value)
        setform(myUser)
    }

    const forgotform = () => {
        const mydata = {
            email: form.email,
        }
        axios.post(URL.forgot, mydata).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                toast.success(res.data.message)
                sessionStorage.setItem("emailid", res.data.email)
                navigate("/OTP")
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
        forgotform()
    }


    return (
        <div >
            <body>
                <div className="d-flex justify-content-center ">
                    <div style={{ marginTop: "130px", backgroundColor:"#fbfbfb" }} className="card shadow-lg p-3 bg-white rounded">
                        <div style={{ background: "none" }} className="card-body">
                            <div className="row logheight1" >
                                <div className="col-md-6">
                                    <div className="mt-5">
                                        <img  className="logheight"  src={loginimg}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h1 style={{ color: "#000" }} className="text-center mt-5 pt-2">Create New Password</h1>
                                    <form className="mt-4" onSubmit={(e)=>{formsubmit(e)}}>
                                        <div className="form-group">
                                            <label style={{ color: "#000" }}>Email </label>
                                            <input  required name="email" value={form.email} onChange={(e) => { handlechange(e) }}  type="email" placeholder="Please Enter Your Email id" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </div>
                                        {/* <div className="form-group">
                                            <label style={{ color: "#000" }}>Password</label>
                                            <input type="password" placeholder="Please Enter Your Password" className="form-control" id="exampleInputPassword1" />
                                        </div> */}
                                        <Link to="/login" style={{ color: "#000" }}>Go back to log in page</Link><br />

                                       {/* <Link to="/OTP"> */}
                                       <button type="submit" className="btn btn-dark form-control">Create Password</button>
                                        {/* </Link>  */}
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
export default Forgot;