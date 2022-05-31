import React, {useEffect, useState} from 'react';
import { Collapse, Card, Jumbotron, Button, Container, Col, Row } from 'react-bootstrap';

// import "./cryptoexchange.css"

function CryptoExchange(props) {
    const [name, setName] = useState(props.name);
    const [open, setOpen] = useState(false);

    let bg = {background: 'white'};

    // Flag certain markets with colors
    // 
    // if (props.data.bid > props.data.ask) {
    //     bg = {background: 'red'};
    // }

    // if (props.data.bid === props.bestBid) {
    //     bg = {background: 'cyan'};
    // }
    // else if (props.data.ask === props.bestAsk) {
    //     bg = {background: 'green'};
    // }

    return <>
        <Card style={{ ...bg }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}

            <div class="">
            <div class="title">{props.name}</div>
            </div>

            <Card.Body>
                {/* <Card.Title>market</Card.Title> */}
                <Card.Text>
                    
                    <div onClick={() => setOpen(!open)} className="bid">{Number(props.data.bid).toFixed(props.decimals)}</div>
                    <div onClick={() => setOpen(!open)} className="ask">{Number(props.data.ask).toFixed(props.decimals)}</div>
                    <div onClick={() => setOpen(!open)} className="ask">({Number(props.data.ask-props.data.bid).toFixed(props.decimals)})</div>

                    <Collapse in={open}>
                        <div class="text-reveal">
                            lkhl kh jklh jklh klhkljsdfhl khklh klsdfh klsdfhkl h3klhl klhkljsdfhl
                            klhsdfkl hkl sklh sdfklh lksh lkh lkh klsdfh lkh klsdfh
                            klhsdfkl klsdfklh klh klsdfh klh lk k
                        </div>
                    </Collapse> */
                    
                </Card.Text>
                {/* <Button variant="primary">Goto exchange</Button> */}
            </Card.Body>
        </Card>
    </>
}


export default CryptoExchange;