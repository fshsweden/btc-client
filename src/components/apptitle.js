import React, {useEffect, useState} from 'react';
import { Collapse, Card, Jumbotron, Button, Container, Col, Row } from 'react-bootstrap';

// import "./cryptoexchange.css"

function AppTitle(props) {
    const [name, setName] = useState(props.name);
    const [open, setOpen] = useState(false);

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
        <div className="">
        <div className="title">{props.name}</div>
        </div>
    </>
}


export default CryptoExchange;