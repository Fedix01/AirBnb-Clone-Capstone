import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InsertionDetailsPage from '../InsertionDetailsPage/InsertionDetailsPage';
import MyNavbar from '../MyNavbar/MyNavbar';
import Container from 'react-bootstrap/Container';
import emptyAvatar from "../../assets/avatar.png";
import { searchBarContext } from '../SearchBarProvider/SearchBarProvider';
import MyFooter from '../MyFooter/MyFooter';
import { FooterContext } from '../FooterProvider/FooterProvider';


export default function InsertionDetails() {

    const params = useParams();

    const [data, setData] = useState({});

    const { setSearchBar } = useContext(searchBarContext);

    const { setShowAllFooter } = useContext(FooterContext);

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

    const reviewUpdate = () => {
        getfromApi()
    }

    useEffect(() => {
        getfromApi()
    }, [])

    useEffect(() => {
        setSearchBar(false);
        setShowAllFooter(true)
    }, [])


    return (
        <>
            <MyNavbar />
            <Container>

                {data &&
                    <InsertionDetailsPage key={data._id}
                        id={data._id}
                        title={data.title}
                        reviews={data.reviews ? data.reviews : "Nessuna recensione"}
                        category={data.category}
                        address={data.address}
                        covers={data.covers}
                        details={data.details}
                        hostType={data.hostType}
                        place={data.place}
                        price={data.price}
                        services={data.services}
                        hostAvatar={data.user ? data.user.avatar : emptyAvatar}
                        hostName={data.user ? data.user.name : "Nessun nome"}
                        hostSurname={data.user ? data.user.surname : "Nessun cognome"}
                        insertions={data.user ? data.user.insertions : "0"}
                        hostCreatedAt={data.user ? data.user.createdAt : ""}
                        hostBirthday={data.user ? data.user.birthday : ""}
                        checkInRule={data.houseRules ? data.houseRules.checkInRule : ""}
                        checkOutRule={data.houseRules ? data.houseRules.checkOutRule : ""}
                        petsRule={data.houseRules ? data.houseRules.petsRule : ""}
                        reviewUpdate={reviewUpdate}
                    />
                }

            </Container>

            <MyFooter />
        </>

    )
}
