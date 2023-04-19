import React, { useState, useEffect, useRef } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { Link, useNavigate } from "react-router-dom"
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios"
import { URL } from "../Apiurls";
import toast, { Toaster } from 'react-hot-toast';
import Moment from 'react-moment';
import rejected from "../assets/images/letast/rejected.avif"


const ResponsiveTables = () => {

    const [show, setshow] = useState(false)
    const buttonRef = useRef(null);
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);
    const navigate = useNavigate();

    const [lanes, setlanes] = useState([])
    const sortedData = lanes.sort((a, b) => a.laneNumber - b.laneNumber)
    const [lanesData, setlanesData] = useState([])

    const [form, setform] = useState(new Date().toISOString().substr(0, 10))
    const [times, settimes] = useState([{
        date: "",
        time: "",
        laneId: "",
    }])
    console.log(times)
    const [data, setdata] = useState([])

    const accessToken = sessionStorage.getItem("accessToken")
    const planbyid = sessionStorage.getItem("planid")

    const laneslist = () => {
        axios.post(URL.getallactivelanes).then((res) => {
            console.log(res.data)
            setlanes(res.data.LaneResult)
        })
    }

    const handlechange = (event) => {
        setform(event.target.value);
        const params = {
            date: event.target.value,
            planId: planbyid,
        }
        axios.post(URL.getbookedlanes, params).then((res) => {
            setlanes(res.data.data);
            setdata([]);
            settimes([{
                date: "",
                time: "",
                laneId: "",
            }])
            buttonRef.current.click();

            // resetData()
            // window.location.reload()
            console.log(res.data.data.booking[0].time)
        })

    };

    const [lanelength, setlanelength] = useState(0)
    console.log(lanelength)

    const handlechangetime = (e, id) => {

        console.log(e.target.checked);
        var dt = [];
        const myForm = { ...times }
        myForm[e.target.name] = e.target.value;
        myForm["_id"] = id;
        // settimes(myForm)
        const newData = [...data]; // create a copy of the data array
        const objIndex = newData.findIndex((obj) => obj.laneId === id);

        if (objIndex !== -1) {
            if (e.target.checked === true) {
                newData[objIndex].time.push(e.target.value);
                newData[objIndex].time = [...new Set(newData[objIndex].time)];
                setdata(newData);
            }
            else {
                const index = newData[objIndex].time.findIndex((obj) => obj === e.target.value);
                newData[objIndex].time.splice(index, 1);
            }
        } else {
            if (e.target.checked === true) {
                console.log("objIndex" + objIndex);
                newData.push({
                    date: form,
                    time: [e.target.value],
                    laneId: id,
                });
                setdata(newData);
                console.log(data);
            }
            else {
                console.log("objIndex" + objIndex);
                newData.splice(objIndex, 1);
                setdata(newData);
            }

        }

        const lengthArray = data.map(item => item.time.length);
        console.log(lengthArray);
        let lanelength = 0;
        const sum = lengthArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            lanelength > 0 ? 0 : 1
        );
        // const sum = lengthArray.reduce((accumulator, currentValue) => accumulator + currentValue, 1, 0);
        setlanelength(sum)
        sessionStorage.setItem("timelength", sum)
    }

    const resetData = () => {
        settimes([{
            date: "",
            time: "",
            laneId: "",
        }])
    };

    const mylanes = () => {
        const params = {
            date: form,
            planId: planbyid,
        }
        axios.post(URL.getbookedlanes, params).then((res) => {
            if (res.status === 200) {
                console.log(res.data.data)
                setlanes(res.data.data)
                // setlanesData()

            }
            // setform("")
            console.log(res.data.data.booking[0].time)
        })

    };


    const booklane = () => {
        const myObject = {
            data: data
        };
        console.log(times);
        if (Array.isArray(times)) {
            // const myObject = {
            //     data: []
            // };
            console.log(myObject.data);
            console.log(times.length);
            axios.post(URL.lanebooking, myObject, {
                headers: { Authorization: `Bearer ${accessToken}` }
            }).then((res) => {
                console.log(res.data)
                if (res.status === 200) {
                    // toast.success(res.data.message)
                    const jsonString = JSON.stringify(res.data.data);
                    sessionStorage.setItem("bookingdata", jsonString)
                    navigate("/booking")
                }
            },
                error => {
                    if (error.response && error.response.status === 400) {
                        toast.error(error.response.data.message)
                    }
                });
        } else {
            console.error("times is not an array");
        }
    };

    const formsubmit = (e) => {
        if (accessToken == null) {
            navigate("/log_in")
        } else {
            e.preventDefault();
            booklane()
        }

    }

    useEffect(() => {
        // laneslist()
        mylanes()
        sessionStorage.removeItem("timelength");
        setlanelength("")
    }, [])

    const isFutureDate = new Date(form) >= new Date(new Date().toISOString().substr(0, 10));


    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container">
                    <Header />
                    <Row style={{ marginTop: "100px", paddingTop: "30px" }}>
                        <form onSubmit={(e) => { formsubmit(e) }}>
                            <Col md={12}>
                                <Row>
                                    {/* <Col md="1"></Col> */}
                                    <Col md={3}>
                                        <div className="mt-5">
                                            <h2 style={{ color: "#ff6f0b" }}>Lanes</h2>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="row">
                                    {/* <Col md="1"></Col> */}
                                    <div className="col-lg-4" >
                                        <Label >Date</Label>
                                        <Input
                                            min={form}
                                            value={form}
                                            name="date" onChange={(e) => { handlechange(e) }}
                                            type="date" required />
                                    </div>
                                    <div className="col-lg-6" >
                                        <div className="d-flex justify-content-center">
                                            <div className="row m-4 pt-1">
                                                <div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input checklane bg-white" type="checkbox" id="inlineCheckbox1" defaultValue="option1" />
                                                        <label className="form-check-label text-dark" htmlFor="inlineCheckbox1">Available</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input style={{ background: "#000" }} className="form-check-input checklane" type="checkbox" id="inlineCheckbox2" defaultValue="option2" />
                                                        <label className="form-check-label text-dark " htmlFor="inlineCheckbox2">Booked</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input style={{ background: "#c9c9c9" }} className="form-check-input checklane" type="checkbox" id="inlineCheckbox3" defaultValue="option3" disabled />
                                                        <label className="form-check-label text-dark" htmlFor="inlineCheckbox3">Lane Issue</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input style={{ background: "#fb6e0a" }} className="form-check-input checklane" type="checkbox" id="inlineCheckbox3" defaultValue="option3" />
                                                        <label className="form-check-label text-dark" htmlFor="inlineCheckbox3">Selected</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-2" >
                                        <div className="text-end mt-3 pt-2">
                                            {lanelength == 0 || lanelength == undefined ? (
                                                <Button type="button" disabled={!isFutureDate} onClick={toggle} style={{ float: "right", width: "100%" }} className="m-1" color="dark"><i className="fa fa-hand-o-right"></i>  Proceed to Pay </Button>
                                            ) : (
                                                <Button type="submit" style={{ float: "right", width: "100%" }} className="m-1" color="dark"><i className="fa fa-hand-o-right"></i>  Proceed to Pay </Button>
                                            )}

                                        </div>
                                    </div>
                                </div>

                                <div className=" tebresdata" >
                                    <Table responsive className="table table-bordered mb-5" style={{ width: "100%" }}>
                                        <thead>
                                            <tr className="text-center">
                                                <th >
                                                    Lane & Time
                                                </th>
                                                <th>
                                                    08-09
                                                </th>
                                                <th>
                                                    09-10
                                                </th>
                                                <th>
                                                    10-11
                                                </th>
                                                <th>
                                                    11-12
                                                </th>
                                                <th>
                                                    12-13
                                                </th>
                                                <th>
                                                    13-14
                                                </th>
                                                <th>
                                                    14-15
                                                </th>
                                                <th>
                                                    15-16
                                                </th>
                                                <th>
                                                    16-17
                                                </th>
                                                <th>
                                                    17-18
                                                </th>
                                                <th>
                                                    18-19
                                                </th>
                                                <th>
                                                    19-20
                                                </th>
                                                <th>
                                                    20-21
                                                </th>
                                                <th>
                                                    21-22
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedData.map((data, key) => (
                                                <tr key={key} className="text-center">
                                                    <td className="" >{data.laneNumber}</td>
                                                    <>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "08:00-09:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="08:00-09:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "08:00-09:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="08:00-09:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="08:00-09:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "09:00-10:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="09:00-10:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "09:00-10:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="09:00-10:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="09:00-10:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "10:00-11:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="10:00-11:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "10:00-11:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="10:00-11:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="10:00-11:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "11:00-12:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="11:00-12:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "11:00-12:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="11:00-12:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="11:00-12:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "12:00-13:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="12:00-13:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "12:00-13:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="12:00-13:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="12:00-13:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "13:00-14:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="13:00-14:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "13:00-14:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="13:00-14:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="13:00-14:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "14:00-15:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="14:00-15:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "14:00-15:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="14:00-15:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="14:00-15:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "15:00-16:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="15:00-16:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "15:00-16:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="15:00-16:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="15:00-16:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "16:00-17:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="16:00-17:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "16:00-17:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="16:00-17:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="16:00-17:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "17:00-18:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="17:00-18:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "17:00-18:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="17:00-18:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="17:00-18:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>
                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "18:00-19:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="18:00-19:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "18:00-19:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="18:00-19:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="18:00-19:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "19:00-20:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="19:00-20:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "19:00-20:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="19:00-20:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="19:00-20:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "20:00-21:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="20:00-21:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "20:00-21:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="20:00-21:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="20:00-21:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                        <td className="tabpad">
                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "21:00-22:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                <input disabled style={{ background: "#000" }} name="time" value="21:00-22:00" className="tableinput form-check" type="checkbox" />
                                                            ) : (<>
                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "21:00-22:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="21:00-22:00" className="tableinput form-check" type="checkbox" />)
                                                                    : (
                                                                        <input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="21:00-22:00" className="tableinput form-check" type="checkbox" />
                                                                    )}
                                                            </>)}
                                                        </td>

                                                    </>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>



                            </Col>
                            <input style={{ display: "none" }} type="reset" value="UNCHECK ALL" ref={buttonRef} />
                        </form>
                    </Row>
                </div >

                <Toaster />
                <Footer />

                <Modal size="sm" isOpen={show1} toggle={toggle}>
                    {/* <ModalHeader toggle={toggle}></ModalHeader> */}
                    <ModalBody>
                        <div>
                            <div className="text-center">
                                <img style={{ width: "280px" }} src={rejected} />
                            </div>
                            <h5 className="text-center text-dark mt-4">You must choose at least one position.</h5>


                            <div className="text-end mt-3">
                                {/* <Button  type="button" color="danger m-1" outline>Yes <i className="bx bx-check-circle"></i></Button> */}
                                <Button style={{ float: "right" }} type="button" onClick={toggle} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                            </div>
                        </div>

                    </ModalBody>

                </Modal>
                .
            </div >

        </React.Fragment >
    );
};

export default ResponsiveTables;
