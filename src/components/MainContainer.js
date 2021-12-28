import React, { useState, useEffect } from "react";
import "./MainContainer.css";
import "./Queries.css";
import plussign from "../img/plus-sign.png";
import refreshbutton from "../img/refresh-button.png";
import logo from "../img/logo.png";
import axios from "axios";
import Weight from "./Weight";
import { v4 as uuidv4 } from "uuid";
import FadeIn from "./FadeIn";
import { FoodFacts } from "./FoodFacts";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const MainContainer = () => {
  // RECHART
  const [chartData, setChartData] = useState([]);
  // OTHER
  const [date, setDate] = useState(new Date());
  const [initialInput, setInitialInput] = useState("");
  const [foodFactTitle, setFoodFactTitle] = useState("");
  const [foodFactBody, setFoodFactBody] = useState("");
  // const [recipeOfTheDay, setRecipeOfTheDay] = useState("");
  // const [recipeImg, setRecipeImg] = useState("");
  const [quoteOfTheDay, setQuoteOfTheDay] = useState("");
  const [modalClass, setModalClass] = useState("closed");
  // const [recipeModalClass, setRecipeModalClass] = useState("closed");
  const [inputWeight, setInputWeight] = useState("");
  const [weight, setWeight] = useState([]);
  const [defaultMessageWeight, setDefaultMessageWeight] = useState(
    "Enter a value to start tracking your weight."
  );

  //DATA MODAL RECIPE
  const [recipeProcedure, setRecipeProcedure] = useState("");

  //FUNZIONI

  const getRandomFact = (array) => {
    const random = Math.floor(Math.random() * array.length);
    return array[random];
  };

  const renderFacts = () => {
    setFoodFactTitle(getRandomFact(FoodFacts).title);
    setFoodFactBody(getRandomFact(FoodFacts).body);
  };

  const openClass = () => {
    setModalClass("open");
  };

  const closedClass = () => {
    setModalClass("closed");
  };

  useEffect(() => {
    getRandomFact(FoodFacts);
    renderFacts();
  }, [weight]);

  const submitWeight = () => {
    setChartData([...chartData, { name: inputWeight, uv: inputWeight }]);
    setWeight([{ value: inputWeight, key: uuidv4() }, ...weight]);
    console.log(chartData);
    setDefaultMessageWeight("");
    closedClass();
  };

  const submitWeightOnKey = (e) => {
    if (e.charCode == 13) {
      setChartData([...chartData, { name: inputWeight, uv: inputWeight }]);
      setWeight([{ value: inputWeight, key: uuidv4() }, ...weight]);
      setDefaultMessageWeight("");
      closedClass();
    }
  };

  const renderWeight = () => {
    return [...weight].map((e, index) => {
      return (
        <FadeIn className="fade-in">
          <Weight
            weight={weight[index].value}
            key={weight[index].key}
            weightArray={weight}
            deleteWeightComponent={deleteWeightComponent}
          />
        </FadeIn>
      );
    });
  };

  const deleteWeightComponent = (deletedKey) => {
    // setWeight(weight.filter((element) => element.key != deletedKey));
    console.log(deletedKey);
  };

  const clearWeightHistory = () => {
    setWeight([]);
    setChartData([]);
  };

  //API
  useEffect(() => {
    axios
      .get(
        "https://zenquotes.io/api/random/9b5ee37d2eebfa303c900da058c17eaa914c5709"
      )
      .then((res) => setQuoteOfTheDay(res.data[0].q))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-container">
      <div className="div-1"></div>
      <div className="div-2">
        <img src={logo} alt="logo" className="logo" />

        <h1></h1>
      </div>
      <div className="div-3">
        <h1>Add Weight</h1>
        <img
          src={plussign}
          alt="plus sign"
          className="plus-sign"
          onClick={openClass}
        />
      </div>
      <div className="div-4">
        <h1>Did You Know?</h1>
        <div className="food-fact-container">
          <p>{foodFactBody}</p>
        </div>

        <img
          src={refreshbutton}
          alt="refresh button"
          className="refresh-button"
          onClick={renderFacts}
        />
      </div>
      <div className="div-5">
        <div className="quote-container">
          <div className="quote-subcontainer">
            <h1>Quote Of The Day:</h1>
            <p>{quoteOfTheDay}</p>
          </div>
        </div>

        <div className="chart-container">
          <div style={{ width: "100%", height: "90%" }}>
            <ResponsiveContainer>
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#b6caec"
                  fill="#3c7bea"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="div-6">
        <div className="weight-history-container">
          <p>{defaultMessageWeight}</p>
          {renderWeight()}
        </div>
        <button className="clear-history-weight" onClick={clearWeightHistory}>
          Clear History
        </button>
      </div>

      {/* <div className={`modal-show-recipe ${recipeModalClass}`}>
        <div
          className="recipe-image-container"
          style={{ backgroundImage: `url(${recipeImg})` }}
        ></div>
        <h1>{recipeOfTheDay}</h1>
        <p className="recipe-ingredients">Ingredienti:</p>
        <p className="recipe-procedure">Procedimento</p>
        <button onClick={closedRecipeClass}>CLOSE</button>
      </div> */}
      <div className={`page-mask ${modalClass}`}></div>
      <div className={`modal-add-weight ${modalClass}`}>
        <p>What's your weight today?</p>
        <div className="input-container">
          <input
            type="text"
            onChange={(e) => setInputWeight(e.target.value)}
            onKeyPress={(e) => submitWeightOnKey(e)}
            autoFocus={true}
          />
          <h1> kg</h1>
        </div>
        <div className="modal-button-container">
          <button onClick={submitWeight}>SUBMIT</button>
          <button onClick={closedClass}>CLOSE</button>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
