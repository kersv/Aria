import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navigation from './routes/navigation/nav.js'
import Home from './routes/home/home.js'
import About from './routes/about/about';
import Footer from './components/footer/footer.js'
import SignIn from './routes/sign-in/sign-in';



const  App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigation/>}>
          <Route index element={<Home/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='signin' element={<SignIn/>}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
