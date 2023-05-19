import "src/styles/globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

import "react-slideshow-image/dist/styles.css";
import { Provider } from "react-redux";
import { store } from "src/redux";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
