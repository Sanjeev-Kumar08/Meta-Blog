"use client";
import { Provider } from "react-redux";
import store from "@/app/store/store";
import APP from "../APP/APP";

const ReduxProvider = ({ children }) => {
  return (
    <Provider store={store}>
      <APP children={children} />
    </Provider>
  );
};

export default ReduxProvider;
