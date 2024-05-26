import React from 'react';
import Container from 'react-bootstrap/Container';
import notFoundImage from "../../assets/notFoundImage.jpeg";


export default function NotFound() {
    return (
        <Container style={{ marginTop: "30vh" }}>
            <div className='d-flex'>
                <div>
                    <img src={notFoundImage} alt="" />
                </div>
                <div>
                    <h2>Error 404 Page Not Found</h2>
                    <ul>
                        <li>A misspelled URL</li>
                        <li>The page has been moved or deleted and there's no redirect set up</li>
                        <li>The URL wasn't correct when it was originally set up or it was linked incorretly</li>
                        <li>The server malfunctioned or has been shut down</li>
                    </ul>
                </div>
            </div>
        </Container>
    )
}
