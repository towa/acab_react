import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import PoemCard from './PoemCard.jsx';
import PoemList from './PoemList.jsx';
import MyNav from './components/MyNav.jsx';
import MyNavButton from './components/MyNavButton.jsx';
import Paper from 'material-ui/Paper';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { RouterToUrlQuery } from 'react-url-query';
 
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#819ca9',
      main: '#546e7a',
      dark: '#29434e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff5c8d',
      main: '#d81b60',
      dark: '#a00037',
      contrastText: '#fff',
    },
  },
});

const routes = [
  {
    path: "/",
    exact: true,
    appbar: () => <MyNav title="ACAB Generator">
        <MyNavButton to="/list">
            view acabs
        </MyNavButton>
    </MyNav>,
    main: () => <PoemCard />,
  },
  {
    path: "/list",
    appbar: () => <MyNav submenu title="all Combinations are beautiful"/>,
    main: () => <PoemList />
  },
];



function App() {
    return (
    <BrowserRouter>
        <RouterToUrlQuery>
            <MuiThemeProvider theme={theme}>
                <Paper style={{maxWidth : 700, margin : 'auto'}}>
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.appbar}
                            />
                        ))}
                    </Switch>
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                component={route.main}
                            />
                        ))}
                    </Switch>
                </Paper>
            </MuiThemeProvider>
        </RouterToUrlQuery>
    </BrowserRouter>
    );
}

export default App;
