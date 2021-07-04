import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/core";
import "./App.css";
import { customTheme } from "Styles/theme";

//root
import Root from "PublicViews/Root";

//store
import { configureStore } from "Store/configure-store";
export const store = configureStore();

function App(): JSX.Element {
    return (
        <div className="App">
            <Provider store={store}>
                <ThemeProvider theme={customTheme}>
                    <Root />
                </ThemeProvider>
            </Provider>
        </div>
    );
}

export default App;
