import './App.css';
import {Routes, Route} from 'react-router-dom'
import Navigation from './components/navigationComponent/nav.js'
import Home from './components/homeComponent/home.js'

function App() {
  return (
    <Routes>
      <Route path = '/' elements = {<Navigation />}>
        <Route index element = {<Home />}/>
      </Route>
    </Routes>
  );
}

export default App;
