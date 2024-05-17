import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SingleInsertion from '../SingleInsertion/SingleInsertion';

export default function AllInsertions({ data }) {




    return (
        <Row className='mx-5'>
            {data &&
                data.map((el) => (
                    <Col md={2} key={el._id}>
                        <SingleInsertion
                            key={el._id}
                            category={el.category}
                            address={el.address}
                            details={el.details}
                            cover={el.cover}
                            price={el.price}
                            availability={el.availability}
                            place={el.place} />
                    </Col>
                ))}
        </Row>
    )
}
