import React, { useContext, useEffect, useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './HostDashboard.css';
import AddInsertion from '../AddInsertion/AddInsertion';
import MyInsertions from '../MyInsertions/MyInsertions';
import { searchBarContext } from '../SearchBarProvider/SearchBarProvider';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';


export default function HostDashboard() {

    const [key, setKey] = useState("");

    const [mod, setMod] = useState("");


    const { setToken } = useContext(AuthContext);

    const { setSearchBar } = useContext(searchBarContext);

    useEffect(() => {
        setKey("myInsertions")
    }, [])

    useEffect(() => {
        setSearchBar(false)
    }, [])


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {

            setToken(token)
        }
    }, [])


    return (
        <>
            <MyNavbar />

            <Row>
                <Col md={4}>
                    <div className='tabs-wrap mx-5 p-4'>
                        <div>
                            <Button variant='transparent' className='ms-3 p-3' onClick={() => setKey("myInsertions")}><b>Le mie Inserzioni</b></Button>
                        </div>
                        <div>
                            <Button variant='transparent' className='ms-3 p-3' onClick={() => setKey("addNew")}><b>Aggiungi Inserzione</b></Button>
                        </div>
                    </div>
                </Col>
                <Col md={8}>
                    {key === "addNew" &&
                        <AddInsertion mod={mod} setKey={setKey} setMod={setMod} />}
                    {key === "myInsertions" &&
                        <>
                            <div className='mx-5'>
                                <MyInsertions setMod={setMod} setKey={setKey} />
                            </div>
                        </>

                    }


                </Col>
            </Row>
        </>
    )
}
