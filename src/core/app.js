import React from "react";
import "matsumoto/styles";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "core/misc/scroll-to-top";
import { I18nextProvider } from "react-i18next";
import internationalization from "core/internationalization";

import AuthCallback from "core/auth/callback";
import AuthSilent   from "core/auth/silent";
import AuthDefault  from "core/auth/default";

import Header    from "parts/header";
import Footer    from "parts/footer";
import TopAlert  from "parts/top-alert";
import Modal     from "parts/modal";

import Routes from "core/routes";

import { Loader } from "simple";
import { Authorized, isPageAvailableAuthorizedOnly} from "core/auth";

const App = () => {
    var canShowContent = !isPageAvailableAuthorizedOnly() || Authorized();
    return (
        <I18nextProvider i18n={internationalization}>
            <BrowserRouter>
                <div class="body-wrapper">
                    <Switch>
                        <Route exact path="/auth/callback" component={ AuthCallback } />
                        <Route exact path="/auth/silent" component={ AuthSilent } />
                        <Route>
                            <Route component={ AuthDefault } />
                            { canShowContent ? <React.Fragment>
                                <div class="block-wrapper">
                                    <Route component={ Header } />
                                    <TopAlert />
                                    <Routes />
                                </div>
                                <Route component={ Footer } />
                            </React.Fragment> : <Loader page /> }
                        </Route>
                    </Switch>
                </div>
                <Modal />

                <ScrollToTop />
            </BrowserRouter>
        </I18nextProvider>
    )};

export default App;
