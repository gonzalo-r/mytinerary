import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {Link as LinkRouter} from "react-router-dom";
import "../styles/citiesCards.css"

 
export default function CitiesCards(props) {
    
  return (
    <Card id="detallecard"  sx={{ maxWidth: 345, }}>
      <CardActionArea id="card1">
        <CardMedia
          component="img"
          height="140"
         img src={process.env.PUBLIC_URL + `./imagenes/${props.image}`} alt="city" className='img-fluid' 
        />
        <CardContent id="textcard">
          <Typography className="title" gutterBottom variant="h5" component="div">
          {props.title}
          </Typography>
      {/*     <Typography variant="body2" color="text.secondary">
           <p>descripcion  </p>
          </Typography> */}
        </CardContent>
      </CardActionArea>

      <CardActions id="more">
       <LinkRouter  to ={`/CityDetail/${props.id}`}>
       
        <Button size="small" color="primary" >
          More
        </Button>
       </LinkRouter> 
      
      </CardActions>
    </Card>
  );
}