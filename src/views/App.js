import './App.scss';
// import '../messaging_init_in_sw';
import MyDemo from '../components/demo/MyDemo';
import ListTodo from './Todos/ListTodo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import ListPerson from './ListPersons/ListPerson';
import Home from './Home/Home';
import Login from './Login/Login';
import ListShoes from './ListShoes/ListShoes';
import Elasticsearch from './elasticsearch/Elasticsearch';
import Cart from './Cart/Cart';
import GetCookie from './elasticsearch/GetCookie';
import Demo from './Demo';
function App() {
  return (
    <Router>
        {/* <div className="container"> */}
        <div>
    <Routes>
       <Route path="/todos" element={<ListTodo/>}>
       </Route>
       <Route path="/listperson" element={<ListPerson/>}>
      </Route>
      <Route path="/home" element={<Home/>}>
      </Route>
      <Route path="/login" element={<Login/>}>
      </Route>
      <Route path="/home" element={<Home/>}>
      </Route>
      <Route path="/listshoes" element={<ListShoes/>}>
      </Route>
      <Route path="/elasticsearch" element={<Elasticsearch/>}>
      </Route>
      <Route path="/getCook" element={<GetCookie/>}>
      </Route>
      <Route path="/cart" element={<Cart/>}>
      </Route>
      <Route path="/demo" element={<Demo/>}>
      </Route>
    </Routes>

      {/* <ListPerson></ListPerson> */}
      {/* <MyDemo></MyDemo> */}
      <ToastContainer position="top-right" hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
    </div>
    </Router>
  );
}

export default App;
