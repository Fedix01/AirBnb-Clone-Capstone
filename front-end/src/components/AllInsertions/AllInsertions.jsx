import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleInsertion from '../SingleInsertion/SingleInsertion';
import Button from 'react-bootstrap/Button'

export default function AllInsertions({ data, setPage, page }) {




    return (
        <>
            <Row className='mx-5'>
                {data &&
                    data.map((el) => (
                        <Col md={2} key={el._id}>
                            <SingleInsertion
                                key={el._id}
                                hostType={el.hostType}
                                covers={el.covers}
                                price={el.price}
                                place={el.place} />
                        </Col>
                    ))}
            </Row>
            <div className='d-flex justify-content-center'>
                <Button variant='secondary' onClick={() => setPage(page + 1)}>Carica altro...</Button>
            </div>
        </>
    )
}
