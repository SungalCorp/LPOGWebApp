import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LivingPOG from './components/POG/LivingPOG'
import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';

import AuthenticationPage, {action as authAction}from './pages/Authentication';
var logoImage = require('./imgs/LIVINGPOG.png')
var SungalImage = require('./imgs/SUNGAL.png')
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { 
        index: true,
        element: <AuthenticationPage /> ,
        action: authAction
      },
    
      {
        path: 'LivingPOG',
        element: <LivingPOG />,
      },
     
    ],
  },
]);


function App() {
  console.log('APP STARTING')
  return (
<div>
    <div className="logo-container">        
        {/* <img  
            className="sungal_img" 
            src={SungalImage} 
            alt = 'SungalImg'/> */}

        <img  
            className="livingPOG_img" 
            src ={logoImage} 
            alt = 'LogoImg'/> 
    </div>
    <RouterProvider router={router} />
</div>
  );
}

export default App;
