import React, { useState } from "react";
import "./Dashboard.css";
import Companies from "../../Resources/Companies";
import "./Dashboard.css";
import ProfileIcon from "./../../Images/ProfileIcon.png";
import { getTickerPrice } from "../../Services/tickerPriceFunctions";

export default function Dashboard() {
  const [userType, setUserType] = useState("");
  const [action, setAction] = useState("");
  const [stock, setStock] = useState("");
  const [selectedStockSymbol, setSelectedStockSymbol] = useState('');
  const [stockPrice, setStockPrice] = useState();
  const [amount, setAmount] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [exProfit, setExpectedProfit] = useState("");
  const [exLoss, setExpectedLoss] = useState("");
  const preview = `I am a StockFink user of ${userType} and I decided to ${action} ${stock}  at ${amount} USD. The  calculated  expected profit is ${exProfit} and expected risk is ${exLoss}. `;

  // const [searchInput, setSearchInput] = useState("");
  // const [filteredResults, setFilteredResults] = useState([]);
  // const [selectedItem, setSelectedItem] = useState(null);

  const companies = Companies;

  const companyList = Object.keys(companies).map((key) => {
    return `${key} - ${companies[key]}`;
  });

  const handleBlur = async () => {
    // Check if the value in the input field is a valid company name
    const selectedCompany = Object.entries(companies).find(
      ([key, value]) => value === stock
    );

    if (selectedCompany) {
      setSelectedStockSymbol(selectedCompany[0]);
      var result = await getTickerPrice(selectedCompany[0]);
      if (result.code === 200 && result.res) {
        setStockPrice(result.res);
      }
    }
  };

  return (
    <div className="DashBoard">
      <div className="FirstLine">
        I am a StockFink user of
        <div className="RadioSwitch">
          <input
            type="radio"
            value="PulseTradeAI"
            name="userType"
            id="PulseTradeAI"
            onChange={(e) => setUserType(e.target.value)}
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
        <div className="RadioSwitch">
          <input
            type="radio"
            value="Buy"
            name="action"
            id="buy"
            onChange={(e) => setAction(e.target.value)}
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
              <option value={companies[key]}>
                {key}-{companies[key]}
              </option>
            ))}
          </datalist>
        </span>
      </div>
      <div className="ThirdLine">
        {" "}
        <div className="PriceSelection">
          at
          <input
            type="number"
            id="amount"
            value={stockPrice}
            disabled="true"
            max="100000"
          />
          <span className="Currency">USD</span>
          <div class="value-1">Min: {minPrice === 0 ? "" : minPrice}</div>
          <div class="value-2">Max: {maxPrice === 0 ? "" : maxPrice}</div>
        </div>
      </div>

      <div className="Preview">
        <p className="PreviewHeading">Preview</p>
        <div className="PreviewDescription">
          <img src={ProfileIcon} alt="icon" />
          <p>{preview}</p>
        </div>
        <div className="PostButton">
          <p>Post</p>
        </div>
      </div>
    </div>
  );
}
