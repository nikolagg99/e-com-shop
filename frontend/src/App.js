import './App.css';

import { useEffect } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';

import Home from './components/Home';
import ProductDetails from './components/product/ProductDetails';

//Cart imports
import { Cart } from './components/cart/Cart';
import ConfirmOrder from './components/cart/ConfirmOrder';
import { OrderSuccess } from './components/cart/OrderSuccess';
import { Payment } from './components/cart/Payment';
import { Shipping } from './components/cart/Shipping';

//Order imports
import ListOrders from './components/order/ListOrders';
import OrderDetails from './components/order/OrderDetails';

//User imports
import Login from './components/user/Login';
import Register from './components/user/Register';
import Profile from './components/user/Profile';
import UpdateUserProfile from './components/user/UpdateUserProfile';
import UpdatePassword from './components/user/UpdatePassword';

//Admin imports
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/ProductsList';
import NewProduct from './components/admin/NewProduct';
import OrdersList from './components/admin/OrdersList';
import UpdateProduct from './components/admin/UpdateProduct';
import ProcessOrder from './components/admin/ProcessOrder';
import UsersList from './components/admin/UsersList';
import UpdateUser from './components/admin/UpdateUser';

import ProtectedRoute from './components/route/ProtectedRoute';
import { loadUser } from './actions/userActions';
import { useSelector } from 'react-redux';
import store from './store';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)

  return (
    <Router>
      <div className="App">
        <Header/>
        <div className="container container-fluid">
        <Route path="/" component={Home} exact/>
        <Route path="/search/:keyword" component={Home}/>
        <Route path="/product/:id" component={ProductDetails} exact/>
        
        <Route path="/cart" component={Cart} exact/>
        <Route path="/shipping" component={Shipping}/>
        <Route path="/orders/confirm" component={ConfirmOrder}/>
        <Route path="/success" component={OrderSuccess}/>
        <Route path="/payment" component={Payment}/>

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <ProtectedRoute path="/me" component={Profile} exact/>
        <ProtectedRoute path="/me/update" component={UpdateUserProfile} exact/>
        <ProtectedRoute path="/password/update" component={UpdatePassword} exact/>
        
        <ProtectedRoute path="/orders/me" component={ListOrders} exact/>
        <ProtectedRoute path="/order/:id" component={OrderDetails} exact/>

        </div>
        <ProtectedRoute path="/dashboard" isAdmin={true} component={Dashboard} exact/>
        <ProtectedRoute path="/admin/products" isAdmin={true} component={ProductsList} exact/>
        <ProtectedRoute path="/admin/product" isAdmin={true} component={NewProduct} exact/>
        <ProtectedRoute path="/admin/product/:id" isAdmin={true} component={UpdateProduct} exact/>
        
        <ProtectedRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact/>
        <ProtectedRoute path="/admin/order/:id" isAdmin={true} component={ProcessOrder} exact/>
        <ProtectedRoute path="/admin/users" isAdmin={true} component={UsersList} exact/>
        <ProtectedRoute path="/admin/user/:id" isAdmin={true} component={UpdateUser} exact/>

        {!loading &&(!isAuthenticated || user.role !== 'admin') && (
          <Footer/>
        )}

        
    </div>
    </Router>
  );
}

export default App;
