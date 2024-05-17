import React from 'react';
import Card from 'react-bootstrap/Card';
import './SingleInsertion.css';
export default function SingleInsertion(props) {

    const { category, address, details, cover, price, availability, place } = props;
    return (
        <Card style={{ border: "none" }}>
            <Card.Img variant="top" src={cover}
                alt=""
                style={{ height: "250px", borderRadius: "15px" }}
            />
            <Card.Body className='info'>
                <h5>{place}</h5>
                <h6> Host privato</h6>
                <h6>25 maggio - 2 Giugno</h6>
                <h5><b>{price} </b>notte</h5>
            </Card.Body>
        </Card>
    )

}
