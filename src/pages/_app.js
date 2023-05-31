import "src/styles/globals.css";
import "@glidejs/glide/src/assets/sass/glide.core.scss";
import "@glidejs/glide/src/assets/sass/glide.theme.scss";
import "glider-js/glider.min.css";
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
