import React, {useEffect, useState} from 'react';
import { Card, Jumbotron, Button, Container, Col, Row } from 'react-bootstrap';

function CryptoExchange(props) {
    const [name, setName] = useState(props.name);

    // const bgStyle = {border: '2px solid green', width:'40%', listStyleType:'none'}
    const bgStyle = {background: 'green'}

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
        <Card style={{ padding:'10px', textAlign: 'center', width: '250px' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <h3>{props.name}</h3>
            <Card.Body style={bg}>
                {/* <Card.Title>market</Card.Title> */}
                <Card.Text>
                    {Number(props.data.bid).toFixed(4)} - {Number(props.data.ask).toFixed(4)}
                    <li>Close: {Number(props.data.close).toFixed(4)}</li>
                    
                </Card.Text>
                <Button variant="primary">Goto exchange</Button>
            </Card.Body>
        </Card>
    </>
}


export default CryptoExchange;