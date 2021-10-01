const fs = require('fs')
const tickerFile = __dirname + "/../data/ticker.json"

const loadTickers = ()=>{
    try{
       
        const tickerBuffer = fs.readFileSync(tickerFile);
        return JSON.parse(tickerBuffer.toString());
    }catch(e){
        console.log(e);
        return [];
    }
   
}
const saveTickers = (tickers)=>{
    try{
        let tickerStr = JSON.stringify(tickers);
        fs.writeFileSync(tickerFile, tickerStr);
    }catch(e){
       return false
    }
    return true
}

const sortByTicker = (a,b) =>{
    if(a.ticker > b.ticker){
        return 1
    }else if(a.ticker < b.ticker){
        return -1
    }else{
        return 0;
    }
}

const addTicker = (ticker, brokeage, numberOfShare) =>{
  let  tickers =  loadTickers();
//    console.log(tickers);

   let matchedTicker =  tickers.find(tickerObj => {
     
       return   (ticker == tickerObj.ticker && brokeage == tickerObj.brokeage);
       
   })
   
   if(matchedTicker){
    matchedTicker.numberOfShare = numberOfShare; //reference to the ticker Obj in the tickers array  *******
   }else{
        var ticker={
            ticker,
            brokeage,
            numberOfShare
        }
       tickers.push(ticker)
   }

  
   saveTickers(tickers)
}

const listAllTickers = ()=>{
    let  tickers =  loadTickers();
    tickers.sort(sortByTicker)
    return tickers;
}
const listByTicker = (ticker)=>{
    let  tickers =  listAllTickers();
    let matchTickers =  tickers.filter(holding => holding.ticker == ticker);
    return matchTickers;
}

const printTicker  =(ticker) =>{
    let  tickers =  listByTicker(ticker);
    var totalShare = 0;
    tickers.forEach(ticker => totalShare = totalShare + ticker.numberOfShare)
    console.log(`${ticker} : ${totalShare} (total)`)
    tickers.forEach(ticker => console.log(ticker))
}

const printallTickers  =() =>{
    let  tickers =  listAllTickers();
    tickers.forEach(ticker => console.log(ticker))
}

module.exports={
    addTicker,
    printTicker,
    printallTickers,
    loadTickers
}
