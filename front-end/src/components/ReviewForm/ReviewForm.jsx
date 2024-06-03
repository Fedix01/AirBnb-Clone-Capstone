import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import emptyAvatar from "../../assets/avatar.png";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { AlertContext } from '../AlertProvider/AlertProvider';

export default function ReviewForm({ getfromApi, showAll, modify, reviewUpdate }) {

    const params = useParams();

    const navigate = useNavigate();

    const [token, setToken] = useState();

    const [user, setUser] = useState({});

    const { setAlert } = useContext(AlertContext);


    const [formData, setFormData] = useState({
        rating: null,
        comment: ""
    })

    const endpointAll = `http://localhost:3001/api/insertion/${params.id}/allReviews`;

    const endpoint = `http://localhost:3001/api/insertion/${params.id}/reviews`;

    const createReview = async (event) => {
        event.preventDefault();
        if (token) {
            try {
                const payload = {
                    "rating": formData.rating,
                    "comment": formData.comment
                };
                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    const newRev = await res.json();
                    if (showAll) {
                        getfromApi(endpointAll)
                    } else {
                        getfromApi(endpoint)
                    }
                    reviewUpdate()
                    console.log(newRev);
                }
            } catch (error) {
                console.error(error)
            }

        } else {
            setAlert("Per commentare ti devi loggare");
            setTimeout(() => {
                setAlert("")
            }, 4000);
            navigate("/logIn")
        }
    }

    const handleModify = (event) => {
        event.preventDefault();
        modifyReview()
    }

    const modifyReview = async () => {
        if (token) {
            console.log(token)
            try {
                const payload = {
                    "rating": formData.rating,
                    "comment": formData.comment
                };
                const res = await fetch(`${endpoint}/${modify}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    const modify = await res.json();
                    console.log(modify)
                    if (showAll) {
                        getfromApi(endpointAll)
                    } else {
                        getfromApi(endpoint)
                    };
                    reviewUpdate();
                    setAlert("Il commento è stato modificato");
                    setTimeout(() => {
                        setAlert("")
                    }, 4000);
                }
            } catch (error) {
                console.error(error)
            }

        } else {
            setAlert("Per commentare ti devi loggare");
            setTimeout(() => {
                setAlert("")
            }, 4000);
            navigate("/logIn")
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token) {
            setToken(token)
        }
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])


    return (
        <>
            <div className='d-flex align-items-center'>
                <div className='me-3'>
                    <img src={user.avatar ? user.avatar : emptyAvatar}
                        alt=""
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%"
                        }} />
                </div>
                <Form>
                    <Form.Select required onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}>
                        <option>Vota il tuo soggiorno</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>

                    <InputGroup className="mb-3">
                        <Form.Control
                            required
                            aria-label="Default"
                            value={formData.comment}
                            onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                        />
                    </InputGroup>
                    {modify ?
                        <Button type='submit' variant='outline-dark' onClick={(event) => handleModify(event)}>Modifica recensione</Button>
                        :
                        <Button type='submit' variant='outline-dark' onClick={(event) => createReview(event)}>Nuova recensione</Button>
                    }
                </Form>
            </div>
        </>
    )
}
