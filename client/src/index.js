import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import './index.css';
import './scss/app.scss';

//import Main from './pages/App';
//import Welcome from './pages/Welcome';
import Shop from './Shop';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Shop />
      </Provider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
