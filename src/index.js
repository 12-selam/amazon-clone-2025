import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App'
import { DataProvider } from './components/DataProvider/DataProvider.jsx'
import { initialState,reducer} from './Utility/reducer'
import Routing from './Routing/Routing.jsx'



const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider reducer={reducer} initialState={initialState}>
       <App/>
  </DataProvider>
   
  </React.StrictMode>
);
  

