import React from 'react';
import { Card } from 'react-bootstrap';

export default function SingleInsertion(props) {

    const { category, address, details, cover, price, availability } = props;
    return (
        <Card className="bg-dark text-white">
            <Card.Img src={cover} alt="Card image" />
            <Card.ImgOverlay>
                <Card.Title>{address}</Card.Title>
                <Card.Text>
                    {details}
                </Card.Text>
                <Card.Text>{price} notte</Card.Text>
            </Card.ImgOverlay>
        </Card>
    )
}
