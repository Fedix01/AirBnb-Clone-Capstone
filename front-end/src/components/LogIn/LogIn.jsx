import React, { useContext, useEffect, useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar'
import Form from 'react-bootstrap/Form';
import './LogIn.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertProvider/AlertProvider';
import { searchBarContext } from '../SearchBarProvider/SearchBarProvider';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import { FooterContext } from '../FooterProvider/FooterProvider';
import { FcGoogle } from "react-icons/fc";
import MyFooter from '../MyFooter/MyFooter';
export default function LogIn() {

    const endpoint = "http://localhost:3001/api/user/login"

    const navigate = useNavigate();

    const { setAlert } = useContext(AlertContext);

    const { setToken } = useContext(AuthContext);

    const { setSearchBar } = useContext(searchBarContext);

    const { setShowAllFooter } = useContext(FooterContext);

    const [errorAlert, setErrorAlert] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [validated, setValidated] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        handleLogIn()
    };

    const handleLogIn = async () => {
        try {
            const payload = {
                "email": formData.email,
                "password": formData.password
            };
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)

            });
            if (res.ok) {
                const logIn = await res.json();
                console.log(logIn)
                localStorage.setItem("user", JSON.stringify(logIn.user));
                localStorage.setItem("token", logIn.token);
                setToken(logIn.token);
                navigate("/");
                setAlert("Log in effettuato con successo");
                setTimeout(() => {
                    setAlert("")
                }, 4000);
            } else {
                setErrorAlert(true);
                setTimeout(() => {
                    setErrorAlert(false)
                }, 4000);
            }
        } catch (error) {
            console.error(error);
            setErrorAlert(true);
            setTimeout(() => {
                setErrorAlert(false)
            }, 4000);
        }
    }

    const googleLogin = () => {
        const endpoint = "http://localhost:3001/api/user/googleLogin";
        window.open(endpoint, "_self")
    }

    useEffect(() => {
        setSearchBar(false);
        setShowAllFooter(false);
    }, [])


    return (
        <>
            <MyNavbar />

            <Container>
                <Row>
                    <Col md={12}>
                        <div className='logIn'>
                            <h6 className='header pb-3'>Accedi o registrati</h6>
                            <h3><b>Bentornato su AirBnb</b></h3>
                            <h6 className='my-3'>Sei un Guest?</h6>
                            <Button variant='transparent' className='google-btn p-2 mt-2' onClick={() => googleLogin()}>
                                <FcGoogle />
                                <span className='ms-2'>Accedi con Google</span>
                            </Button>
                            <h6 className='my-3'>oppure</h6>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group controlId="email" className='my-4'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="Inserisci email"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Inserisci una email valida
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Ottimo!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="password" className='my-4'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Inserisci password"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Inserisci una password valida
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                </Form.Group>
                                {errorAlert &&
                                    <Alert variant='danger' style={{ width: "50%" }}>
                                        Email o password errata
                                    </Alert>
                                }

                                <Button className='btn-logIn mt-3' type='submit'>Log In</Button>
                            </Form>
                            <div className='d-flex align-items-center justify-content-center'>
                                <div className='mt-3 ps-3'>Non hai un account?</div>
                                <Button variant='outline' className='signIn-btn mt-3 ms-2' onClick={() => navigate("/signIn")}>Registrati</Button>
                            </div>
                        </div>


                    </Col>
                </Row>
            </Container>

            <MyFooter />
        </>
    )
}
