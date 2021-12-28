import "./App.css";
import MainContainer from "./components/MainContainer";
import FadeIn from "./components/FadeIn";

function App() {
  return (
    <div className="App">
      <FadeIn>
        <MainContainer />
      </FadeIn>
    </div>
  );
}

export default App;
