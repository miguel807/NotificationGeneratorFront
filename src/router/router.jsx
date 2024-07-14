import { createBrowserRouter } from "react-router-dom";
import App from '../App'

import PrivateRoute from "../components/PrivateRoute";
import { SignUp } from "../components/singUp";
const rootRoutes = [
 
  {
    path: '/',
    element: <PrivateRoute element={App} />,
  },
  {
    path: '/login',
    element: <SignUp />,
  },

];
  
export const router = createBrowserRouter(rootRoutes);
  