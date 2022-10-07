import StoreProvider from '../store/store-context';
import '../styles/globals.css'


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
