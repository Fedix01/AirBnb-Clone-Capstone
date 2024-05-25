import React from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function InsertionDetailsPage(props) {

    const { title, address, category, covers, details,
        hostType, place, price, services,
        hostAvatar, hostName, hostSurname } = props;
    return (
        <div className='mx-3'>
            <div className='d-flex justify-content-between'>
                <div>
                    <h3>{title}</h3>
                </div>
                <div className='d-flex'>
                    <div className='mx-2'>
                        <IoShareOutline className='me-2' />
                        <span>Condividi</span>
                    </div>
                    <div className='mx-2'>
                        <FaRegHeart className='me-2' />
                        <span>Salva</span>
                    </div>
                </div>
            </div>
            <Row>
                <Col md={6}>
                    <img src={covers[0]}
                        alt=""
                        height={"300px"} />
                </Col>
                <Col>

                </Col>
            </Row>
        </div>
    )
}
