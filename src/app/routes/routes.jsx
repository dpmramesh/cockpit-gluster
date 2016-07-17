import React from 'react'
import App from '../components/App.jsx'
import Dashboard from '../components/Dashboard.jsx'
import GdeploySetup from '../components/GdeploySetup.jsx'

let root = {
  path: '/',
  component: App,
  indexRoute: {
    component: Dashboard
  },
  childRoutes: [],
}

export let paths = {
    "Overview": {
        path: '/dashboard',
        icon: "fa-dashboard",
        component: Dashboard,
        indexRoute: true
        
    },
    "Gdeploy": {
        path: "/gdeploy",
        icon: "fa-cubes",
        component: GdeploySetup,
        indexRoute: true
    }
}

function createRoutes() {
    for(var key in paths){
        root.childRoutes.push(paths[key])
    }
    return root
}

const routes = createRoutes()
export default routes