import React, { useContext } from 'react';
import './MyFooter.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";
import { FaEuroSign } from "react-icons/fa";
import { FooterContext } from '../FooterProvider/FooterProvider';
import { useNavigate } from 'react-router-dom';

export default function MyFooter() {

    const { showAllFooter } = useContext(FooterContext);

    const navigate = useNavigate();

    return (
        <>
            {showAllFooter &&
                <div className='footer-box mt-5'>
                    <Container>
                        <footer className="py-5">
                            <Row>
                                <Col sm={6} md={4} className='mb-3'>
                                    <h5>Assistenza</h5>
                                    <ul className="nav flex-column">
                                        <li className="nav-item mb-2">Home</li>
                                        <li className="nav-item mb-2">Features</li>
                                        <li className="nav-item mb-2">Pricing</li>
                                        <li className="nav-item mb-2">FAQs</li>
                                        <li className="nav-item mb-2">About</li>
                                    </ul>
                                </Col>

                                <Col sm={6} md={4} className='mb-3'>
                                    <h5>Ospitare</h5>
                                    <ul className="nav flex-column">
                                        <li className="nav-item mb-2">Home</li>
                                        <li className="nav-item mb-2">Features</li>
                                        <li className="nav-item mb-2">Pricing</li>
                                        <li className="nav-item mb-2">FAQs</li>
                                        <li className="nav-item mb-2">About</li>
                                    </ul>
                                </Col>

                                <Col sm={6} md={4} className='mb-3'>
                                    <h5>Airbnb</h5>
                                    <ul className="nav flex-column">
                                        <li className="nav-item mb-2">Home</li>
                                        <li className="nav-item mb-2">Features</li>
                                        <li className="nav-item mb-2">Pricing</li>
                                        <li className="nav-item mb-2">FAQs</li>
                                        <li className="nav-item mb-2">About</li>
                                    </ul>
                                </Col>


                            </Row>

                            <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
                                <p>© 2022 Company, Inc. All rights reserved.</p>
                                <div className='d-flex mx-3'>
                                    <div className='mx-2'>
                                        <RiGlobalLine className='mx-2' />
                                        <span>Italiano (IT)</span>
                                    </div>
                                    <div className='mx-2'>
                                        <FaEuroSign className='mx-2' />
                                        <span>Eur</span>
                                    </div>
                                    <div className='d-flex social'>
                                        <FaFacebookSquare className='mx-2' />
                                        <FaTwitterSquare className='mx-2' />
                                        <FaInstagramSquare className='mx-2' />
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </Container>
                </div>
            }

            {!showAllFooter &&
                <div className='mx-5'>
                    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                        <p className="col-md-4 mb-0 text-muted">© 2024 Airbnb, Inc</p>

                        <div className="nav col-md-4 justify-content-end">
                            <Button variant='transparent' className='mx-3' onClick={() => navigate("/")}>Home</Button>
                            <Button variant='transparent' className='mx-3' onClick={() => navigate("/me")}>Il mio profilo</Button>
                            <Button variant='transparent' className='mx-3' onClick={() => navigate("/signIn")}>Registrati</Button>
                        </div>

                    </footer>
                </div>
            }
        </>
    )
}
