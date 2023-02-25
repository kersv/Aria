import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navigation from './routes/navigation/nav.js'
import Home from './routes/home/home.js'
import About from './routes/about/about';



const  App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation/>}>
        <Route index element={<Home/>}/>
        <Route path='about' element={<About/>}/>
      </Route>
    </Routes>
  );
}

export default App;
