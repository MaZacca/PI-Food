import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import CreateForm from './Components/CreateForm/CreateForm';
import RecipeDetail from './Components/RecipeDetail/RecipeDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' component={LandingPage}/>
          <Route exact path = '/home' component={Home}/>
          <Route path = '/home/:id' component={RecipeDetail}/>
          <Route path = '/create' component={CreateForm}/>
        </Switch>
      </div>
    </BrowserRouter> 
  );
}

export default App;
