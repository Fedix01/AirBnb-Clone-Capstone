import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import emptyLocation from "../../assets/empty.png";
import './SingleInsertion.css';
export default function SingleInsertion(props) {

    const { cover, price, place, hostType } = props;

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };


    return (
        <>

            <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                <Carousel.Item>
                    <img src={cover ? cover : emptyLocation}
                        alt=''
                        className='img-insertion'
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='img-insertion'
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className='img-insertion'
                    />

                </Carousel.Item>
            </Carousel>

            <div className='info mt-2'>
                <h5>{place}</h5>
                <h6>{hostType}</h6>
                <h6>25 Maggio - 2 Giugno</h6>
                <h5><b>{price}</b> notte</h5>
            </div>
        </>
    )

}
