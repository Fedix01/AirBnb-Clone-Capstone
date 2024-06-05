import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function FavoritesArea(props) {

    const { title, address, category, hostType, cover } = props;

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={cover} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <h5>{address}</h5>
                <h5>{category}</h5>
                <h5>{hostType}</h5>

                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>

    )
}
