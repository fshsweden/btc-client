
  /*  THis was only used for debugging/
  */
  // const handleClickUpdateButton = () => {
  //   /*get_cryptocompare_history();*/
  //   get_exchanges().then(res => { 
  //     setExchangeList(res.data.exchanges);  
  //   });

  //   get_all_btc_products2().then(res => { 
  //     setProductList(res.data.products);  
  //   });
  // }



const get_exchanges = async () => {
    return axios.get(`${root_url}/getallexchanges`)
      .then(res => {
        return res;
      })
  }

  const get_all_btc_products2 = async () => {
    return axios.get(`${root_url}//getallbtc2`)
      .then(res => {
        return res;
      })
  }

  const get_exchange_product = async (exch, product) => {
    setError([]);
    return axios.get(`${root_url}/getexchangeproduct?exchange=${exch}&product=${product}`)
      .then(res => {
        console.log(`Got ticker ${product} ${res.data.info.close}`)

        /*  Reacts usual tip-toe dancing with the state...
        */
        setTickers(prevState => {
          console.log(`Got ${res.data}`);
          let newState = new Map(prevState);
          newState.set(res.data.exchange, res.data.info);
          return newState;
        });
      }).catch(err => {
        setError(prevState => {
          let newState = new Array(prevState);
          try {
            newState.push(err.response.data.info);
          }
          catch (err) {
            newState.push(err);
          }
          return newState;
        })
      });
  }

  const get_all_exchanges_with_product = async (product) => {
    return axios.get(`${root_url}//getallexchangeswithproduct?product=${product}`)
      .then(res => {
        for (let ex in res.data.exchanges) {
          console.log(`Requesting ${product} from ${res.data.exchanges[ex]}`);
          get_exchange_product(res.data.exchanges[ex], product);
        }
        return res;
      })
  }



  const getExchangeListAsSelectOptions = () => {
    var result = exchangeList.map((name, index) => {
      return { label: name, value: index }
    });
    return result;
  }


  const getLastClose = () => {
    if (data != null && data[20] != null) {
      return data[20]["close"]
    }
    else {
      return "NULL";
    }
  }

  const getData = (index) => {
    if (data != null && data[index] != null) {
      return data[index]
    }
    return []
  }

  const getDataList = () => {

    if (data == null || data[20] == null) {
      console.log("data empty");
      return []
    }

    console.log("data not empty");
    return data.map(function (name, index) {
      return <li key={index}>{getTimeFromTs(data[index]["time"])} value: {data[index]["close"]}</li>;
    })
  }


  // const get_markets = (exchanges, symbol) => {
  //   axios.get('http://localhost:5050/api/v2/markets/' + symbol)
  //   .then(res => {
  //       // price.innerHTML = '$'+cryptos.toLocaleString('en')
  //       let mkt = res.data.markets.reverse().map((obj,index) => {
  //         return (<li key={index}>{getTimeFromTs(obj[0] / 1000)}</li>);
  //       });

  //       setMarkets(mkt);
  //   })
  // }

  /*  ---------------------------------------------------------------------

      ---------------------------------------------------------------------
  */
  const getTimeFromTs = (unix_timestamp) => {
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  }

  // const get_cryptocompare_history = () => {
  //   let mykey = "14e149a81dc419200fcddaf292faee02358637477101f13eccbd4fe1648b1f63";
  //   axios.get('https://min-api.cryptocompare.com/data/v2/histohour?fsym=BTC&tsym=USD&limit=20&toTs=-1&api_key=' + mykey)
  //   .then(res => {
  //       console.log(res);
  //       const cryptos = res.data.Data.Data;
  //       setData(cryptos)
  //       // price.innerHTML = '$'+cryptos.toLocaleString('en')
  //       console.log(cryptos);
  //   })
  // }
