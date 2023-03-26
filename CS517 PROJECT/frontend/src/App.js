import "./App.css";
import ParticleBackground from "./components/ParticleBackground";
// import About from './components/About/About'
// import {Link} from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import MainScreen from "./components/MainScreen/MainScreen";

function App() {
  return (
    <div>
      <Router>
      <div className="particle-js">
        <ParticleBackground />
      </div>
      {/* </ParticleBackground> */}
      <Routes>
        <Route exact path='/' Component={CenterTitle} />
        <Route exact path='/MainScreen' Component={MainScreen} />
      </Routes>
      {/* <CenterTitle /> */}
      {/* <About /> */}
      </Router>
    </div>
  );
}

function CenterTitle() {
  return (
      <div id="text_div center_all">
        <div className="center_all">
          <h1 className="custom-subTitle">CONTENT BASED IMAGE RETRIEVAL</h1>
        </div>
      </div>
  );
}

export default App;
