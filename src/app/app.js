import React from 'react'
import { render } from 'react-dom'
import { Router, useRouterHistory } from 'react-router'
import routes from './routes/routes.jsx'
import '../../node_modules/patternfly/dist/css/patternfly.css'
import '../../node_modules/patternfly/dist/css/patternfly-additions.css'
import { createHashHistory } from 'history'
require('./styles/wizard.scss');

const appHistory = useRouterHistory(createHashHistory)({queryKey: false})

render(<Router history={appHistory} routes={routes}/>, document.getElementById('app'))