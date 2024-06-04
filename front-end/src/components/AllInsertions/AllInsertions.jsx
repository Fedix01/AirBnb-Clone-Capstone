import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleInsertion from '../SingleInsertion/SingleInsertion';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export default function AllInsertions({ data, setPage, loading, stopLoad, spinner }) {




    return (
        <>
            <Row className='mx-5'>
                {spinner &&
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                }
                {data &&
                    data.map((el) => (
                        <Col md={2} key={el._id} style={{ position: "relative" }}>

                            <SingleInsertion
                                key={el._id}
                                id={el._id}
                                hostType={el.hostType}
                                covers={el.covers}
                                price={el.price}
                                place={el.place}
                                reviews={el.reviews}
                                hostName={el.user.name}
                                hostSurname={el.user.surname} />
                        </Col>
                    ))}
            </Row>
            <div className='d-flex justify-content-center'>
                {stopLoad ?
                    <h4 className='mt-3'>Non ci sono altri luoghi da mostrare</h4>
                    :
                    <Button variant='dark' onClick={() => setPage(prevPage => prevPage + 1)}>{loading ? "Caricamento" : "Mostra altro"}</Button>
                }
            </div>

        </>
    )
}
