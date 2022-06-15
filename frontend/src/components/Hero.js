import React from 'react';
import{Link as LinkRouter} from "react-router-dom";
import "../styles/hero.css"

export default function Hero() {
  return(
    <div id="aventur">

    <p >Your adventure starts here...
 </p>
<div id="call">
   <LinkRouter to = "/Cities">

 <button id="here"> Click here </button>
     </LinkRouter>
     </div>

</div>
)
}
