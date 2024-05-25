import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InsertionDetailsPage from '../InsertionDetailsPage/InsertionDetailsPage';
import MyNavbar from '../MyNavbar/MyNavbar';
import Container from 'react-bootstrap/Container';

export default function InsertionDetails() {

    const params = useParams();

    const [data, setData] = useState({});

    const endpoint = `http://localhost:3001/api/insertion/${params.id}`;

    const getfromApi = async () => {
        try {
            const response = await fetch(endpoint);
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setData(result)

            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        getfromApi()
    }, [])


    return (
        <>
            <MyNavbar />
            <Container>

                {data &&
                    <InsertionDetailsPage key={data._id}
                        title={data.title}
                        category={data.category}
                        address={data.address}
                        covers={data.covers}
                        details={data.details}
                        hostType={data.hostType}
                        place={data.place}
                        price={data.price}
                        services={data.services}
                        hostAvatar={data.user.avatar}
                        hostName={data.user.name}
                        hostSurname={data.user.surname} />
                }

            </Container>
        </>

    )
}
