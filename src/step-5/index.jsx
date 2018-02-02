import React from "react";
import ReactDOM from "react-dom";
import HomePage from "./pages/home";

const renderRoot = appRoutes => {
  ReactDOM.render(<HomePage />, document.getElementById("app"));
};
renderRoot(HomePage);
if (module.hot) {
  module.hot.accept(["./pages/home"], () => {
    renderRoot(HomePage);
  });
}
