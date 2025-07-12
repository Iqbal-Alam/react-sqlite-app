
import {lazy, Suspense} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

const Login = lazy(()=> import('./components/Login'));
const Signup = lazy(()=> import('./components/Signup'))
const Dashboard = lazy(()=> import('./components/Dashboard'));
const AddProduct = lazy(()=> import('./components/AddProduct'));

function App() {

  return (
    <>
        <Router>
            <Suspense fallback={<h1>Loading..</h1>}>
                <Routes>
                    <Route path='' element={<Login />}></Route>
                    <Route path='signup' element={<Signup />}></Route>
                    <Route path='dashboard' element={<Dashboard />}></Route>
                    <Route path='add-product' element={<AddProduct />}></Route>
                </Routes>
            </Suspense>
        </Router>

    </>
  );
}

export default App;
