import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import emptyLocation from "../../assets/empty.png";
import './SingleInsertion.css';
import { useNavigate } from 'react-router-dom';
export default function SingleInsertion(props) {

    const { id, covers, price, place, hostType } = props;

    const navigate = useNavigate();

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };


    return (
        <>

            <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>

                {covers &&
                    covers.map((el) => (
                        <Carousel.Item key={el}
                            onClick={() => navigate(`/insertionDetails/${id}`)}
                            style={{ cursor: "pointer" }}>
                            <img src={el}
                                alt=''
                                className='img-insertion'
                            />
                        </Carousel.Item>
                    ))}
                {!covers &&
                    <Carousel.Item>
                        <img src={emptyLocation}
                            alt=''
                            className='img-insertion'
                        />
                    </Carousel.Item>
                }


            </Carousel>

            <div className='info mt-2'>
                <h5 onClick={() => navigate(`/insertionDetails/${id}`)}
                    style={{ cursor: "pointer" }}
                >{place}</h5>
                <h6>{hostType}</h6>
                <h6>25 Maggio - 2 Giugno</h6>
                <h5><b>{price}</b> notte</h5>
            </div>
        </>
    )

}
