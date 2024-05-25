import React from 'react';
import { FaRegHeart } from "react-icons/fa6";
import { IoShareOutline } from "react-icons/io5";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import emptyLocation from "../../assets/empty.png";


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
                    <img src={covers[0] ? covers[0] : emptyLocation}
                        className='img-fluid'
                        alt=""

                        style={{
                            borderTopLeftRadius: "15px",
                            borderBottomLeftRadius: "15px",
                            minHeight: "440px"
                        }}
                    />
                </Col>
                <Col md={6}>
                    <div className='d-flex mb-2'>
                        <img src={covers[1] ? covers[1] : emptyLocation} className='me-2'
                            alt=""
                            style={{ height: "210px", width: "270px" }} />
                        <img src={covers[2] ? covers[2] : emptyLocation}
                            alt=""
                            style={{ height: "210px", width: "270px", borderTopRightRadius: "15px" }} />
                    </div>
                    <div className='d-flex'>
                        <img src={covers[3] ? covers[3] : emptyLocation}
                            className='me-2'
                            style={{ height: "210px", width: "270px" }}
                            alt="" />
                        <img src={covers[4] ? covers[4] : emptyLocation}
                            style={{ height: "210px", width: "270px", borderBottomRightRadius: "15px" }}
                            alt="" />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
