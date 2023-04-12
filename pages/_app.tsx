import SmoothScroll from "@/components/scrollSmoth";
import store from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import 'locomotive-scroll.css'
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
