import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Companies from "../../Resources/Companies";
import "./Dashboard.css";
import ProfileIcon from "./../../Images/ProfileIcon.png";
import { getTickerPrice } from "../../Services/tickerPriceFunctions";
import { createPost } from "../../Services/postFunctions";

export default function Dashboard() {
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
  const [expectedProfit, setExpectedProfit] = useState("");
  const [expectedLoss, setExpectedLoss] = useState("");
  const [stopLoss, setStopLoss] = useState();
  const [targeProfit, setTargetProfit] = useState();
  const preview = `I am a StockFink user of ${userType} and I decided to ${action} ${stock} at ${stockPrice} USD. The calculated expected profit is ${expectedProfit} and expected risk is ${expectedLoss}. `;

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
    if (minPrice > transactionAmount || maxPrice < transactionAmount) {
      alert("Should be within min and max");
      return;
    }

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
    };

    var ret = await createPost(post);
    if (ret.code === 201) {
      alert("success" + ret.res);
    } else {
      alert("failed");
    }
  };

  const handleSetStock = (e) => {
    setStock(e.target.value);
    handleBlur();
  };
  const handleBlur = async () => {
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
        updateRangeParameters();
      }
    }
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
      setStopLoss(stopLossRangeInitialValue);
      setTargetProfit(profitTargetRangeInitialValue);

      // stopLossRangeMinValue = minPrice;
      // stopLossRangeMaxValue = stockPrice;
      // stopLossRangeInitialValue = stopLossRangeMaxValue;
      // profitTargetRangeMinValue = stockPrice;
      // profiltTargetRangeMaxValue = maxPrice;
      // profiltTargetRangeInitialValue = profitTargetRangeMinValue;
      console.log("buy");
      // return;
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
      // stopLossRangeMinValue = stockPrice;
      // stopLossRangeMaxValue = maxPrice;
      // stopLossRangeInitialValue = stopLossRangeMinValue;
      // profitTargetRangeMinValue = minPrice;
      // profiltTargetRangeMaxValue = stockPrice;
      // profiltTargetRangeInitialValue = profiltTargetRangeMaxValue;
      console.log("sell");
      // return;
    }
    console.log(
      stopLossRangeMinValue,
      stopLossRangeMaxValue,
      stopLossRangeInitialValue,
      profitTargetRangeMinValue,
      profitTargetRangeMaxValue,
      profitTargetRangeInitialValue
    );
  }

  return (
    <div className="DashBoard">
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
            />{" "}
            <label htmlFor="FinkAIBeta">FinkAIBeta</label>
          </div>
        </div>

        <div className="SecondLine">
          {" "}
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
              // onChange={(e) => setStock(e.target.value)}
              onBlur={handleSetStock}
              onChange={handleSetStock}
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

        <div className="ThirdLine">
          <div className="PriceSelection">
            at
            <input
              type="number"
              id="amount"
              max="100000"
              // onChange={(e) => setAmount(e.target.value)}
              value={stockPrice}
              disabled={true}
            />{" "}
            <span className="Currency">USD</span>
          </div>

          <div className="Prediction">
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
          </div>
        </div>
        {stock.length > 0 &&
          stopLossRangeMinValue != undefined &&
          Number(stopLossRangeMinValue) > 0 && (
            <div className="FourthLine">
              {/* Ranges */}
              <div className="RangeSelector">
                <div className="StopLossDiv">
                  <label htmlFor="StopLoss">
                    StopLoss({stopLossRangeMinValue}, {stopLossRangeMaxValue})
                  </label>
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
                  <p>stop loss: {stopLoss}</p>
                </div>
                <div className="TargetProfitDiv">
                  <label htmlFor="TargetProfit">
                    TargetProfit({profitTargetRangeMinValue},{" "}
                    {profitTargetRangeMaxValue})
                  </label>
                  <input
                    type="range"
                    name="TargetProfit"
                    id="TargetProfit"
                    min={profitTargetRangeMinValue}
                    max={profitTargetRangeMaxValue}
                    value={targeProfit}
                    step={sliderStps}
                    onChange={(e) =>
                      setTargetProfit(parseFloat(e.target.value))
                    }
                    className="RangeSlider"
                  />
                  <p>profit target: {targeProfit}</p>
                </div>
              </div>
            </div>
          )}
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
