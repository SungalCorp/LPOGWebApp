import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import LivingPOG from './components/UI/LivingPOG'
import ErrorPage from './pages/Error';
// import HomePage from './pages/Home';
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
  return (
    <div>
    <img  
    className="logo_img" 
    src={logoImage} 
    alt = 'LogoImg'
/> 
<img  
    className="sungal_img" 
    src={SungalImage} 
    alt = 'SungalImg'
/> 
  <RouterProvider router={router} /></div>
  );
}

export default App;
