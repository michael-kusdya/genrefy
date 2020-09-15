import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Route, Switch , BrowserRouter as Router } from 'react-router-dom'
import thunk from 'redux-thunk';

import reducers from './reducers'
import './index.css';
import Landing from './components/Landing'
import GenreSelector from './components/GenreSelector'
import Result from './components/Result'
import * as serviceWorker from './serviceWorker';

// const store = createStore(reducers, applyMiddleware(thunk))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/select-genre" component={GenreSelector} />
        <Route path="/result" component={Result} />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
