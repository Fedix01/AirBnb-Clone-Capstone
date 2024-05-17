import React from 'react'
import MyNavbar from '../MyNavbar/MyNavbar'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './SignIn.css';

export default function SignIn() {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

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

    return (
        <>
            <MyNavbar />


            <div className='signIn'>
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
                            required
                            label="Sei un host?"
                            value={formData.isHost}
                            onChange={(e) => setFormData({ ...formData, isHost: e.target.checked })}
                        />
                    </Form.Group>
                    <Button type="submit">Registrati</Button>
                </Form>
            </div>
        </>
    )
}
