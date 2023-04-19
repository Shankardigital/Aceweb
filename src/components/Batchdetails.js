import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../Apiurls";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import baseballbanner from "../assets/images/letast/baseballbanner.jpg"

const Booking = () => {
    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem("accessToken")

    const jsonString = sessionStorage.getItem('bookingdata');
    const bookingdata = JSON.parse(jsonString);

    const jsonString1 = sessionStorage.getItem('batchdata');
    const batchdata = JSON.parse(jsonString1);
    const [plans, setplans] = useState([])
   
    const [plsnwt, setplsnwt] = useState([])
    const [batch, setbatch] = useState([])
    console.log(batch)
    const [getcoupon, setgetcoupon] = useState([])
    // const [totalval, settotalval] = useState([])
    console.log(getcoupon)
    const batchid = sessionStorage.getItem("batchid")
    const planid = sessionStorage.getItem("planid")


    const getbatchs = () => {
        const params = {
            id: batchid
        }
        axios.post(URL.getbatchbyid, params,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            setbatch(res.data.batchResult)
            // console.log(res.date.batchResult)
        })
    }

    const getplans = () => {
        const params = {
            id: planid
        }
        axios.post(URL.planbyid, params,
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            setplans(res.data.planResult)
            setplsnwt(res.data.planResult.whatsIncluded)
            console.log(res.data.planResult.whatsIncluded)
        })
    }

    // const classbooking = () => {
    //     const params = {
    //         planId: planid,
    //         batchId: batchid,
    //     }
    //     axios.post(URL.bookclass, params,
    //         {
    //             headers: { Authorization: `Bearer ${accessToken}` }
    //         }
    //     ).then((res) => {
    //         // setcriclass(res.data.planResult)
    //         // console.log(res.date)
    //         if (res.status === 200) {
    //             toast.success(res.data.message)
    //             navigate("/planbooking")
    //             // const jsonString = JSON.stringify(res.data.data);
    //             sessionStorage.setItem("planid", res.data.classData.planId)
    //         }
    //     },
    //         error => {
    //             if (error.response && error.response.status === 400) {
    //                 toast.error(error.response.data.message)
    //             }
    //         });

    // }
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };
      
    const formsubmit = () => {
        if (accessToken == null) {
            scrollToTop()
            navigate("/log_in")
        } else {
            scrollToTop()
            navigate("/planbooking")
        }

    }

    useEffect(() => {
        if (accessToken == null) {
            navigate("/log_in")
        } else {
            getbatchs()
            getplans()
        }

    }, [])

    return (
        <div  >
            <Header />
            <div style={{ marginTop: "170px" }} className="container mb-5">
                <div>
                    <h2 style={{ color: "#ff6f0b" }}>Batch Details</h2>
                </div>

                <form  >
                    <div className="row mt-5">

                        <div className="col col-lg-12">
                            <div className="card ">
                                <div className="card-body">
                                    <img style={{ width: "100%", height: "200px", borderRadius: "20px" }} src={baseballbanner} />
                                    {/* <h2 className="text-dark">Payment</h2> */}
                                    <div className="row mt-5 text-dark">
                                        <div className="col-lg-8">
                                            <div className="card">
                                                <div className="card-body">
                                                    <h2>{batchdata.batch} </h2>

                                                    {/* <h5>About Us</h5>
                                                    <span style={{ fontSize: "20px" }}>
                                                        A baseball game consists of nine innings per team (each team having nine "half-innings" to bat in, and nine half-innings to field in), while a cricket match may have either one or two innings per team. The team with the most runs wins after the team with fewer runs has completed all of their turns to bat.
                                                    </span><br /> */}
                                                    <h5 className="mt-3">Batch Details</h5>

                                                    <div className="row">
                                                        <div className="col-lg-4">
                                                            <span style={{ fontSize: "20px" }}>Plane Name</span><br />
                                                            <span style={{ fontSize: "20px" }}>Batch days</span><br />
                                                            <span style={{ fontSize: "20px" }}>Game Name</span><br />
                                                        </div>
                                                        <div className="col-lg-8">
                                                            <span style={{ fontSize: "20px" }}>: {batchdata.level}</span><br />
                                                            <span style={{ fontSize: "20px" }}>: {batchdata.days}</span><br />
                                                            <span style={{ fontSize: "20px" }}>: {batchdata.gameType}</span><br />
                                                        </div>
                                                    </div>

                                                    <h5 className="mt-3">Instructed Details</h5>
                                                    <div className="row">
                                                        <div className="col-lg-4">

                                                            <span style={{ fontSize: "20px" }}>Instructed Name</span><br />
                                                            <span style={{ fontSize: "20px" }}>Experience</span><br />
                                                            <span style={{ fontSize: "20px" }}>Description</span><br />
                                                        </div>
                                                        <div className="col-lg-8">
                                                            <span style={{ fontSize: "20px" }}>: {batchdata.instructorName}</span><br />
                                                            <span style={{ fontSize: "20px" }}>: {batchdata.experience}</span><br />
                                                            <span style={{ fontSize: "20px" }}>
                                                            {batchdata.description} </span><br />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="col-lg-4">
                                            <div className="card">
                                                <div className="card-body">
                                                    <span style={{ fontSize: "20px" }}>Price</span>
                                                    <div className="text-center pricest"><sup style={{ fontSize: "30px" }}>$ </sup><span style={{ fontSize: "100px" }}>{plans.price}</span> </div>
                                                    <div className="mb-5  mt-1">
                                                        {plsnwt.map((data, key) => (
                                                            <div key={key}>
                                                                <span >{data.value}</span><br />
                                                            </ div>
                                                        ))}
                                                        <div className="mt-4 p-4">
                                                            <button onClick={formsubmit} type="button"  className="btn btn-dark form-control">Join Now</button>
                                                        </div>
                                                        {/* <span >practice with your batch's</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <Toaster />
            <Footer />

        </div>
    )
}
export default Booking