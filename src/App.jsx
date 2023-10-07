import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from "./Components/Home/Home";
import Register from "./Components/Register/Register";
import Product from "./Components/Product/Product";
import Category from "./Components/Category/Category";
import Brand from "./Components/Brand/Brand";
import NotFound from "./Components/NotFound/NotFound";
import Cart from "./Components/Cart/Cart";
import Login from "./Components/Login/Login";
import './App.css';
import WishList from './Components/WishList/WishList';
import UserContextProvider from './Components/Context/UserContext';
import ProtectRoute from './Components/ProtectRoute/ProtectRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Components/Context/CartContext';
import WishListContextProvider from './Components/Context/WishListContext';
import HeartContextProvider from './Components/Context/HeartContext';
import Payment from './Components/Payment/Payment';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import Verify from './Components/Verify/Verify';



export default function App() {

    let queryClient = new QueryClient();

    let routes = createBrowserRouter([
    { path: '', element:<Layout/>, children:[
        { path: '' , element: <Login/>},
        { path: 'login' , element: <Login/>},
        { path: 'register' , element: <Register/>},
        { path: '/forgetPassword' , element: <ForgetPassword/>},
        { path: '/verify' , element: <Verify/>},
        { path: 'home' , element: <ProtectRoute> <Home/> </ProtectRoute>},
        { path: 'product' , element: <ProtectRoute> <Product/> </ProtectRoute>},
        { path: 'category' , element: <ProtectRoute> <Category/> </ProtectRoute>},
        { path: 'brand' , element: <ProtectRoute> <Brand/> </ProtectRoute>},
        { path: 'cart' , element: <ProtectRoute> <Cart/> </ProtectRoute>},
        { path: 'wishlist' , element: <ProtectRoute> <WishList/> </ProtectRoute>},
        { path: '/payment/:id' , element: <ProtectRoute> <Payment/> </ProtectRoute>},
        { path: '/productdetails/:id' , element: <ProtectRoute> <ProductDetails/> </ProtectRoute>},
        { path: '*' , element: <NotFound/>},
    ]}
]);

    return <>

    <HeartContextProvider>

        <WishListContextProvider>

            <CartContextProvider>

                <QueryClientProvider client={queryClient}>

                    <UserContextProvider>

                        <RouterProvider router={routes} />

                    </UserContextProvider>

                </QueryClientProvider>

            </CartContextProvider>

        </WishListContextProvider>

    </HeartContextProvider>

    </>
}






