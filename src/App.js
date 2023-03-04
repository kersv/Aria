import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navigation from './routes/navigation/nav.js'
import Home from './routes/home/home.js'
import About from './routes/about/about';
import Footer from './components/footer/footer.js'
import Auth from './routes/auth/auth';
import Room from './routes/room/room'



const  App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='auth' element={<Auth/>}/>
          <Route path='room' element={<Room/>}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
