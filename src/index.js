import React from 'react';
import ReactDOM from 'react-dom';
import './styles/css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import { AppContainer } from 'react-hot-loader';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
};

registerServiceWorker();

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
