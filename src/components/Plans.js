import React, { useState, useEffect } from "react";

import img4 from "../assets/images/football/products/footb-product1.jpg"
import img5 from "../assets/images/football/products/footb-product2.jpg"
import img6 from "../assets/images/football/products/footb-product3.jpg"
import img7 from "../assets/images/football/products/footb-product4.png"
import Footer from "./Footer";
import Headers from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import axios from "axios"
import { URL } from "../Apiurls";


const Plans = () => {

    const navigate = useNavigate();
    const accessToken = sessionStorage.getItem("accessToken")
    const [plans, setplans] = useState([])
    console.log(plans)

    const hiddenIds = ["Classes", "Clinics", "Membership"];
    const filteredData = plans.filter((item) => !hiddenIds.includes(item.type));
    // const reversedData = [...data].reverse(); this is use for revers data shwo in array

    const getPlans = () => {
        axios.post(URL.getallplans, {},).then((res) => {
            setplans(res.data.planResult)
            // console.log(res.data.planResult[0].whatsIncluded)
        })
    }

    // const getPlans123 = () => {
    //     axios.post(URL.getallplans, {},).then((res) => {
    //         setplans(res.data.planResult)
    //         // console.log(res.data.planResult[0].whatsIncluded)
    //     })
    // }
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

    useEffect(() => {
        getPlans()
    }, [])

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const redirctpage = (data) => {
        sessionStorage.setItem("planid", data._id)
        if (data.type == "PayasYouGo") {
            scrollToTop()
            navigate("/planbooking")
        } else if (data.type == "RentalEquipment" || data.type == "RentalLine") {
            scrollToTop()
            navigate("/lanes")
        } else if (data.type == "Team_subcription") {
            if (accessToken == null) {
                scrollToTop()
                navigate("/log_in")
            } else {
                scrollToTop()
                navigate("/team")
            }

        } 

    }


    return (
        <div >
            <section style={{ background: "#000" }} id="shop" className="products-area pt-100">
                <div style={{padding:"40px"}} className="container">
                    <div className="section-title">
                        <h2 style={{ color: "#c45100" }}>Choose your Plans</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                            maecenas accumsan lacus vel facilisis.</p>
                    </div>

                    {/* <div className="row">
                                <div className="col-lg-3 col-sm-6">
                                    <div className="single-products-box">
                                        <img style={{ height: "370px" }} src={img4} alt="image" />
                                        <div className="content">
                                            <h3>Line Rental</h3>
                                            <p>Prefect to give your Team / Family practice</p>
                                            <p>1 hour manual practice on pre reserved Lane. 4 members/ lane</p>
                                            <div className="row">
                                                <div className="col-8">
                                                    <Link className="shop-now-btn" to="/lanes">Select</Link>

                                                </div>
                                                <div className="col-4">
                                                    <h5 style={{ border: "none" }} className="mt-2" href="#">$ 20</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="single-products-box">
                                        <img style={{ height: "370px" }} src={img5} alt="image" />
                                        <div className="content">
                                            <h3>Team subscription</h3>
                                            <p>Enroll your team of 11 players</p>
                                            <p>Valid for 6 months</p>
                                            <p>Unlimited access to baling machines</p>
                                            <div className="row">
                                                <div className="col-8">
                                                <Link className="shop-now-btn" to="/team">Select</Link>

                                                </div>
                                                <div className="col-4">
                                                    <h5 style={{ border: "none" }} className="mt-2" href="#">$ 1,100</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="single-products-box">
                                        <img style={{ height: "370px" }} src={img6} alt="image" />
                                        <div className="content">
                                            <h3>Line Rental - Machine</h3>
                                            <p>1 hour practice with balling machine</p>
                                             <div className="row">
                                                <div className="col-8">
                                                <Link className="shop-now-btn" to="/lanes">Select</Link>

                                                </div>
                                                <div className="col-4">
                                                    <h5 style={{ border: "none" }} className="mt-2" href="#">$ 40</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="single-products-box">
                                        <img style={{ height: "370px" }} src={img7} alt="image" />
                                        <div className="content">
                                            <h3>Leather ball rental</h3>
                                            <p>10 pro grade leather circket  balls</p>
                                            <div className="row">
                                                <div className="col-8">
                                                <Link className="shop-now-btn" to="/booking">Select</Link>

                                                </div>
                                                <div className="col-4">
                                                    <h5 style={{ border: "none" }} className="mt-2" href="#">$ 5</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                    <Slider  {...settings}>
                        {filteredData.map((data, key) => (
                            <div key={key} className="p-3">
                                <div className="single-products-box">
                                    <img style={{ height: "370px" }} src={`http://103.186.185.77:5027/${data.image}`} alt="image" />
                                    <div className="content">
                                        <h3>{data.name}</h3>
                                        <div>{data.whatsIncluded.map((data, key) => (
                                            <p key={key}>{data.value}</p>
                                        ))}</div>
                                        {/* <p>1 hour manual practice on pre reserved Lane. 4 members/ lane</p> */}
                                        <div className="row">
                                            <div className="col-8">
                                                <a type="button" className="shop-now-btn" onClick={() => { redirctpage(data) }}>Select</a>
                                            </div>
                                            <div className="col-4">
                                                <h5 style={{ border: "none" }} className="mt-2" href="#">$ {data.price}</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>

                </div>
            </section>
        </div>
    )
}
export default Plans;