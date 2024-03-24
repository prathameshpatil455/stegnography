import './App.css';
import MyComponent from './steganography';
import NavBar from "./NavBar";
import Home from "./home";
import Encrpytion from "./Encrpytion";
import Decrpytion from "./Decrpytion";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


const Layout = ({ children }) => (
  <div className="main-contain">
    <NavBar />
    <div className="main-content">{children}</div>
  </div>
)

const App = () => {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout children={<Home />}/>} />
        <Route path="/encryption" element={<Layout children={<Encrpytion />}/>} />
        <Route path="/decryption" element={<Layout children={<Decrpytion />}/>} />
      </Route>
    )
  );


  return (
    <RouterProvider router={router} />
  )
};

export default App;
