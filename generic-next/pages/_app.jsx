import '../styles/index.css'
import {useStore} from "../store";
import {Provider as ReduxProvider} from 'react-redux';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return <ReduxProvider>
    <Component {...pageProps} />
  </ReduxProvider>
}

export default MyApp;

export const getServerSideProps = async () => {
  let pageProps = {};

  // feed redux state on the backend
  pageProps.initialReduxState = {
    ui: {
      count: 36,
    },
  };

  return {
    pageProps,
  }
}
