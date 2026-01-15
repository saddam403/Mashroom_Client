
import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import ProductPage from "../Pages/ProductPage";
import AdminLogin from "../Pages/Login";
import AdminLayout from "../components/AdminLayout";
import AdminDashboard from "../Pages/AdminDashboard";
import HomeRoot from "../LayOut/HomeRoot";
import DisplayError from "../Shared/DisplayError";
import AdminProducts from "../Pages/admin/AdminProducts";
import NotFound from "../Shared/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import CheckLogin from "./CheckLogin";
import AdminMedia from "../Pages/AdminMedia";
import AdminAnalytics from "../Pages/AdminAnalytics";
import AdminCarousel from "../Pages/admin/AdminCarousel";

import AdminContactSettings from "../Pages/admin/AdminContactSettings";



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <HomeRoot/>,
//     errorElement: <DisplayError/>,
//     children: [
 
//       {path:"/" ,element:<Home />,},
//       {
//         path: "/product/:slug",
//         element: <ProductPage/>,
//       },
//       {
//         path: "/admin/login",
//         element: <AdminLogin/>,
//       },
//             {
//               path: "/admin",
//               element: <AdminLayout />,
//               children: [
//                 {
//                   index: true,   // <-- same as <Route index />
//                   element: <AdminDashboard />,
//                 },
//                 {
//                   path: "products",
//                   element: <AdminProducts />,
//                 },
//               ],
//             },
//           ],
//         },

//     ]
    
//   },




  
//   {
//     path: "/*",
//     element: <NotFound/>,
//   },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRoot />,
    errorElement: <DisplayError />,
    children: [
      { path: "/", element: <Home /> },

      {
        path: "/product/:slug",
        element: <ProductPage />,
      },

      {
        path: "/admin/login",
        element: <CheckLogin> <AdminLogin /> </CheckLogin>,
      },

      {
        path: "/admin",
        element:<ProtectedRoute>  <AdminLayout /> </ProtectedRoute>,
        children: [
          {
            index: true,   // <-- same as <Route index />
            element: <AdminDashboard />,
          },
          {
            path: "products",
            element:<AdminProducts /> ,
          },
          {
            path:"/admin/carousel",
            element:<ProtectedRoute><AdminCarousel /></ProtectedRoute>
           },
            {
            path: "/admin/contacts",
            element: <ProtectedRoute>  < AdminContactSettings/> </ProtectedRoute>,
          },
          {
            path: "media",
            element:<AdminMedia/> ,
          },
          {
            path: "analytics",
            element:<AdminAnalytics /> ,
          },
         
        ],
      },
    ],
  },

  {
    path: "/*",
    element: <NotFound />,
  },
]);



export default router;