import React, { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './MyInsertion.css';
import Button from 'react-bootstrap/esm/Button';
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { AlertContext } from '../AlertProvider/AlertProvider';
import emptyLocation from "../../assets/empty.png";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



export default function MyInsertions({ setMod, setKey }) {

    const endpoint = "http://localhost:3001/api/insertion";

    const [data, setData] = useState([]);

    const [search, setSearch] = useState("");

    const { setAlert } = useContext(AlertContext);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    const fetchInsertions = async () => {
        try {
            const getInsertion = await fetch(`${endpoint}`)
            if (getInsertion.ok) {
                const res = await getInsertion.json();
                const filter = res.filter((el) => el.user === user._id);
                console.log(filter);
                setData(filter)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const filteredByTitle = () => {
        if (search) {
            const filter = data.filter((el) => el.title.toLowerCase().includes(search.toLowerCase()));
            setData(filter)
        } else {
            fetchInsertions()
        }
    }

    const handleMod = (id) => {
        setMod(id);
        setKey("addNew")
    }

    const deleteInsertion = async (id) => {
        try {
            const del = await fetch(`${endpoint}/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            if (del.ok) {
                const res = await del.json();
                console.log(res);
                setAlert("Inserzione eliminata!");
                setTimeout(() => {
                    setAlert("")
                }, 4000);
                fetchInsertions()
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        console.log(user)
        fetchInsertions()
    }, [])

    return (
        <>
            <h2 className='my-2'>Le tue Inserzioni</h2>

            <InputGroup className="my-3">
                <Form.Control
                    aria-label="Default"
                    placeholder='Cerca per nome'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Button variant='outline-primary' onClick={() => filteredByTitle()}>Cerca</Button>
            </InputGroup>

            <Table hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Annuncio</th>
                        <th>Luogo</th>
                        <th>Prezzo</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((el, index) => (
                            <tr key={el._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className='d-flex'>
                                        <img src={el.cover ? el.cover : emptyLocation} alt=""
                                            className='img-fluid'
                                            style={{ height: "130px", width: "200px" }} />
                                        <div className='ms-3'>
                                            <h3>{el.title}</h3>
                                            <p style={{ color: 'gray' }}>{el.place}</p>
                                        </div>
                                    </div>
                                </td>
                                <td>{el.booking.length !== 0 ? el.booking : "Nessuna prenotazione"}</td>
                                <td>{el.price}</td>
                                <td>
                                    <Button variant='transparent' onClick={() => handleMod(el._id)}>
                                        <GoPencil />
                                    </Button>
                                    <Button variant='transparent' onClick={() => deleteInsertion(el._id)}>
                                        <FaRegTrashAlt />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </>
    )
}