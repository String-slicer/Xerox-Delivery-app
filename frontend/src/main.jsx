import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store.js'; // Import both store and persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import SocketProvider from './context/socketcontext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SocketProvider>
            <App />
          </SocketProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
