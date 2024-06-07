import React from 'react';
import './FavoritesArea.css';
import Card from 'react-bootstrap/Card';
import { TiDelete } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

export default function FavoritesArea(props) {

    const { id, title, address, category,
        hostType, cover, reviews, place, price,
        deleteFavorite } = props;

    const navigate = useNavigate();

    return (

        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={cover}
                onClick={() => navigate(`/insertionDetails/${id}`)}
                style={{ cursor: "pointer" }} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <h5>{place}</h5>
                <h6>{reviews.length} recensioni</h6>
                <h6>{hostType}</h6>

                <h5>{price} €</h5>
                <h6>Include tasse e costi</h6>
            </Card.Body>
            <div className='delete' onClick={() => deleteFavorite(id, title)}>
                <TiDelete />
            </div>
        </Card>

    )
}
