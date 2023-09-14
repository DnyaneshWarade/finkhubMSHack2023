import React, { useState } from "react";
import "./Dashboard.css";
import Companies from "../../Resources/Companies";
import "./Dashboard.css";
import ProfileIcon from "./../../Images/ProfileIcon.png";
import { getTickerPrice } from "../../Services/tickerPriceFunctions";
import { createPost } from "../../Services/postFunctions";

export default function Dashboard() {
  const [userType, setUserType] = useState("PulseTradeAI");
  const [action, setAction] = useState("Buy");
  const [stock, setStock] = useState("");
  const [selectedStockSymbol, setSelectedStockSymbol] = useState('');
  const [stockPrice, setStockPrice] = useState();
  const [amount, setAmount] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [expectedProfit, setExpectedProfit] = useState("");
  const [expectedLoss, setExpectedLoss] = useState("");
  const preview = `I am a StockFink user of ${userType} and I decided to ${action} ${stock} at ${stockPrice} USD. The calculated expected profit is ${expectedProfit} and expected risk is ${expectedLoss}. `;

  const companies = Companies;

  // const companyList = Object.keys(companies).map((key) => {
  //   return `${key} - ${companies[key]}`;
  // });

  const handlePostSubmission = async () => {
    if (minPrice > transactionAmount || maxPrice < transactionAmount) {
      alert("Should be with min and max");
      return;
    }

    // prepare a post
    var post = {
      userId : "xyz",
      ticker: selectedStockSymbol,
      timeStamp: Date.now(),
      stopLoss: minPrice,
      target: maxPrice,
      tradeType: action == "Buy" ? 0 : 1,
      price: stockPrice,
      isComplete: false
    };
    
    var ret = await createPost(post);
    if (ret.code === 201) {
      alert("success" + ret.res);
    } else {alert("failed");}
  }

  const handleBlur = async () => {
    // Check if the value in the input field is a valid company name
    const selectedCompany = Object.entries(companies).find(
      ([key, value]) => value === stock
    );

    if (selectedCompany) {
      setSelectedStockSymbol(selectedCompany[0]);
      var result = await getTickerPrice(selectedCompany[0]);
      if (result.code === 200 && result.res) {
        setStockPrice(result.res.price);
        setMinPrice(result.res.min);
        setMaxPrice(result.res.max);
      }
    }
  };

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
              onChange={(e) => setStock(e.target.value)}
              onBlur={handleBlur}
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
              onChange={(e) => setAmount(e.target.value)}
              value={stockPrice}
              disabled="true"
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
