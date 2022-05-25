import React, {useEffect, useState} from 'react';
import { Card, Jumbotron, Button, Container, Col, Row } from 'react-bootstrap';

import "./cryptoexchange.css"

function CryptoExchange(props) {
    const [name, setName] = useState(props.name);

    let bg = {background: 'white'};

    if (props.data.bid > props.data.ask) {
        bg = {background: 'red'};
    }

    if (props.data.bid === props.bestBid) {
        bg = {background: 'cyan'};
    }
    else if (props.data.ask === props.bestAsk) {
        bg = {background: 'green'};
    }

    // More status colors here.............

    return <>
        <Card style={{ ...bg, padding:'10px', textAlign: 'center', width: '350px' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <h3>{props.name}</h3>
            <Card.Body>
                {/* <Card.Title>market</Card.Title> */}
                <Card.Text>
                    <div className="bid">{Number(props.data.bid).toFixed(4)}</div> - <div className="ask">{Number(props.data.ask).toFixed(4)}</div>
                    
                    {/* <li>Close: {Number(props.data.close).toFixed(4)}</li> */}
                    
                </Card.Text>
                {/* <Button variant="primary">Goto exchange</Button> */}
            </Card.Body>
        </Card>
    </>
}


export default CryptoExchange;