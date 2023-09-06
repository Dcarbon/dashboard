import "@glidejs/glide/src/assets/sass/glide.core.scss";
import "@glidejs/glide/src/assets/sass/glide.theme.scss";
import "glider-js/glider.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "src/styles/globals.scss";
import NextNProgress from "nextjs-progressbar";
import { Provider } from "react-redux";
import { store } from "src/redux";
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextNProgress color='#72bf44' />
      <Component {...pageProps} />
    </Provider>
  );
}
