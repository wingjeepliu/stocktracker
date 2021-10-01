const yargs = require("yargs");
const tickers = require('./stockModule/stockTracker')

yargs.version = "1.0.0"

yargs.command({
    command: 'add',
    describe: 'Add a ticker',
    builder :{
        ticker:{
            saveTickers: "Stocker ticker",
            demandOption: true,
            type: 'String'
        },
        brokeage:{
            saveTickers: "Stocker brokeage",
            demandOption: true,
            type: 'String'
        },
        numberOfShares:{
            saveTickers: "number of shares",
            demandOption: true,
            type: 'number'
        }
    },
    handler:(argv)=>{
        tickers.addTicker(argv.ticker, argv.brokeage, argv.numberOfShares);
        // console.log(  argv, tickers)
    }
})

yargs.command({
    command: 'listByTicker',
    describe: 'list tocker by Ticker',
    builder :{
        ticker:{
            saveTickers: "Stocker ticker",
            demandOption: true,
            type: 'String'
        }
    },
    handler:(argv)=>{
        tickers.printTicker(argv.ticker);
        // console.log(  argv, tickers)
    }
})

yargs.command({
    command: 'list',
    describe: 'List Stock by ticker',
    handler:()=>{
        tickers.printallTickers();
        // console.log(  argv, tickers)
    }
})
yargs.parse();//trigger the validation function