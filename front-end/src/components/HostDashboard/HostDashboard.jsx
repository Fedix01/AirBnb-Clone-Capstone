import React, { useState } from 'react'
import MyNavbar from '../MyNavbar/MyNavbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './HostDashboard.css';
import AddInsertion from '../AddInsertion/AddInsertion';
import MyInsertions from '../MyInsertions/MyInsertions';


export default function HostDashboard() {

    const [key, setKey] = useState("");



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
                        <AddInsertion />}
                    {key === "myInsertions" &&
                        <>
                            <div className='mx-5'>
                                <MyInsertions />
                            </div>
                        </>

                    }


                </Col>
            </Row>
        </>
    )
}
