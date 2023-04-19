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
    const [showMore, setShowMore] = useState(false);

    const [show, setShow] = useState([]);
    const accessToken = sessionStorage.getItem("accessToken")
    const [plans, setplans] = useState([])
    console.log(plans)

    const hiddenIds = ["Classes", "Clinics"];
    const filteredData = plans.filter((item) => !hiddenIds.includes(item.type));
    // const reversedData = [...data].reverse(); this is use for revers data shwo in array

    // const getPlans = () => {
    //     axios.post(URL.getallplans, {},).then((res) => {
    //         setplans(res.data.planResult)
    //         // console.log(res.data.planResult[0].whatsIncluded)
    //     })
    // }
    const getPlans = () => {

        const params = {
            type: "Membership",
        }
        axios.post(URL.getplansby, params,
        ).then((res) => {
            console.log(res.data)
            setplans(res.data.planResult)
            const seee = res.data.planResult.map((data) => ({ showMore: false }));
            console.log(seee);
            setShow(seee);
            console.log(show);

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
        if (accessToken == null) {
            scrollToTop()
            navigate("/log_in")
        } else {
            scrollToTop()
            navigate("/planbooking")
        }
    }

    const handleshow = (key) => {
        setShow((prevShow) => {
            const newShow = [...prevShow];
            newShow[key] = { showMore: !newShow[key].showMore };
            return newShow;
        });
    };


    return (
        <div >
            <section style={{ background: "#000" }} id="shop" className="products-area pt-100">
                <div className="container"   >
                    <div className="section-title">
                        <h2 style={{ color: "#c45100" }}>Choose your Membership</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                            maecenas accumsan lacus vel facilisis.</p>
                    </div>

                    <div className="slidepad">
                        <Slider {...settings} className="mt-5 ml-5">
                            {/* {criclass.map((data, key) => ( */}
                            {plans.map((data, key) => (



                                <div key={key} className="p-1 testcard">
                                    <div className="cardst" style={{ padding: "20px" }} >
                                        <h5 className=" mt-1 mb-2"> <i class="fa fa-cube" aria-hidden="true"></i> {data.name}</h5>
                                        <span>Perfect to get started</span>

                                        <h1 style={{ fontSize: "60px" }} className="mt-2 mb-2">$ {data.price} <span style={{ fontSize: "14px" }}>Per Plan / Month</span></h1>
                                        <p style={{ fontSize: "20px" }}> About Of Plan</p>
                                        <div>
                                            {data.whatsIncluded.slice(0, show[key].showMore ? data.whatsIncluded.length : 4).map((data, index) => (
                                                <>
                                                    <span key={index}><i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i> {data.value}</span><br />
                                                </>

                                            ))}</div>
                                        <div className="mt-2" style={{ float: "right" }} >
                                            {/* <span onClick={() => setShowMore(!showMore)}>
                                            {showMore ? 'Show less' : 'Show more'}
                                        </span> */}
                                            <span onClick={() => handleshow(key)}>
                                                {show[key].showMore ? 'Show less' : 'Show more'}
                                            </span>
                                        </div>

                                        <button onClick={() => { redirctpage(data) }} style={{ background: "#c45100", color: "#fff" }} className="form-control mt-4 mb-2">Select</button>

                                    </div>
                                </div>
                            ))}


                            {/* ))} */}

                        </Slider>
                    </div>

                    {/* <Slider  {...settings}>
                        {filteredData.map((data, key) => (
                            <div key={key} className="p-3">
                                <div className="single-products-box">
                                    <img style={{ height: "370px" }} src={`http://103.186.185.77:5027/${data.image}`} alt="image" />
                                    <div className="content">
                                        <h3>{data.name}</h3>
                                        <div>{data.whatsIncluded.map((data, key) => (
                                            <p key={key}>{data.value}</p>
                                        ))}</div>
                                       
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
                    </Slider> */}


                </div>
            </section>
        </div>
    )
}
export default Plans;