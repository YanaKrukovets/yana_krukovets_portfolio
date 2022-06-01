import '../styles/globals.css'
import Layout from '../components/Layout';
import Cursor from 'react-cursor-follow';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (<>
    <Cursor pulse color="#E1AD01" duration={0.8} size={45} hollow />
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout></>);
}

export default MyApp
