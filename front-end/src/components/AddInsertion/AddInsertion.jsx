import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { MdOutlineBedroomChild } from "react-icons/md";
import { MdOutlineBathroom } from "react-icons/md";
import { MdOutlineOtherHouses } from "react-icons/md";
import { AlertContext } from '../AlertProvider/AlertProvider';

export default function AddInsertion({ mod, setKey, setMod }) {

    const endpoint = "http://localhost:3001/api/insertion";

    const { setAlert } = useContext(AlertContext);

    const token = localStorage.getItem("token");

    const [validated, setValidated] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        hostType: "",
        category: "",
        address: "",
        details: "",
        covers: null,
        price: "",
        place: "",
        roomDetails: "",
        bathDetails: "",
        other: "",
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        if (mod) {
            modifyInsertion(mod)
        } else {
            createInsertion()
        }
    };

    const createInsertion = async () => {
        try {
            const payload = {
                "title": formData.title,
                "hostType": formData.hostType,
                "category": formData.category,
                "address": formData.address,
                "details": formData.details,
                "price": formData.price,
                "place": formData.place,
                "services": {
                    "roomDetails": formData.roomDetails,
                    "bathDetails": formData.bathDetails,
                    "other": formData.other
                }
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
                const newInsertion = await res.json();
                const formDataFile = new FormData();
                console.log(formData.covers);
                Object.keys(formData.covers).forEach(key => {

                    formDataFile.append("covers[]", formData.covers[key]);
                })
                const patch = await fetch(`${endpoint}/${newInsertion._id}/covers`, {
                    method: "PATCH",
                    body: formDataFile
                });
                if (patch.ok) {
                    const created = await patch.json();
                    console.log(created);
                    setAlert("Nuova inserzione aggiunta");
                    setTimeout(() => {
                        setAlert("")
                    }, 4000);
                    setKey("myInsertions")
                }
            }
        } catch (error) {
            console.error(error);
            setAlert("Errore");
            setTimeout(() => {
                setAlert("")
            }, 4000);
        }
    }


    const modifyInsertion = async (id) => {
        try {
            const payload = {
                "title": formData.title,
                "hostType": formData.hostType,
                "category": formData.category,
                "address": formData.address,
                "details": formData.details,
                "price": formData.price,
                "place": formData.place,
                "services": {
                    "roomDetails": formData.roomDetails,
                    "bathDetails": formData.bathDetails,
                    "other": formData.other
                }
            };
            const res = await fetch(`${endpoint}/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const modify = await res.json();
                const formDataFile = new FormData();
                formDataFile.append("cover", formData.cover);
                const patch = await fetch(`${endpoint}/${modify._id}/cover`, {
                    method: "PATCH",
                    body: formDataFile
                });
                if (patch.ok) {
                    const newInsertion = await patch.json();
                    console.log(newInsertion);
                    setAlert("Inserzione modificata!");
                    setTimeout(() => {
                        setAlert("")
                    }, 4000);
                    setKey("myInsertions")
                }
            }
        } catch (error) {
            console.error(error);
            setAlert("Errore nella modifica");
            setTimeout(() => {
                setAlert("")
            }, 4000);
        }
    }

    return (
        <>
            <div>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <h2>{mod ? "Modifica l'inserzione" : "Aggiungi una nuova Inserzione"}</h2>
                        <Col md={6}>


                            <Form.Group controlId="title" className='p-2'>
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder='Inserisci nome della struttura'
                                />
                                <Form.Control.Feedback type="invalid">
                                    Inserisci un indirizzo valido
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="hostType" className='p-2'>
                                <Form.Label>Tipo di Host</Form.Label>

                                <select className='form form-control' required placeholder='Inserisci che tipo di Host sei' value={formData.hostType}
                                    onChange={(e) => setFormData({ ...formData, hostType: e.target.value })} >
                                    <option value="">Scegli</option>
                                    <option value="Host professionista">Host professionista</option>
                                    <option value="Host privato">Host privato</option>
                                </select>

                            </Form.Group>

                            <Form.Group controlId="category" className='p-2'>
                                <Form.Label>Categoria</Form.Label>

                                <select className='form form-control' required placeholder='Inserisci una categoria' value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })} >
                                    <option value="">Scegli</option>
                                    <option value="Lago">Lago</option>
                                    <option value="Piscina">Piscina</option>
                                    <option value="Baita">Baita</option>
                                    <option value="Agriturismo">Agriturismo</option>
                                    <option value="Hotel">Hotel</option>
                                    <option value="Appartamento">Appartamento</option>
                                    <option value="Lusso">Lusso</option>
                                    <option value="Isola">Isola</option>
                                    <option value="B&B">B&B</option>
                                    <option value="Capanna">Capanna</option>
                                </select>

                            </Form.Group>


                            <Form.Group controlId="address" className='p-2'>
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
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="details" className='p-2'>
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


                            <Form.Group controlId="cover" className='p-2'>
                                <Form.Label>Foto</Form.Label>
                                <Form.Control
                                    required
                                    multiple
                                    type="file"
                                    onChange={(e) => setFormData({ ...formData, covers: e.target.files })}

                                />
                                <Form.Control.Feedback type="invalid">
                                    Inserisci foto valide
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Perfetto!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="price" className='p-2'>
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

                            <Form.Group controlId="place" className='p-2'>
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
                        </Col>
                    </Row>
                    <Row>
                        <h3 className='mt-2'>Servizi</h3>
                        <Col md={6}>
                            <Form.Group controlId="room" className='p-2'>
                                <MdOutlineBedroomChild />
                                <Form.Control
                                    type="text"
                                    value={formData.roomDetails}
                                    onChange={(e) => setFormData({ ...formData, roomDetails: e.target.value })}
                                    placeholder='Inserisci i dettagli della camera e il numero di camere'
                                />

                            </Form.Group>

                            <Form.Group controlId="bath" className='p-2'>
                                <MdOutlineBathroom />
                                <Form.Control
                                    type="text"
                                    value={formData.bathDetails}
                                    onChange={(e) => setFormData({ ...formData, bathDetails: e.target.value })}
                                    placeholder='Inserisci i dettagli del bagno e il numero di bagni'
                                />

                            </Form.Group>


                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="other" className='p-2'>
                                <MdOutlineOtherHouses />
                                <Form.Control
                                    type="text"
                                    value={formData.other}
                                    onChange={(e) => setFormData({ ...formData, other: e.target.value })}
                                    placeholder='Inserisci altri dettagli dei servizi'
                                />

                            </Form.Group>

                        </Col>

                    </Row>
                    {mod ?
                        <>
                            <div className='mt-3'>
                                <Button variant='primary' type='submit'>Modifica inserzione</Button>
                                <span className='mx-2'>oppure</span>
                                <Button variant='outline-secondary' onClick={() => setMod("")}>Aggiungi nuova nserzione</Button>
                            </div>
                        </>
                        :
                        <Button className='mt-3' variant='primary' type='submit'>Aggiungi Inserzione</Button>
                    }
                </Form>
            </div>
        </>
    )
}
