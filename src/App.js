/*
  BTC Info

  Example React application that talks to a Python backend, connected via CCXT to 
  multiple crypto exchanges.

  This app queries the backend for existing exchanges and products

  The user can slect a product (like the BTC/USDT pair), and get the current price
  of thatpair from all exchanegs that supports it.

  This example app shows several techniques, such as

  Async communication
  Async update of display
  React Hooks

  This is just a proof-of-concept, so pay no attention to the man behind the curtains.
*/

import React, { useEffect, useState } from 'react';
import { Navbar, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';
import CryptoExchange from './components/cryptoexchange';
import Switch from './components/tristate';

import './App.css';

function App() {

  const [decimals, setDecimals] = useState(2);
  const [exchange, setExchange] = useState("");
  const [product, setProduct] = useState([]);
  const [productList, setProductList] = useState(["BTC/USD", "BTC/USDT", "ETH/BTC"]);

  // const [data, setData] = useState(new Map());
  const [ticker, setTicker] = useState(new Map());
  const [error, setError] = useState([]);
  const [bestBid, setBestBid] = useState(0.0);
  const [bestAsk, setBestAsk] = useState(0.0);
  const [medianClose, setMedianClose] = useState(0.0);

  const root_url = process.env.REACT_APP_BACKEND;

  const getProductListAsSelectOptions = () => {
    var result = productList.map((name, index) => {
      return { label: name, value: index }
    });
    return result;
  }

  const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

  const get_all_tickers = async (product) => {
    setTicker(new Map());
    return axios.get(`${root_url}/getticker?product=${product}`)
      .then(res => {

        console.log(res);

        // Convert Object to Map
        let m = new Map(Object.entries(res.data.ticker));

        // Calculate median of close values to find outliers (note some have null values!)
        let close_values = [...m.entries()].map(a => (a[1] == null ? 0.0 : a[1].close));
        console.log(close_values);
        let mc = median(close_values);
        setMedianClose(mc);

        console.log(...m.entries());
        // Filter out null values, and where close differ from median with > 2% 
        m = [...m.entries()]
          .filter(x => x[1] != null)
          .filter(x => x[1].bid != null && x[1].ask != null)
          .filter(x => (x[1].close / mc > 0.98) && (x[1].close / mc < 1.02));
        // We really need it as a Map()
        m = new Map(m);

        setTicker(m);

        console.log("Finding best bid/ask:");
        let bestBid = [...m.entries()]
          .filter((x) => x[1] != null)
          .filter((x) => x[1].ask !== 0.0)
          .filter((x) => x[1].bid !== null)
          .reduce((a, b) => a[1].bid > b[1].bid ? a : b);
        let bestAsk = [...m.entries()]
          .filter((x) => x[1] != null)
          .filter((x) => x[1].ask !== 0.0)
          .filter((x) => x[1].ask !== null)
          .reduce((a, b) => a[1].ask < b[1].ask ? a : b);


        setBestBid(bestBid[1].bid);
        setBestAsk(bestAsk[1].ask);
        return res;
      }).catch(err => {
        console.error(err)
      });
  }

  const [statusAlpha, setStatusAlpha] = useState("green");
  const [statusBid, setStatusBid] = useState("gray");
  const [statusAsk, setStatusAsk] = useState("gray");
  const [statusSpread, setStatusSpread] = useState("gray");
  const [statusClose, setStatusClose] = useState("gray");

  const handleClickBid = () => {
    if (statusBid !== "green") {
      setStatusSpread("gray");
      setStatusAlpha("gray");
      setStatusBid("green");
      setStatusAsk("gray");

      let newticker = [...ticker.entries()].sort((a, b) => a[1].bid < b[1].bid ? 1 : -1);
      setTicker(new Map(newticker));
    }
  };

  const handleClickAsk = () => {
    if (statusAsk !== "green") {
      setStatusSpread("gray");
      setStatusAlpha("gray");
      setStatusBid("gray");
      setStatusAsk("green");

      let newticker = [...ticker.entries()].sort((a, b) => a[1].ask > b[1].ask ? 1 : -1);
      setTicker(new Map(newticker));
    }
  };

  const handleClickSpread = () => {
    if (statusSpread !== "green") {
      setStatusSpread("green");
      setStatusAlpha("gray");
      setStatusBid("gray");
      setStatusAsk("gray");

      let newticker = [...ticker.entries()].sort((a, b) => (a[1].ask-a[1].bid) > (b[1].ask - b[1].bid) ? 1 : -1);
      setTicker(new Map(newticker));
    }
  };

  const handleClickAlpha = () => {
    if (statusAlpha !== "green") {
      setStatusAlpha("green");
      setStatusSpread("gray");
      setStatusBid("gray");
      setStatusAsk("gray");

      let newticker = [...ticker.entries()].sort((a, b) => (a[0] > b[0]) ? 1 : -1);
      setTicker(new Map(newticker));
    }
  };

  // const addError = (err) => {
  //   setError(prevState => {
  //     let newState = new Array(prevState);
  //     newState.push(err);
  //     return newState;
  //   });
  // }

  // const handleExchangeSelected = (evt) => {
  //   console.log("Exchange selected! " + evt.label);
  //   setExchange(evt.label);
  // }

  const handleProductSelected = (evt) => {
    console.log("Product selected! " + evt.label);
    setProduct(evt.label);
    
    setStatusAlpha("green");
    setStatusSpread("gray");
    setStatusBid("gray");
    setStatusAsk("gray");

    if (evt.label === "BTC/USD" || evt.label === "BTC/USDT") {
      setDecimals(2);
    }
    else {
      setDecimals(4);
    }
    get_all_tickers(evt.label)
  }

   return <>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">BTC Overview ({process.env.REACT_APP_BACKEND})</Navbar.Brand>
          {/* <Nav className="me-auto">
            <Nav.Link href="#overview">Overview</Nav.Link>
            <Nav.Link href="#details">Details</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
          </Nav> */}
        </Container>
      </Navbar>
      <br />

      <Container>
        <Row>
          <Col xs={12} sm={6} lg={4}>
            <Select options={getProductListAsSelectOptions()} onChange={handleProductSelected} />
            {/* {[...error].map(x => {
              return {x}
            })} */}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="center_container">
              <div className="content">Median price: {Number(medianClose).toFixed(decimals)}</div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="selection_container">
              Sort by:
              <Switch key={"Alpha"} label={"Alpha"} onClick={handleClickAlpha} color={statusAlpha} />
              <Switch key={"Bid"} label={"Bid"} onClick={handleClickBid} color={statusBid} />
              <Switch key={"Ask"} label={"Ask"} onClick={handleClickAsk} color={statusAsk} />
              <Switch key={"Spread"} label={"Spread"} onClick={handleClickSpread} color={statusSpread} />

            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            {
              [...ticker.keys()].map(k => (
              <div key={k} className="market_container">
                <CryptoExchange decimals={decimals} key={k} name={k} data={ticker.get(k)} bestBid={bestBid} bestAsk={bestAsk} />
              </div>
            ))}
          </Col>
        </Row>
        <Row>
          {
            
          }
        </Row>

      </Container>
    </>
  
}

export default App;
