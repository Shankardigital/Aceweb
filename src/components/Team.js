import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { URL } from "../Apiurls";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import rejected from "../assets/images/letast/rejected.avif"
// import { Link,  } from "react-router-dom";

const Booking = () => {

    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);

    // const jsonString = sessionStorage.getItem('customer');
    // const customerdata = JSON.parse(jsonString);
    // console.log(customerdata)

    const [customerdata, setCustomerdata] = useState([])
    const [detailsLoaded, setDetailsLoaded] = useState(false);
    console.log(customerdata)
    
    const mydetails = () => {
        axios.post(URL.getprofile, {},
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }
        ).then((res) => {
            console.log(res.data)
            if (res.status === 200) {
                console.log(res.data.customerResult)
                setCustomerdata(res.data.customerResult)
                setDetailsLoaded(true)

            }
        })
    }

    const accessToken = sessionStorage.getItem("accessToken")
    const [inputList, setInputList] = useState([{ firstName: "", lastName: "", email: "", phone: "" }])
    console.log(inputList.length)

    const handleInputChange = (e, index) => {
        const { name, value } = e.target
        const list = [...inputList]
        list[index][name] = value
        setInputList(list)

    }

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList]
        list.splice(index, 1)
        setInputList(list)
    }

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { value: "" }])
    }

    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     const myuser = { ...user }
    //     myuser[e.target.name] = e.target.value
    //     setuser(myuser)
    // }

    // const [plans, setplans] = useState([])
    // console.log(plans)
    const data12 = inputList.map((x) => ({
        firstName: x.firstName,
        lastName: x.lastName,
        email: x.email,
        countryCode: x.countryCode,
        phone: x.phone,
    }));
    console.log(data12);

    const formsubmit = (e) => {
        if (accessToken == null) {
            navigate("/log_in")
        } else {
            const jsonString = JSON.stringify(data12);
            sessionStorage.setItem("bookingdata", jsonString)
            navigate("/planbooking")
        }
    }

    useEffect(() => {
        mydetails();
        if (accessToken == null) {
          navigate("/log_in");
        }
      }, []);
      
      useEffect(() => {
        if (detailsLoaded && (customerdata.gender == "" || customerdata.gender == undefined)) {
          navigate("/profile");
        }
      }, [detailsLoaded, customerdata.gender]);

    return (
        <div  >
            <Header />
            <div style={{ marginTop: "170px" }} className="container mb-5">
                <div>
                    <h2 style={{ color: "#ff6f0b" }}>Team Players</h2>
                </div>
                <div className="row mt-5">
                    <div className="col col-lg-12">
                        <div className="card ">
                            <div className="card-body">
                                {customerdata.gender == "male" ? (
                                    <h5 className="text-center text-dark">You need to choose 10 participants</h5>
                                ) : (
                                    <h5 className="text-center text-dark">You need to choose 5 participants</h5>
                                )}
                                <form onSubmit={(e) => { formsubmit(e) }} >
                                    {/* {customerdata.gender == "male" ? (
                                        <>
                                            ""

                                        </>
                                    ) : (
                                        <>
                                            <div className="row mt-2">
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">First Name <span className="text-danger">*</span></label>
                                                        <input type="text" required className="form-control" placeholder="EnterFirst Name" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Last Name <span className="text-danger">*</span></label>
                                                        <input type="text" required className="form-control" placeholder="Enter Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Email <span className="text-danger">*</span></label>
                                                        <input type="email" required className="form-control" placeholder="Enter Your Email Id" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3 ">
                                                    <div>
                                                        <label className="text-dark">Phone</label>
                                                        <input type="number" className="form-control" placeholder="Enter Your Phone Number" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col col-lg-3 ">
                                                    <div>
                                                        <label className="text-dark">First Name <span className="text-danger">*</span></label>
                                                        <input type="text" required className="form-control" placeholder="EnterFirst Name" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3 ">
                                                    <div>
                                                        <label className="text-dark">Last Name <span className="text-danger">*</span></label>
                                                        <input type="text" required className="form-control" placeholder="Enter Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3 ">
                                                    <div>
                                                        <label className="text-dark">Email <span className="text-danger">*</span></label>
                                                        <input type="email" required className="form-control" placeholder="Enter Your Email Id" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Phone</label>
                                                        <input type="number" className="form-control" placeholder="Enter Your Phone Number" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">First Name <span className="text-danger">*</span></label>
                                                        <input type="text" required className="form-control" placeholder="EnterFirst Name" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Last Name <span className="text-danger">*</span></label>
                                                        <input type="text" required className="form-control" placeholder="Enter Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Email <span className="text-danger">*</span></label>
                                                        <input type="email" required className="form-control" placeholder="Enter Your Email Id" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Phone</label>
                                                        <input type="number" className="form-control" placeholder="Enter Your Phone Number" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col col-lg-3 ">
                                                    <div>
                                                        <label className="text-dark">First Name <span className="text-danger">*</span></label>
                                                        <input type="text" required className="form-control" placeholder="EnterFirst Name" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Last Name <span className="text-danger">*</span></label>
                                                        <input type="text" required className="form-control" placeholder="Enter Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Email <span className="text-danger">*</span></label>
                                                        <input type="email" required className="form-control" placeholder="Enter Your Email Id" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Phone</label>
                                                        <input type="number" className="form-control" placeholder="Enter Your Phone Number" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-2">
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">First Name <span className="text-danger">*</span></label>
                                                        <input type="text" required className="form-control" placeholder="EnterFirst Name" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Last Name <span className="text-danger">*</span></label>
                                                        <input type="text" required className="form-control" placeholder="Enter Last Name" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Email <span className="text-danger">*</span></label>
                                                        <input type="email" required className="form-control" placeholder="Enter Your Email Id" />
                                                    </div>
                                                </div>
                                                <div className="col col-lg-3">
                                                    <div>
                                                        <label className="text-dark">Phone</label>
                                                        <input type="number" className="form-control" placeholder="Enter Your Phone Number" />
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )} */}

                                    <div className="mt-2">
                                        {inputList.map((x, i) => {
                                            return (
                                                <div key={i} className="box">

                                                    <div className="row">
                                                        <div className=" col-lg-3">
                                                            <div>
                                                                <label className="text-dark">First Name <span className="text-danger">*</span></label>
                                                                <input
                                                                    value={x.firstName}
                                                                    onChange={e => handleInputChange(e, i)}
                                                                    type="text" name="firstName" required className="form-control" placeholder="EnterFirst Name" />
                                                            </div>
                                                        </div>
                                                        <div className=" col-lg-3">
                                                            <div>
                                                                <label className="text-dark">Last Name <span className="text-danger">*</span></label>
                                                                <input
                                                                    value={x.lastName}
                                                                    onChange={e => handleInputChange(e, i)}
                                                                    type="text" name="lastName" required className="form-control" placeholder="Enter Last Name" />
                                                            </div>
                                                        </div>
                                                        <div className=" col-lg-3">
                                                            <div>
                                                                <label className="text-dark">Email <span className="text-danger">*</span></label>
                                                                <input
                                                                    value={x.email}
                                                                    onChange={e => handleInputChange(e, i)}
                                                                    type="email" name="email" required className="form-control" placeholder="Enter Your Email Id" />
                                                            </div>
                                                        </div>
                                                        <div className=" col-lg-3">
                                                            <div>
                                                                <label className="text-dark">Phone</label>
                                                                <input
                                                                    value={x.phone}
                                                                    onChange={e => handleInputChange(e, i)}
                                                                    type="number" name="phone" className="form-control" placeholder="Enter Your Phone Number" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <Row>
                                                        <Col md="12">
                                                            <div className="" style={{ float: "right" }}>
                                                                <div className="btn-box">
                                                                    {inputList.length !== 1 && <button
                                                                        className="mr10 btn btn-outline-danger btn-sm m-1" type="button" style={{ width: "100px" }}
                                                                        onClick={() => handleRemoveClick(i)}>Remove <i className="bx bx-x-circle"></i></button>}
                                                                    {inputList.length - 1 === i && <button className="btn btn-sm btn-outline-info m-1" style={{ width: "90px" }} onClick={handleAddClick}>Add <i className="bx bx-plus-circle"></i></button>}
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>

                                                </div>
                                            )
                                        })}
                                    </div>


                                    <div style={{ float: "right" }} className="mt-5">
                                        {/* <Link to="/booking"> */}
                                        {customerdata.gender == "male" ? (
                                            <>
                                                {inputList.length > 9 ? (
                                                    <button type="submit" style={{ width: "120px" }} className="btn btn-dark"><i className="fa fa-hand-o-right"></i>  Procced to Pay </button>
                                                ) : (
                                                    <button onClick={toggle} type="button" style={{ width: "120px" }} className="btn btn-dark"><i className="fa fa-hand-o-right"></i>  Procced to Pay </button>

                                                )}
                                            </>
                                        ) : (
                                            <>
                                                {inputList.length > 4 ? (
                                                    <button type="submit" style={{ width: "120px" }} className="btn btn-dark"><i className="fa fa-hand-o-right"></i>  Procced to Pay </button>
                                                ) : (
                                                    <button onClick={toggle} type="button" style={{ width: "120px" }} className="btn btn-dark"><i className="fa fa-hand-o-right"></i>  Procced to Pay </button>

                                                )}
                                            </>
                                        )}

                                        {/* </Link> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />

            <Footer />

            <Modal size="sm" isOpen={show1} toggle={toggle}>
                {/* <ModalHeader toggle={toggle}></ModalHeader> */}
                <ModalBody>
                    <div>
                        <div className="text-center">
                            <img style={{ width: "280px" }} src={rejected} />
                        </div>
                        {customerdata.gender == "male" ? (
                            <h5 className="text-center text-dark mt-4">You need to choose 10 participants.</h5>
                        ) : (
                            <h5 className="text-center text-dark mt-4">You need to choose 5 participants.</h5>
                        )}
                        <div className="text-end mt-3">
                            {/* <Button  type="button" color="danger m-1" outline>Yes <i className="bx bx-check-circle"></i></Button> */}
                            <Button style={{ float: "right" }} type="button" onClick={toggle} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </div>

                </ModalBody>

            </Modal>

        </div>
    )
}
export default Booking