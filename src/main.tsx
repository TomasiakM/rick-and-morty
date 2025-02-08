import { StrictMode } from 'react';
import { store } from './state/store.ts';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
