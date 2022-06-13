import React, {useEffect, useState} from 'react';
import { Collapse, Card } from 'react-bootstrap';

// import "./cryptoexchange.css"

function CryptoExchange(props) {
    // const [name, setName] = useState(props.name);
    const [open, setOpen] = useState(false);

    let bg = {background: 'white'};

    return <>
        <Card style={{ ...bg }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}

            <div className="title">{props.name}</div>

            <Card.Body>
                {/* <Card.Title>market</Card.Title> */}
                <Card.Text>
                </Card.Text>

                <p onClick={() => setOpen(!open)} className="bid">{Number(props.data.bid).toFixed(props.decimals)}</p>
                    <p onClick={() => setOpen(!open)} className="ask">{Number(props.data.ask).toFixed(props.decimals)}</p>
                    <p onClick={() => setOpen(!open)} className="decimals">({Number(props.data.ask-props.data.bid).toFixed(props.decimals)})</p>

                    <Collapse in={open}>
                        <div className="text-reveal">
                            Some more data here...
                        </div>
                    </Collapse>

                {/* <Button variant="primary">Goto exchange</Button> */}
            </Card.Body>
        </Card>
    </>
}

export default CryptoExchange;