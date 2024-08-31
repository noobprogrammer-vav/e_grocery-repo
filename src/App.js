import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHome from './components/Admin/Admin_home/Admin_home';
import AdminCategory from './components/Admin/Admin_category/Admin_category';
import AdminContacts from './components/Admin/Admin_contacts/Admin_contacts';
import AdminItems from './components/Admin/Admin_items/Admin_items';
import AdminOrders from './components/Admin/Admin_orders/Admin_orders';
import AdminRatings from './components/Admin/Admin_ratings/Admin_ratings';
import AdminItemsViewer from './components/Admin/Admin_items_viewer/Admin_items_viewer';
import Shop from './components/Shop/Shop';
import Profile from './components/Profile/Profile';
import ItemDetails from './components/Item_details/Item_details';
import Favorites from "./components/Favorites/Favorites";
import Contact from "./components/Contact/Contact";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Orders from "./components/Orders/Orders";
import AOS from 'aos';
import 'aos/dist/aos.css';
import AdminUnits from "./components/Admin/Admin_units/Admin_units";
//#e9e9e9

function App() {

  // let x = screen.width
  // console.log(x)

  // AOS.init();
  return (
    <div className="App" style={{overflow:"hidden"}}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <link href='https://fonts.googleapis.com/css?family=Lemonada' rel='stylesheet'></link>
      {/* <link rel="stylesheet" type="text/css" href="https://bootswatch.com/5/lux/bootstrap.min.css" /> */}
      <ToastContainer />
      <BrowserRouter>
      <Routes>
        {/* <Route path='/' Component={} /> */}

        <Route path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        {/* <Route path='/signup' Component={Signup} /> */}
        <Route path='/profile' Component={Profile} />


        <Route path='/admin' Component={AdminHome} />
        <Route path='/admin/category' Component={AdminCategory} />
        <Route path='/admin/contacts' Component={AdminContacts} />
        <Route path='/admin/items' Component={AdminItems} />
        <Route path='/admin/items/view' Component={AdminItemsViewer} />
        <Route path='/admin/orders' Component={AdminOrders} />
        <Route path='/admin/ratings' Component={AdminRatings} />
        <Route path='/admin/units' Component={AdminUnits} />


        <Route path='/shop' Component={Shop} />
        <Route path='/details' Component={ItemDetails} />
        <Route path='/favorites' Component={Favorites} />
        <Route path='/contact' Component={Contact} />
        <Route path='/cart' Component={Cart} />
        <Route path='/checkout' Component={Checkout} />
        <Route path='/orders' Component={Orders} />




      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
