import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store'
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
            </Routes>
          </BrowserRouter >
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
