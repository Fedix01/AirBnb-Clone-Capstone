import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../MyNavbar/MyNavbar';
import './Profile.css';
import Button from 'react-bootstrap/esm/Button';
import { MdOutlineAlternateEmail } from "react-icons/md";

export default function Profile() {

    const endpoint = "http://localhost:3001/api/user/me"
    const [data, setData] = useState([])

    const navigate = useNavigate()

    const getProfile = async (token) => {
        try {
            const res = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            if (res.ok) {
                const profile = await res.json();
                setData(profile)
            }
        } catch (error) {
            navigate("/")
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getProfile(token)
        } else {
            navigate("/")
        }
    }, [])

    return (
        <>

            <MyNavbar />
            {data &&

                <Row>
                    <Col md={5} className='d-flex justify-content-center'>
                        <div className='image-prof'>
                            <Row>
                                <Col md={6}>
                                    <img src={data.avatar} alt=""
                                        style={{ width: "100px", borderRadius: "50%" }} />
                                    <h4 className='mt-2' style={{ textAlign: "center" }}>{data.name}</h4>
                                    <h6 style={{ textAlign: "center" }}>{data.isHost ? "Host" : "Ospite"}</h6>
                                </Col>
                                <Col md={6} className='d-flex flex-column justify-content-center'>
                                    <h4>1</h4>
                                    <h6>Recensione</h6>
                                    <hr />
                                    <h4>4</h4>
                                    <h6>Anni su AirBnb</h6>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col md={7}>
                        <div>
                            <h2>{`Informazioni su ${data.name}`}</h2>
                        </div>
                        <div>
                            <Button variant='transparent' style={{ border: "1px solid black" }}>Modifica il profilo</Button>
                        </div>
                        <div className='mt-2'>
                            <Row>
                                <Col md={6} className='d-flex align-items-center'>
                                    <MdOutlineAlternateEmail />
                                    <h6 className='ms-2'>{data.email}</h6>

                                </Col>
                                <Col md={6}>
                                </Col></Row>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <h4>{data.email}</h4>
                        </div>
                    </Col>
                </Row>
            }
        </>
    )
}
