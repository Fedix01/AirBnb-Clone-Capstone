import React, { useContext, useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../AlertProvider/AlertProvider';

export default function SignIn() {

    const endpoint = "http://localhost:3001/api/user"

    const navigate = useNavigate();
    const { setAlert } = useContext(AlertContext)

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        surname: '',
        date: '',
        avatar: null,
        isHost: false
    });

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        handleSignIn()
    };

    const handleSignIn = async () => {
        try {
            const payload = {
                "name": formData.name,
                "surname": formData.surname,
                "email": formData.email,
                "username": formData.username,
                "password": formData.password,
                "birthday": formData.date,
                "isHost": formData.isHost
            }


            const res = await fetch(`${endpoint}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const register = await res.json();
                console.log(register)
                if (formData.avatar) {
                    const formDataFile = new FormData();
                    formDataFile.append("avatar", formData.avatar);
                    const patch = await fetch(`${endpoint}/${register.user._id}/avatar`, {
                        method: "PATCH",
                        body: formDataFile
                    });
                    if (patch.ok) {
                        const newUser = await patch.json();
                        console.log(newUser);
                        localStorage.setItem("user", JSON.stringify(newUser.user));
                        localStorage.setItem("token", newUser.token);
                        navigate("/");
                        setAlert(`Benvenuto ${newUser.user.name}`);
                        setTimeout(() => {
                            setAlert("")
                        }, 4000);
                    } else {
                        console.error("Errore durante la richiesta PATCH per l'avatar");
                    }

                } else {
                    localStorage.setItem("user", JSON.stringify(register.user));
                    localStorage.setItem("token", register.token);
                    navigate("/");
                    setAlert(`Benvenuto ${register.user.name}`);
                    setTimeout(() => {
                        setAlert("")
                    }, 4000);
                }
            }
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <>
            <MyNavbar />


            <div className='signIn'>
                <h6 className='header pb-3'>Accedi o registrati</h6>
                <h3><b>Benvenuto su AirBnb</b></h3>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Inserisci nome"
                        />
                        <Form.Control.Feedback type="invalid">
                            Inserisci un Nome valido
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="surname">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={formData.surname}
                            onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                            placeholder="Inserisci cognome"
                        />
                        <Form.Control.Feedback type="invalid">
                            Inserisci un Cognome valido...
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                    </Form.Group>
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
                            Inserisci un email valida...
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Inserisci un username valido
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Ottimo!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="birthday">
                        <Form.Label>Data di nascita</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            placeholder="Data di nascita"
                        />
                        <Form.Control.Feedback type="invalid">
                            Inserisci una data
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Ci sei quasi!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="Inserisci la password"
                        />
                        <Form.Control.Feedback type="invalid">
                            Inserisci una password valida
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Sicura!</Form.Control.Feedback>
                    </Form.Group>


                    <Form.Group controlId="avatar">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => setFormData({ ...formData, avatar: e.target.files[0] })}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check

                            label="Sei un host?"
                            value={formData.isHost}
                            onChange={(e) => setFormData({ ...formData, isHost: e.target.checked })}
                        />
                    </Form.Group>
                    <Button className='btn-signIn mt-3' type="submit">Registrati</Button>
                </Form>
                <div className='d-flex align-items-center justify-content-center'>
                    <div className='mt-3 ps-3'>Hai già un account?</div>
                    <Button variant='outline' className='logIn-btn mt-3 ms-2' onClick={() => navigate("/logIn")}>Log In</Button>
                </div>
            </div>
        </>
    )
}
