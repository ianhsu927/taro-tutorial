import { useLaunch } from "@tarojs/taro";
import { Provider } from "react-redux";
import { combineReducers, legacy_createStore as createStore } from "redux";
import "./app.css";

const store = createStore(
  combineReducers({
    thread: (state = {}, action) => {
      if (action.type === "SET_CURRENT_THREAD") {
        return {
          ...state,
          ...action.thread,
        };
      }
    },
  }),
);

function App({ children }) {
  useLaunch(() => {
    console.log("App launched.");
  });

  // children 是将要会渲染的页面
  return <Provider store={store}>{children}</Provider>;
}

export default App;
