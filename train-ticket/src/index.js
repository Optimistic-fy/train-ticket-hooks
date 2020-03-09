import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import 'normalize.css/normalize.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'lib-flexible'
import store from './store/index'

import Index from './index/App'
import Query from './query/App'
import Ticket from './ticket/App'
import Order from './order/App'

ReactDOM.render(
    <Provider store={store}>
       <BrowserRouter>
            <Switch>
                <Route path='/index' component={Index} />
                <Route path='/query' component={Query} />
                <Route path='/ticket' component={Ticket} />
                <Route path='/Order' component={Order} />
                {/* <Route component={TabBar} /> */}
            </Switch>
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);
