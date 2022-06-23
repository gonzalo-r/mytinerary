import React from 'react';
import CardDetail from './CardDetail'
import Hero from '../../img/hombretravel.svg';
import { Link as LinkRouter } from "react-router-dom";
const ItineraryItem = ({ itineraries, reload, setReload }) => {
  if (itineraries.length === 0) {
    return (
      <div className="no-hay-itinerario">
        <img src={Hero} alt='hero' id='hero' />
        <h1 className="rs">We still do not have guides in this city, we are looking for!</h1>
        <LinkRouter to={`/cities`} className="btc back nocity" >
          Back to cities!
        </LinkRouter>
      </div>

    )
  }
  return (<>
    {itineraries.map((data, index) => <CardDetail  itineraryId={data._id} data={data} key={index} reload={reload} setReload={setReload}/>)}
    <div className="back-container">
      <LinkRouter to={`/cities`} className="btc back">
        Back to cities!
      </LinkRouter>
    </div>
  </>
  )
}

export default ItineraryItem;