import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./Components/LandinPage/LandingPage";
import Home from "./Components/Home/Home";
import GameDetail from "./Components/GameDetail/GameDetail"
import NewGame from "./Components/NewGame/NewGame"
import './App.css';

function App() {
  return (
    <BrowserRouter>
      
    <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage } />
          <Route exact path="/home" component={Home} />
           {/* <Route exact path='/activities' component={Activities} /> */}
        <Route exact path='/game' component={NewGame} /> 
          <Route exact path='/home/:id' component={GameDetail} /> 
      </Switch>
    </div>
    </BrowserRouter>
   
  );
};

export default App;