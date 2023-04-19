import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import imglog from "../assets/images/letast/acelogo.png"
import img1 from "../assets/images/football/footb-playing.png"
import img2 from "../assets/images/football/playground.png"
import img3 from "../assets/images/football/footb-player1.png"
import img4 from "../assets/images/football/products/footb-product1.jpg"

import img5 from "../assets/images/football/products/footb-product2.jpg"
import img6 from "../assets/images/football/products/footb-product3.jpg"
import img7 from "../assets/images/football/products/footb-product4.png"

import img8 from "../assets/images/football/footb-player2.png"

import img9 from "../assets/images/football/football1.png"
import img10 from "../assets/images/football/football2.png"

import img11 from "../assets/images/football/blog/footb-blog1.jpg"
import img12 from "../assets/images/football/blog/footb-blog2.jpg"
import img13 from "../assets/images/football/blog/footb-blog3.jpg"

import gallery1 from "../assets/images/football/footb-gallery1.jpg"
import gallery2 from "../assets/images/football/footb-gallery2.jpg"
import gallery3 from "../assets/images/football/footb-gallery3.jpg"
import gallery4 from "../assets/images/football/footb-gallery4.jpg"

import cir1 from "../assets/images/cir1.jpg"
import cir2 from "../assets/images/cir2.jpg"
import cir3 from "../assets/images/cir3.jpg"

import Footer from "./Footer";
import Headers from "./Header";
import { URL } from "../Apiurls";
import axios from "axios";
import Class from "./Class";
import Plans from "./Plans";
import Membership from "./Membership";
function Home() {

    const navigate = useNavigate();

    const accessToken = sessionStorage.getItem("accessToken")
    console.log(accessToken)

    const sessiionClear = () => {
        sessionStorage.clear()
        navigate("/login")
    }

    const [plans, setplans] = useState([])
    const [banner, setbanner] = useState([])
    const [form, setform] = useState([])
    console.log(plans)
    const getPlans = () => {

        const params = {
            type: "Clinics",
        }
        axios.post(URL.getplansby, params,
        ).then((res) => {
            console.log(res.data)
            setplans(res.data.planResult)
        })
    }

    const getallbanners = () => {
        axios.post(URL.getallbanners,

        ).then((res) => {
            console.log(res.data)
            setbanner(res.data.bannerResult)
            // console.log(res.data.planResult[0].whatsIncluded)
        })
    }

    const getAbout = () => {
        axios
            .post(URL.getaboutus,

            )
            .then(res => {
                setform(res.data.aboutUs.aboutUs)
            })
    }


    const redirctpage = (data) => {
        sessionStorage.setItem("planid", data._id)
        if (accessToken == null) {
            navigate("/log_in")
        } else {
            scrollToTop()
            navigate("/planbooking")
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      };

    useEffect(() => {
        // scrollToTop()
        getAbout();
        getPlans()
        getallbanners()
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



    return (
        <div >
            <div>
                {/* Mirrored from plaon-react.envytheme.com/ by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 02 Mar 2023 08:01:48 GMT */}
                {/* Added by HTTrack */}
                {/* <meta httpEquiv="content-type" content="text/html;charset=utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="icon" type="image/png" href="images/favicon.png" />
                <meta name="viewport" content="width=device-width" />
                <meta charSet="utf-8" />
                <title>Plaon - Sports Influencers React Next Template</title>
                <meta name="description" content="Plaon - Sports Influencers React Next Template" />
                <meta name="og:title" property="og:title" content="Plaon - Sports Influencers React Next Template" />
                <meta name="twitter:card" content="Plaon - Sports Influencers React Next Template" />
                <link rel="canonical" href="index.html" />
                <meta name="next-head-count" content={7} />
                <link rel="preload" href="_next/static/css/a254c171da4d315d7164.css" as="style" />
                <link rel="stylesheet" href="_next/static/css/a254c171da4d315d7164.css" />
                <link rel="preload" href="_next/static/Vg8A5EsjvGYteMIXPixU_/pages/_app.js" as="script" />
                <link rel="preload" href="_next/static/Vg8A5EsjvGYteMIXPixU_/pages/index.js" as="script" />
                <link rel="preload" href="_next/static/runtime/webpack-0fb1006769f6c960e132.js" as="script" />
                <link rel="preload" href="_next/static/chunks/framework.7dfd02d307191d63a37e.js" as="script" />
                <link rel="preload" href="_next/static/chunks/commons.94e9432177da8e3c395d.js" as="script" />
                <link rel="preload" href="_next/static/runtime/main-cb32dfe10aba6a9a3cbd.js" as="script" />
                <link rel="preload" href="_next/static/chunks/028af9b54ac55ff2017158a8da26a461fe56bd34.67c1ea9efa424ca8c642.js" as="script" /> */}

                <div id="__next" style={{ overflowX: "hidden" }}>
                    <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light navbacgroaund">
                        <div className="container-fluid"><Link to="/" className="navbar-brand" > <img style={{ width: "120px" }} src={imglog} /></Link>
                            <button className="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item"><Link onClick={scrollToTop} className="nav-link active" to="/">Home</Link></li>
                                    <li className="nav-item"><Link onClick={scrollToTop} className="nav-link" to="/members">Plans</Link></li>
                                    <li className="nav-item"><Link onClick={scrollToTop} className="nav-link" to="/membershipdata">Membership</Link></li>
                                    <li className="nav-item"><Link onClick={scrollToTop} className="nav-link" to="/classes">Classes</Link></li>
                                    {/* <li className="nav-item"><a className="nav-link" href="#highlights">Groups</a></li> */}
                                    <li className="nav-item"><Link onClick={scrollToTop} to="/about" className="nav-link">About</Link></li>
                                    <li className="nav-item"><Link to="/contact" onClick={scrollToTop} className="nav-link">Contact</Link></li>                                    {/* <li className="nav-item"><a className="nav-link" href="#news">Hours</a></li> */}
                                    {/* <li className="nav-item"><a className="nav-link" href="#news"></a></li> */}
                                    {accessToken == null ? (
                                        <li className="nav-item"><Link  className="nav-link" to="/login"><i class="fa fa-user-circle-o" aria-hidden="true"></i></Link></li>

                                    ) : (
                                        <div className="dropdown">
                                            <li className="nav-item dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user-circle-o" aria-hidden="true"></i></li>

                                            <div class="dropdown-menu drop promenubar">
                                                <Link to="/profile" class="dropdown-item">
                                                    <div className="row">
                                                        <div className="col col-3"><i class="fa fa-user-circle-o" aria-hidden="true"></i></div>
                                                        <div className="col col-9">Profile</div>
                                                    </div>
                                                </Link>
                                                <a onClick={() => { sessiionClear() }} role="button" class="dropdown-item" >
                                                    <div className="row">
                                                        <div className="col col-3"><i class="fa fa-sign-out text-danger" aria-hidden="true"></i></div>
                                                        <div className="col col-9">Log Out</div>
                                                    </div>
                                                </a>
                                            </div>

                                        </div>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                    {banner.map((data) => (
                        <div style={{ backgroundImage: `url(${`http://103.186.185.77:5027/${data.bannerImage}`})` }} id="home" className="main-banner jarallax">
                            <div className="d-table">
                                <div className="d-table-cell">
                                    <div className="container-fluid">
                                        <div className="main-banner-content"><span className="sub-title">Welcome to</span>
                                            <h1 className="mt-4" style={{ fontFamily: "Freshman" }}>ACE Batting</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="banner-footer-content">
                                <div className="container-fluid">
                                    <div className="row align-items-center">
                                        <div className="col-lg-6 col-sm-6"><span className="email-link"><a href="#" className="__cf_email__" data-cfemail="9ef6fbf2f2f1def2f7f1f0fbf2f3ffedf1f0b0fdf1f3">Achieve Competitive Edge</a></span>
                                        </div>
                                        <div className="col-lg-6 col-sm-6">
                                            <ul className="social">
                                                <li><a target="_blank" href="#"><i className="flaticon-facebook" /></a></li>
                                                <li><a target="_blank" href="#"><i className="flaticon-twitter-1" /></a></li>
                                                <li><a target="_blank" href="#"><i className="flaticon-instagram-1" /></a></li>
                                                <li><a target="_blank" href="#"><i className="flaticon-linkedin-1" /></a></li>
                                                <li><a target="_blank" href="#"><i className="flaticon-youtube-1" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}


                    <section id="partners" className="next-match-area">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-6 col-md-12">
                                    <div className="next-match-content">
                                        <div className="content">
                                            <div className="row align-items-center">
                                                <h2 style={{ color: "#c45100" }}>About</h2>
                                                <div dangerouslySetInnerHTML={{
                                                    __html: form,
                                                }} />

                                            </div>
                                        </div>
                                        <div className="shape1"><img src={img1} alt="image" /></div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-12">
                                    <div className="next-match-image"><img src={img2} alt="image" /></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Plans />
                    <Membership />
                    <Class />

                    {/* <section id="highlights" /> */}

                    {/* <section id="partners" className="partners-area bg-161616 pt-100 pb-70">
                        <div className="container">
                            <div className="section-title">
                                <h2>Brand Partners</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                                    maecenas accumsan lacus vel facilisis.</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-sm-4 col-md-4 col-6">
                                    <div className="single-partners-box"><a href="#"><img src="images/football/partner/footb-partner1.png" alt="image" /></a></div>
                                </div>
                                <div className="col-lg-3 col-sm-4 col-md-4 col-6">
                                    <div className="single-partners-box"><a href="#"><img src="images/football/partner/footb-partner2.png" alt="image" /></a></div>
                                </div>
                                <div className="col-lg-3 col-sm-4 col-md-4 col-6">
                                    <div className="single-partners-box"><a href="#"><img src="images/football/partner/footb-partner3.png" alt="image" /></a></div>
                                </div>
                                <div className="col-lg-3 col-sm-4 col-md-4 col-6">
                                    <div className="single-partners-box"><a href="#"><img src="images/football/partner/footb-partner4.png" alt="image" /></a></div>
                                </div>
                                <div className="col-lg-3 col-sm-4 col-md-4 col-6">
                                    <div className="single-partners-box"><a href="#"><img src="images/football/partner/footb-partner5.png" alt="image" /></a></div>
                                </div>
                                <div className="col-lg-3 col-sm-4 col-md-4 col-6">
                                    <div className="single-partners-box"><a href="#"><img src="images/football/partner/footb-partner6.png" alt="image" /></a></div>
                                </div>
                                <div className="col-lg-3 col-sm-4 col-md-4 col-6">
                                    <div className="single-partners-box"><a href="#"><img src="images/football/partner/footb-partner7.png" alt="image" /></a></div>
                                </div>
                                <div className="col-lg-3 col-sm-4 col-md-4 col-6">
                                    <div className="single-partners-box"><a href="#"><img src="images/football/partner/footb-partner8.png" alt="image" /></a></div>
                                </div>
                            </div>
                        </div>
                    </section> */}



                    <section style={{ background: "#000" }} id="news" className="blog-area pt-100 pb-70">
                        <div className="container">
                            <div className="section-title">
                                <h2 style={{ color: "#df6b18" }}>Clinics</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                    labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                                    maecenas accumsan lacus vel facilisis.</p>
                            </div>
                            {/* <section style={{ background: "#000" }} id="shop" className="products-area pt-100">
                                <div className="container"> */}
                            <div style={{ padding: "20px" }}>
                                <Slider  {...settings}>
                                    {plans.map((data, key) => (
                                        <div key={key} className="p-3">
                                            <div className="single-products-box">
                                                <img style={{ height: "370px" }} src={`http://103.186.185.77:5027/${data.image}`} alt="image" />
                                                <div className="content">
                                                    <div className="row">
                                                        <div className="col">
                                                            <h3>{data.name}</h3>
                                                        </div>
                                                        <div className="col">
                                                            <div style={{ float: "right" }}>
                                                                <span className="text-end" style={{ color: "#e96b11", fontSize: "20px" }}>{data.gameType}</span>
                                                            </div>
                                                        </div>
                                                    </div>
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
                            {/* </div>
                            </section> */}

                            {/* <div className="col-lg-4 col-md-6">
                                    <div className="single-blog-post">
                                        <div className="post-image"><img src={img12} alt="image" /><a target="_blank" className="link-btn" href="#" /></div>
                                        <div className="post-content">
                                            <h3><a target="_blank" href="#">Liverpool title will be
                                                special</a></h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua.</p><a target="_blank" className="read-more-btn" href="#">Read More</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
                                    <div className="single-blog-post">
                                        <div className="post-image"><img src={img13} alt="image" /><a target="_blank" className="link-btn" href="#" /></div>
                                        <div className="post-content">
                                          
                                            <h3><a target="_blank" href="#">Moyes self-isolating as
                                                precaution</a></h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                                incididunt ut labore et dolore magna aliqua.</p><a target="_blank" className="read-more-btn" href="#">Read More</a>
                                        </div>
                                    </div>
                                </div> */}
                            {/* </div> */}
                        </div>
                    </section>

                    <section style={{ background: "#000" }} className="subscribe-area">
                        <div className="container">
                            <div className="subscribe-inner-area">
                                <div className="section-title">
                                    <h2>Stay Tuned</h2>
                                    <p>Subscribe my newsletter and don’t miss any update on new products, promotions or even career
                                        events.</p>
                                </div>
                                <form className="newsletter-form"><input type="email" className="input-newsletter" placeholder="Enter your email address" name="email" required /><button type="submit">Subscribe To Newsletter</button>
                                    {/* <div className="check-info">
                                        <input type="checkbox" className="inp-cbx" id="cbx" /><
                                            label className="cbx" htmlFor="cbx"><span><svg width="12px" height="9px" viewBox="0 0 12 9">
                                        <polyline points="1 5 4 8 11 1" />
                                    </svg></span><span>I read and accept the <a href="#">privacy
                                        policy.</a></span></label></div> */}
                                </form>
                                <div className="subscribe-shape1"><img src={img9} alt="image" /></div>
                                <div className="subscribe-shape2"><img src={img10} alt="image" /></div>
                            </div>
                        </div>
                    </section>

                    <Footer />
                </div>
                {/* Mirrored from plaon-react.envytheme.com/ by HTTrack Website Copier/3.x [XR&CO'2014], Thu, 02 Mar 2023 08:01:48 GMT */}
            </div >
        </div >
    );
}

export default Home;
