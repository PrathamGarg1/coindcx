import { DepthManager } from "./DepthManager";
import { cancelAll, createOrder } from "./order";


const solInrMarket = new DepthManager("B-XAI_INR");

const usdtInrMarket = new DepthManager("B-USDT_INR");

const solUsdtMarket = new DepthManager("B-XAI_USDT");
 
setInterval(()=>{
    //sol and inr is illiquid market therfore two poss : 

    // sell sol for inr,inr->usdt,usdt->sol
    const canGetINR=solInrMarket.getRelevantDepth().highestBid-0.001;
    const canGetUsdt=canGetINR/usdtInrMarket.getRelevantDepth().lowestAsk;
    const canGetSol=canGetUsdt/solUsdtMarket.getRelevantDepth().lowestAsk;

    console.log(`You can convert ${1}SOL to ${canGetSol}SOL`)
    
    //buy sol from inr,sol->usdt,usdt->inr
    // const inrspent=solInrMarket.getRelevantDepth().lowestAsk+0.001;
    // const canGetUsdt=usdtInrMarket.getRelevantDepth().highestBid;
    // const canGetInr=usdtInrMarket.getRelevantDepth().highestBid*canGetUsdt;

    console.log(`You can convert ${inrspent}INR to ${canGetInr}INR`)

},2000)

async function main() {
    const highestBid = solInrMarket.getRelevantDepth().highestBid;
    console.log(`placing order for ${parseFloat(highestBid) + 0.01}`);
    await createOrder("buy", "XAIINR", (parseFloat(highestBid) + 0.01).toFixed(3), 10, Math.random().toString())
    await new Promise((r) => setTimeout(r, 10000));
    await cancelAll("XAIINR");
    await new Promise((r) => setTimeout(r, 1000));
    main();
}

setTimeout(async () => {
    main();
}, 2000)