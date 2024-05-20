import React, { useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import './HostDashboard.css';

export default function HostDashboard() {

    const [key, setKey] = useState("");

    const [validated, setValidated] = useState(false);

    const [formData, setFormData] = useState({
        category: "",
        address: "",
        details: "",
        cover: null,
        price: "",
        place: "",
        availability: false,
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        // handleSignIn()
    };

    return (
        <>
            <MyNavbar />

            <Row>
                <Col md={4}>
                    <div className='tabs-wrap mx-5 p-4'>
                        <div>
                            <Button variant='transparent' className='ms-3 p-3' onClick={() => setKey("myInsertion")}><b>Le mie Inserzioni</b></Button>
                        </div>
                        <div>
                            <Button variant='transparent' className='ms-3 p-3' onClick={() => setKey("addNew")}><b>Aggiungi Inserzione</b></Button>
                        </div>
                    </div>
                </Col>
                <Col md={8}>
                    {key === "addNew" &&
                        <>
                            <div>
                                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                    <Form.Group controlId="category">
                                        <Form.Label>Categoria</Form.Label>

                                        <select className='form form-control' required placeholder='Inserisci una categoria' value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })} >
                                            <option value="">Scegli</option>
                                            <option value="minuti">Minuti</option>
                                            <option value="ore">Ore</option>
                                        </select>

                                    </Form.Group>

                                    <Form.Group controlId="address">
                                        <Form.Label>Indirizzo</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder='Inserisci indirizzo'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci un indirizzo valido
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="details">
                                        <Form.Label>Dettagli</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={formData.details}
                                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                                            placeholder='Inserisci i dettagli'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci dettagli validi
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Ottimo!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="cover">
                                        <Form.Label>Foto</Form.Label>
                                        <Form.Control
                                            required
                                            type="file"
                                            multiple
                                            onChange={(e) => setFormData({ ...formData, cover: e.target.files })}

                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci foto valide
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="price">
                                        <Form.Label>Prezzo</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            placeholder='Inserisci il prezzo per notte'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci un prezzo valido
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group controlId="place">
                                        <Form.Label>Luogo</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            value={formData.place}
                                            onChange={(e) => setFormData({ ...formData, place: e.target.value })}
                                            placeholder='Inserisci il luogo'
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Inserisci un luogo valido
                                        </Form.Control.Feedback>
                                        <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Check
                                            label='Disponibilità'
                                            value={formData.availability}
                                            onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                                        />
                                    </Form.Group>
                                    <Button variant='primary' type='submit'>Aggiungi Inserzione</Button>
                                </Form>
                            </div>
                        </>}
                </Col>
            </Row>
        </>
    )
}
