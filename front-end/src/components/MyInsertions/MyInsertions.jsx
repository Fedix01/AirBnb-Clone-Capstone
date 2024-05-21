import React, { useContext, useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './MyInsertion.css';
import Button from 'react-bootstrap/esm/Button';
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { AlertContext } from '../AlertProvider/AlertProvider';

export default function MyInsertions() {

    const endpoint = "http://localhost:3001/api/insertion";

    const [data, setData] = useState([]);

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
            <h2>Le tue Inserzioni</h2>
            <Table striped bordered hover>
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
                                    <img src={el.cover} alt=""
                                        className='img-fluid'
                                        style={{ height: "130px" }} />
                                </td>
                                <td>{el.place}</td>
                                <td>{el.price}</td>
                                <td>
                                    <Button variant='transparent'>
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
