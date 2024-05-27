import React from 'react'
import { useLocation } from 'react-router-dom'

export default function BookingInfo() {

    const location = useLocation();
    const { bookings } = location.state;

    return (
        <div>
            <h4>Dettagli prenotazione</h4>

            <div>
                {bookings.map((el) => (

                    <div key={el._id}>
                        <h5>Check In : {el.checkInDate}</h5>
                        <h5>Check Out : {el.checkOutDate}</h5>
                        <h5>Ospiti : {el.guestNum}</h5>
                    </div>

                )

                )}
            </div>
        </div>
    )
}
