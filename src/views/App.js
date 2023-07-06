import './App.scss';

import MyDemo from '../components/demo/MyDemo';
import ListTodo from './Todos/ListTodo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import ListPerson from './ListPersons/ListPerson';
import Home from './Home/Home';
import Login from './Login/Login';
import ListShoes from './ListShoes/ListShoes';
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
    </Routes>

      {/* <ListPerson></ListPerson> */}
      {/* <MyDemo></MyDemo> */}
      <ToastContainer position="top-right" hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
    </div>
    </Router>
  );
}

export default App;
