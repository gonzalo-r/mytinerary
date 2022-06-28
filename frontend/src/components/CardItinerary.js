import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
//import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
//import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../styles/cardItinera.css";
import usd from "../img/usd.png";


  

const CardItinerary = (props) => {
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
   
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
     
  let billete=[];
  for (let num of props.price){
   if(num !==0){
     billete.push(<img src={usd} alt='price' id='usd'/>);
   };
   console.log(billete)
  }

        return (
        
          <Card className='itineraries' sx={{ maxWidth: 345,textAlign: 'center', display: 'flex', flexDirection: 'column',justifyContent: 'space-between', alignItems: 'center',margin: '1rem' }}>
            <CardHeader 
            /*   avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              } */
              /* action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              } */
             title={props.name}
          
            />
            <CardMedia
              component="img"
              height="194"
              image={props.userimage}
              alt="Paella dish"
              
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
              {props.activities}
              </Typography>
            </CardContent>
            <CardActions id="cardAction" disableSpacing >
              <IconButton aria-label="add to favorites" sx={{width:"50%"}}>
                <FavoriteIcon />
              </IconButton>
              <IconButton sx={{width:"50%"}} >
                <ShareIcon />
              </IconButton>
              <ExpandMore sx={{width:"50%"}}
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent >
               <CardContent></CardContent>             
                 <Typography paragraph>USERNAME:  {props.username}</Typography>
                <Typography paragraph>HASHTAG: {props.hashtag}</Typography>             
                <Typography paragraph>DURATION:    {props.duration}</Typography>             
                <Typography sx={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center'}} paragraph>PRICE: {billete}
               {/*  {billete.map((bille, index) => <span key={index}>{bille}</span>)} */}
                </Typography>                
              </CardContent>
            </Collapse>
          </Card>
          
        );

    
   
    
}
 
export default CardItinerary;

 

/* import React from 'react';
import { Link as LinkRouter } from "react-router-dom";
import itinerariesActions from '../redux/actions/itinerariesActions';
import {useSelector, useDispatch} from "react-redux"



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

export default ItineraryItem; */