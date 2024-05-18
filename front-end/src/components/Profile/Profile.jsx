import React, { useEffect, useState } from 'react'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { useNavigate } from 'react-router-dom';
import MyNavbar from '../MyNavbar/MyNavbar';

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
                    <Col md={4}>
                        <div>
                            <img src={data.avatar} alt="" />
                        </div>
                    </Col>
                    <Col md={8}>
                        <div>
                            <h2>{`Ciao ${data.name} ${data.surname}`}</h2>
                        </div>
                        <div>
                            <h4>Data di nascita</h4>
                            <h4>{data.birthday}</h4>
                        </div>
                        <div>
                            <h4>Password</h4>
                            <h4>{data.password}</h4>
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
