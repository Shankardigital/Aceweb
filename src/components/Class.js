import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import img3 from "../assets/images/football/footb-player1.png"
import gallery1 from "../assets/images/football/footb-gallery1.jpg"
import gallery2 from "../assets/images/football/footb-gallery2.jpg"
import gallery3 from "../assets/images/football/footb-gallery3.jpg"
import gallery4 from "../assets/images/football/footb-gallery4.jpg"
import img8 from "../assets/images/football/footb-player2.png"
import cir1 from "../assets/images/cir1.jpg"
import cir2 from "../assets/images/cir2.jpg"
import cir3 from "../assets/images/cir3.jpg"

import Footer from "./Footer";
import Headers from "./Header";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../Apiurls";
import toast, { Toaster } from 'react-hot-toast';

const Class = () => {

    const accessToken = sessionStorage.getItem("accessToken")
    const navigate = useNavigate();

    var settings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
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

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const [advanced, setadvanced] = useState([])
    const [beginner, setbeginner] = useState([])
    const [intermediate, setintermediate] = useState([])

    const [criadvanced, setciradvanced] = useState([])
    const [cribeginner, setcirbeginner] = useState([])
    const [criintermediate, setcirintermediate] = useState([])


    const [criclass, setcriclass] = useState([])
    const [batch, setbatch] = useState([])

    const [classid, setclassid] = useState([])
    const [batchid, setbatchid] = useState([])



    const getclassbybase = () => {
        const params = {
            // type: "Classes",
            gameType: "baseball",
        }
        axios.post(URL.getallclass, params,).then((res) => {
            setadvanced(res.data.advanced)
            setbeginner(res.data.beginner)
            setintermediate(res.data.intermediate)
        })
    }

    const getclassbycirck = () => {
        const params = {
            // type: "Classes",
            gameType: "circket",
        }
        axios.post(URL.getallclass, params,).then((res) => {
            setciradvanced(res.data.advanced)
            setcirintermediate(res.data.intermediate)
            setcirbeginner(res.data.beginner)
        })
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };


    // const getbatchs = () => {
    //     axios.post(URL.getallbatchs,).then((res) => {
    //         setbatch(res.data.batchResult)
    //         // console.log(res.date)
    //     })
    // }

    useEffect(() => {
        getclassbybase()
        getclassbycirck()
        // getbatchs()
    }, [])

    const classdata = (data) => {
        setModal(true)
        setbatch(data.batches)
        sessionStorage.setItem("planid", data._id)

    }

    const batchdata = (data) => {
        scrollToTop()
        setbatchid(data)
        navigate("/batchdetails")
        sessionStorage.setItem("batchdata", JSON.stringify(data));
        sessionStorage.setItem("batchid", data._id)
    }

    const closeBtn = (
        <button className="close" style={{ fontSize: "30px" }} onClick={toggle} type="button">
            &times;
        </button>
    );



    return (
        <div style={{ overflowX: "hidden" }}>
            <section style={{ background: "#000" }} id="matches" className="upcoming-matches-area pt-100 pb-70">
                <div className="container">
                    <div className="section-title">
                        <h2 style={{ color: "#c45100" }}>Cricket </h2>
                        <p>Circket  is a religion and we all are a part of it.
                            <span style={{ fontFamily: "Freshman", fontSize: "13px" }}>ACE Batting</span>  has been on a mission to  offer Circket  players home away from home. It is striving to provide the facilities with state-of the Art bowing machines that can challenge a batter with more then 3600 variations of bowling formats.
                            Even as an individual you can practice hitting . If you want to practice as a pair or team, we offer full pitch length net practice line . Come join us and reconnect with your game. </p>
                    </div>
                </div>
                <div className="row">
                    <div className=" col col-lg-5 ">
                        <div className="upcoming-matches-shape1"><img src={img3} alt="image" /></div>
                    </div>
                    <div className="col col-lg-6">
                    <div className="slidepad">
                        <Slider {...settings} className="mt-5 ml-5">

                            {cribeginner.map((data, key) => (
                                <div key={key} className="p-1">
                                    <div style={{height:"345px"}} className="cardst" >
                                        <h3 className=" mt-3 mb-2">{data.stage}</h3>
                                        <div>{data.whatsIncluded.map((data, key) => (
                                            <p key={key}>{data.value}</p>
                                        ))}</div>
                                        <h1 className="mt-2 mb-2">$ {data.price}</h1>
                                        <button onClick={() => { classdata(data) }} className="form-control">Select</button>
                                    </div>
                                </div>
                            ))}

                            {criintermediate.map((data, key) => (
                                <div key={key} className="p-1">
                                    <div style={{height:"345px"}} className="cardst" >
                                        <h3 className=" mt-3 mb-2">{data.stage}</h3>
                                        <div>{data.whatsIncluded.map((data, key) => (
                                            <p key={key}>{data.value}</p>
                                        ))}</div>
                                        <h1 className="mt-2 mb-2">$ {data.price}</h1>
                                        <button onClick={() => { classdata(data) }} className="form-control">Select</button>
                                    </div>
                                </div>
                            ))}

                            {criadvanced.map((data, key) => (
                                <div key={key} className="p-1">
                                    <div style={{height:"345px"}} className="cardst" >
                                        <h3 className=" mt-3 mb-2">{data.stage}</h3>
                                        <div>{data.whatsIncluded.map((data, key) => (
                                            <p key={key}>{data.value}</p>
                                        ))}</div>
                                        <h1 className="mt-2 mb-2">$ {data.price}</h1>
                                        <button onClick={() => { classdata(data) }} className="form-control">Select</button>
                                    </div>
                                </div>
                            ))}

                            {/* <div style={{ padding: "25px" }}>

                        <div className="single-gallery-item">
                            <img src={cir1} style={{ height: "500px" }} />
                            <div className="date">
                                <span>25 April, 2020</span></div><h3>Semi Final</h3><span className="sub-title">Champions League</span><div className="vs-matches"><img src="images/football/footb-team1.png" alt="image" /><h4>Napoli</h4><span>VS</span><h4>Barcelona</h4><img src="images/football/footb-team2.png" alt="image" />
                            </div>
                            <a className="default-btn" href="#">Book Now</a>
                        </div>
                    </div>
                    <div style={{ padding: "25px" }}>

                        <div className="single-upcoming-matches-item"><div className="date"><span>25 April, 2020</span></div><h3>Semi Final</h3><span className="sub-title">Champions League</span><div className="vs-matches"><img src="images/football/footb-team1.png" alt="image" /><h4>Napoli</h4><span>VS</span><h4>Barcelona</h4><img src="images/football/footb-team2.png" alt="image" /></div><a className="default-btn" href="#">Book Now</a></div>
                    </div>
                    <div style={{ padding: "25px" }}>

                        <div className="single-upcoming-matches-item"><div className="date"><span>25 April, 2020</span></div><h3>Semi Final</h3><span className="sub-title">Champions League</span><div className="vs-matches"><img src="images/football/footb-team1.png" alt="image" /><h4>Napoli</h4><span>VS</span><h4>Barcelona</h4><img src="images/football/footb-team2.png" alt="image" /></div><a className="default-btn" href="#">Book Now</a></div>
                    </div>
                    <div style={{ padding: "25px" }}>

                        <div className="single-upcoming-matches-item"><div className="date"><span>25 April, 2020</span></div><h3>Semi Final</h3><span className="sub-title">Champions League</span><div className="vs-matches"><img src="images/football/footb-team1.png" alt="image" /><h4>Napoli</h4><span>VS</span><h4>Barcelona</h4><img src="images/football/footb-team2.png" alt="image" /></div><a className="default-btn" href="#">Book Now</a></div>
                    </div> */}
                        </Slider>
                        </div>
                    </div>
                </div>
                {/* <div className="upcoming-matches-shape1"><img src={img3} alt="image" /></div> */}
            </section>
            <section style={{ background: "#000" }} id="matches" className="gallery-area pt-100 pb-70">
                <div className="container">
                    <div className="section-title">
                        <h2 style={{ color: "#c45100" }}>Baseball</h2>
                        <p>It all starts with a dream: a dream to be healthy, a dream to be strong, a dream to be fast, and a dream to be an ACE in the game. At <span style={{ fontFamily: "Freshman", fontSize: "13px", fontSize: "13px" }}>ACE Batting</span>, we strive making this very dreams come true .  Our facility has been designed to provide an outstanding environment for Baseball players of all levels and abilities. Whether you’re a novice or a professional, reach your potential with <span style={{ fontFamily: "Freshman", fontSize: "13px" }}>ACE Batting</span>.</p>
                    </div>
                </div>
                {/* <div className="col-lg-1"></div> */}
                <div className='row'>
                    <div className="col col-lg-6">
                      <div className="slidepad">
                      <Slider {...settings} className="mt-5 ml-5">

{beginner.map((data, key) => (
    <div key={key} className="p-1">
        <div style={{height:"345px"}} className="cardst" >
            <h3 className=" mt-3 mb-2">{data.stage}</h3>
            <div>{data.whatsIncluded.map((data, key) => (
                <p key={key}>{data.value}</p>
            ))}</div>
            <h1 className="mt-2 mb-2">$ {data.price}</h1>
            <button onClick={() => { classdata(data) }} className="form-control">Select</button>
        </div>
    </div>
))}
{intermediate.map((data, key) => (
    <div key={key} className="p-1">
        <div style={{height:"345px"}} className="cardst" >
            <h3 className=" mt-3 mb-2">{data.stage}</h3>
            <div>{data.whatsIncluded.map((data, key) => (
                <p key={key}>{data.value}</p>
            ))}</div>
            <h1 className="mt-2 mb-2">$ {data.price}</h1>
            <button onClick={() => { classdata(data) }} className="form-control">Select</button>
        </div>
    </div>
))}
{advanced.map((data, key) => (
    <div key={key} className="p-1">
        <div style={{height:"345px"}} className="cardst" >
            <h3 className=" mt-3 mb-2">{data.stage}</h3>
            <div>{data.whatsIncluded.map((data, key) => (
                <p key={key}>{data.value}</p>
            ))}</div>
            <h1 className="mt-2 mb-2">$ {data.price}</h1>
            <button onClick={() => { classdata(data) }} className="form-control">Select</button>
        </div>
    </div>
))}

</Slider>
                      </div>
                    </div>
                    <div className='col col-lg-5'>
                        <div className="gallery-shape1"><img src={img8} alt="image" /></div>
                    </div>
                </div>
            </section>
            <Toaster />

            <Modal isOpen={modal} fade={false} toggle={toggle}>

                <ModalHeader close={closeBtn} toggle={toggle} className="text-dark"> Select Your Batch</ModalHeader>
                <ModalBody>
                    <form >
                        <div>
                            {batch.map((data, key) => (
                                <div key={key} style={{ borderRadius: "10px" }} className="card m-3" >
                                    <div className="row p-2 mt-2">
                                        <div className="col-8 col">
                                            <h3 className="text-dark">{data.batch}</h3>
                                            <span className="text-dark">{data.days}</span>
                                        </div>
                                        <div className="col-4 col">

                                            <button type="button" onClick={() => { batchdata(data) }} style={{ width: "100px" }} className="btn btn-primary mt-3" >Details</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3" style={{ float: "right" }}>
                            {/* <input style={{width:"70px", height:"40px"}} type="checkbox" placeholder="select"/> */}

                            {/* <span className="p-2 text-dark btns" style={{border:"2px solid black"}}>Select</span> */}
                            {/* <Button className="m-1" style={{ width: "100px" }} color="danger" onClick={toggle}>
                                Cancel
                            </Button> */}
                            {/* <Link to="/booking"> */}
                            {/* <Button type="submit" className="m-1" style={{ width: "100px" }} color="success">
                                Procced to Pay
                            </Button> */}
                            {/* </Link> */}

                        </div>
                    </form>
                </ModalBody>

            </Modal>

        </div>
    )
}
export default Class;