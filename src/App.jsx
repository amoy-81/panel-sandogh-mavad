import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TashilatProvider from "./contexts/Tashilat.Provider";

function App() {
  return (
    <>
      <ToastContainer />
      <Provider store={store}>
        <TashilatProvider>
          <RouterProvider router={router} />
        </TashilatProvider>
      </Provider>
    </>
  );
}

export default App;
