import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from "./store/session";
import { useState, useEffect } from 'react';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import Navigation from './components/Navigation';
import DrinkListPage from './components/DrinkListPage';
import HomePage from './components/HomePage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <Navigation isLoaded={isLoaded} />
    
      {isLoaded && (
        <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/drinks">
          <DrinkListPage />
        </Route>
        <Route exact path="/">
          <HomePage />
        </Route>
      </Switch>
      )}
    </>
  );
}

export default App;
