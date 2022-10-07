import { createContext, useReducer } from 'react';
import '../styles/globals.css'

export const StoreContext = createContext();

export const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_SHOPS: 'SET_COFFEE_SHOPS'
}

const storeReducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong }
    }
    case ACTION_TYPES.SET_COFFEE_SHOPS: {
      return { ...state, coffeeShops: action.payload.coffeeShops }
    }
    default:
        throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const StoreProvider = ({ children }) => {
  const initialState = {
    latLong: "",
    coffeeShops: [],
  }

  const [state, dispatch] = useReducer(storeReducer, initialState)

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
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
