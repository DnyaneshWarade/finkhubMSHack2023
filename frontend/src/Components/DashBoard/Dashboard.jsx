import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Companies from "../../Resources/Companies";
import "./Dashboard.css";
import ProfileIcon from "./../../Images/ProfileIcon.png";
import { getTickerPrice } from "../../Services/tickerPriceFunctions";
import { createPost } from "../../Services/postFunctions";
import NotificationToast from "../NotificationToasts/NotificationToast";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Dashboard() {
  const history = useHistory();
  const sliderStps = 0.001;
  const [userType, setUserType] = useState("PulseTradeAI");
  const [action, setAction] = useState("Buy");
  const [stock, setStock] = useState("");
  const [selectedStockSymbol, setSelectedStockSymbol] = useState("");
  const [stockPrice, setStockPrice] = useState();
  const [amount, setAmount] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [expectedProfitPercentage, setExpectedProfitPercentage] = useState("");
  const [expectedLossPercentage, setExpectedLossPercentage] = useState("");
  const [stopLoss, setStopLoss] = useState();
  const [targeProfit, setTargetProfit] = useState();
  const [renderSlider, setRenderSlider] = useState(0); //0: hide, 1: rendering, 2: show;
  const preview = `I am a StockFink user of ${userType} and I decided to ${action} ${stock} at ${stockPrice} USD. The calculated expected profit is ${expectedProfitPercentage}% and expected risk is ${expectedLossPercentage}%. `;

  const companies = Companies;

  //Logic for handling range parameters based on buy or sell stock;
  const [stopLossRangeMinValue, setStopLossRangeMinValue] = useState(0);
  const [stopLossRangeMaxValue, setStopLossRangeMaxValue] = useState(0);
  const [stopLossRangeInitialValue, setStopLossRangeInitialValue] = useState(0);
  const [profitTargetRangeMinValue, setProfitTargetRangeMinValue] = useState(0);
  const [profitTargetRangeMaxValue, setProfitTargetRangeMaxValue] = useState(0);
  const [profitTargetRangeInitialValue, setProfitTargetRangeInitialValue] =
    useState(0);

  const handlePostSubmission = async () => {
    // if (minPrice > transactionAmount || maxPrice < transactionAmount) {
    //   alert("Should be within min and max");
    //   return;
    // }

    // prepare a post
    var post = {
      userId: "xyz",
      ticker: selectedStockSymbol,
      timeStamp: Date.now(),
      stopLoss: minPrice,
      target: maxPrice,
      tradeType: action == "Buy" ? 0 : 1,
      price: stockPrice,
      isComplete: false,
      description: preview,
    };

    var ret = await createPost(post);
    if (ret.code === 201) {
      history.push("/");
    } else {
      alert("failed");
    }
  };

  // const handleSetStock = (e) => {
  //   // reset range parameter
  //   setStock(e.target.value);
  //   handleBlur();
  // };

  const handleBlur = async () => {
    try {
      // resetRangeParameters();
      setRenderSlider(1);
      // Check if the value in the input field is a valid company name
      const selectedCompany = Object.entries(companies).find(
        ([key, value]) => value === stock
      );

      if (selectedCompany) {
        setSelectedStockSymbol(selectedCompany[0]);
        var result = await getTickerPrice(selectedCompany[0]);
        if (result.code === 200 && result.res) {
          setStockPrice(Number(result.res.price));
          setMinPrice(Number(result.res.min));
          setMaxPrice(Number(result.res.max));
          // updateRangeParameters();
          setRenderSlider(2);
        }
      }
    } catch (error) {
      console.log(error);
      handleShowToast("Ooops, Something went wrong :(");
    }
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const handleShowToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  function updateRangeParameters() {
    console.log(stockPrice);
    if (action === "Buy") {
      setStopLossRangeMinValue(minPrice);
      setStopLossRangeMaxValue(stockPrice);
      setStopLossRangeInitialValue(stockPrice);
      setProfitTargetRangeMinValue(stockPrice);
      setProfitTargetRangeMaxValue(maxPrice);
      setProfitTargetRangeInitialValue(stockPrice);
      setStopLoss(stockPrice);
      setTargetProfit(stockPrice);
      console.log("buy");
      console.log(minPrice, maxPrice, stockPrice);
    }
    if (action === "Sell") {
      setStopLossRangeMinValue(stockPrice);
      setStopLossRangeMaxValue(maxPrice);
      setStopLossRangeInitialValue(stockPrice);
      setProfitTargetRangeMinValue(minPrice);
      setProfitTargetRangeMaxValue(stockPrice);
      setProfitTargetRangeInitialValue(stockPrice);
      setStopLoss(stopLossRangeInitialValue);
      setTargetProfit(profitTargetRangeInitialValue);
      console.log("sell");
    }
  }
  //update the risk and profit variables
  useEffect(() => {
    updateRiskAndProfitPercentage();
  }, [stockPrice, stopLoss, targeProfit]);

  useEffect(() => {
    updateRangeParameters();
  }, [stockPrice, minPrice, maxPrice]);

  function updateRiskAndProfitPercentage() {
    if (action === "Buy") {
      let risk = ((stockPrice - stopLoss) / stockPrice) * 100;
      setExpectedLossPercentage(parseFloat(risk.toFixed(2)));

      let profit = ((targeProfit - stockPrice) / stockPrice) * 100;
      setExpectedProfitPercentage(parseFloat(profit.toFixed(2)));
      return;
    }
    if (action === "Sell") {
      let risk = ((stopLoss - stockPrice) / stockPrice) * 100;
      setExpectedLossPercentage(parseFloat(risk.toFixed(2)));

      let profit = ((stockPrice - setTargetProfit) / stockPrice) * 100;
      setExpectedProfitPercentage(parseFloat(profit.toFixed(2)));

      return;
    }
  }

  return (
    <div className="DashBoard">
      {showToast && (
        <NotificationToast message={toastMessage} onClose={handleToastClose} />
      )}
      <div className="Script">
        <div className="FirstLine">
          I am a StockFink user of
          <div className="RadioSwitch">
            <input
              type="radio"
              value="PulseTradeAI"
              name="userType"
              id="PulseTradeAI"
              onChange={(e) => setUserType(e.target.value)}
              defaultChecked
            />
            <label htmlFor="PulseTradeAI">PulseTradeAI</label>
            <input
              type="radio"
              value="FinkAIBeta"
              name="userType"
              id="FinkAIBeta"
              onChange={(e) => setUserType(e.target.value)}
            />
            <label htmlFor="FinkAIBeta">FinkAIBeta</label>
          </div>
        </div>

        <div className="SecondLine">
          And I have decided to
          <div className="RadioSwitch2">
            <input
              type="radio"
              value="Buy"
              name="action"
              id="buy"
              onChange={(e) => setAction(e.target.value)}
              defaultChecked
            />
            <label htmlFor="buy">Buy</label>

            <input
              type="radio"
              value="Sell"
              name="action"
              id="sell"
              onChange={(e) => setAction(e.target.value)}
            />
            <label htmlFor="sell">Sell</label>
          </div>
          <span className="StockSelect">
            <input
              type="text"
              list="CompanyList"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              onBlur={handleBlur}
              // onChange={handleSetStock}
              className="StockSelectInput"
              placeholder="Write a stock name"
            />
            <datalist id="CompanyList">
              {Object.keys(companies).map((key) => (
                <option value={companies[key]} key={key}>
                  {key}-{companies[key]}
                </option>
              ))}
            </datalist>
          </span>
        </div>

        <div className="PriceRow">
        <div className="ThirdLine">
          <div className="PriceSelection">
            at
            <input
              type="number"
              id="amount"
              max="100000"
              value={stockPrice}
              disabled={true}
            />{" "}
            <span className="Currency">USD</span>
          </div>

          {/* <div className="Prediction">
            <input
              type="number"
              id="amount"
              max="100000"
              onChange={(e) => setTransactionAmount(e.target.value)}
              value={transactionAmount}
            />
            <span className="Currency">USD</span>
            <div className="value-1">Min: {minPrice === 0 ? "" : minPrice}</div>
            <div className="value-2">Max: {maxPrice === 0 ? "" : maxPrice}</div>
          </div> */}
        </div>

        <div className="FourthLine">
          <div className="RangeSelector">
            <div className="StopLossDiv">
              <label htmlFor="StopLoss">StopLoss</label>
              <input
                type="range"
                name="StopLoss"
                id="StopLoss"
                min={stopLossRangeMinValue}
                max={stopLossRangeMaxValue}
                value={stopLoss}
                step={sliderStps}
                onChange={(e) => setStopLoss(parseFloat(e.target.value))}
                className="RangeSlider"
              />
              <p>Stop Loss: {stopLoss}</p>
            </div>
            <div className="TargetProfitDiv">
              <label htmlFor="TargetProfit">TargetProfit</label>
              <input
                type="range"
                name="TargetProfit"
                id="TargetProfit"
                min={profitTargetRangeMinValue}
                max={profitTargetRangeMaxValue}
                value={targeProfit}
                step={sliderStps}
                onChange={(e) => setTargetProfit(parseFloat(e.target.value))}
                className="RangeSlider"
              />
              <p>Profit Target: {targeProfit}</p>
            </div>
          </div>
        </div>
        </div>
      </div>

      <div className="Preview">
        <p className="PreviewHeading">Preview</p>
        <div className="PreviewDescription">
          <img src={ProfileIcon} alt="icon" />
          <p>{preview}</p>
        </div>
        <div className="PostButton" onClick={handlePostSubmission}>
          <p>Post</p>
        </div>
      </div>
    </div>
  );
}
