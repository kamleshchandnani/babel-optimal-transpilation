import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/home";

// const { whyDidYouUpdate } = require("why-did-you-update")
// whyDidYouUpdate(React)
const renderRoot = appRoutes => {
  ReactDOM.render(<HomePage />, document.getElementById("app"));
};
renderRoot(HomePage);
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["./pages/home"], () => {
    renderRoot(HomePage);
  });
}
