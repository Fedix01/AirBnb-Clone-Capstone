import React from 'react';
import { Button } from 'react-bootstrap';
import { PiFarm } from "react-icons/pi";
import "./Category.css";
export default function Category() {
    return (
        <div className='d-flex category-container m-5'>
            <Button variant='transparent' className='mx-2'>
                <PiFarm />
                <h6>Agriturismo</h6>
            </Button>
            <Button variant='transparent' className='mx-2'>
                <PiFarm />
                <h6>Agriturismo</h6>
            </Button>
            <Button variant='transparent' className='mx-2'>
                <PiFarm />
                <h6>Agriturismo</h6>
            </Button>
            <Button variant='transparent' className='mx-2'>
                <PiFarm />
                <h6>Agriturismo</h6>
            </Button>
            <Button variant='transparent' className='mx-2'>
                <PiFarm />
                <h6>Agriturismo</h6>
            </Button>
            <Button variant='transparent' className='mx-2'>
                <PiFarm />
                <h6>Agriturismo</h6>
            </Button>
        </div>
    )
}
