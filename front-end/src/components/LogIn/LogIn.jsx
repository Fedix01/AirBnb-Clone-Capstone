import React, { useContext, useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar'
import Form from 'react-bootstrap/Form';
import './LogIn.css';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertProvider/AlertProvider';
export default function LogIn() {

    const endpoint = "http://localhost:3001/api/user/login"

    const navigate = useNavigate();
    const { setAlert } = useContext(AlertContext);

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

    return (
        <>
            <MyNavbar />

            <div className='logIn'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
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

                    <Form.Group controlId="password">
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

                    <Button variant='primary' type='submit'>Log In</Button>
                </Form>
            </div>
        </>
    )
}
