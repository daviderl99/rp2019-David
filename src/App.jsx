import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Provider} from "react-redux";
import Header from "./Header.jsx";
import Pages from "./pages/index.jsx";
import configureStore from "./store/configureStore";
import {PersistGate} from "redux-persist/integration/react";
import {ToastContainer, toast} from "react-toastify";

const {store, persistor} = configureStore();

class App extends React.Component{

  render(){
    return(
      <>
        <ToastContainer enableMultiContainer position={toast.POSITION.BOTTOM_LEFT} autoClose={2000} pauseOnFocusLoss={false} />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <Route path={"/"} component={Header} />
              <Switch>
                <Route path="/" exact component={Pages.Homepage} />
                <Route path="/login" exact component={Pages.Loginpage} />
                <Route path="/register" exact component={Pages.Registerpage} />
                <Route path="/users/:userId" exact component={Pages.Userpage} />
                <Route path="/items/:itemId" exact component={Pages.Itempage} />
                <Route path="/cart" exact component={Pages.Cartpage} />
                <Route component={Pages.NotFound} />
              </Switch>
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </>
    );
  }
}

export default App;