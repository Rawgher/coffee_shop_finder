import { createContext } from 'react';
import '../styles/globals.css'

const StoreContext = createContext();

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  }

  return (
    <StoreContext.Provider value={{ state: initialState }}>
      {children}
    </StoreContext.Provider>
  )
};

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
      <footer>
        <p>@2022 Rawgher</p>
      </footer>
    </div> 
  );
}

export default MyApp
