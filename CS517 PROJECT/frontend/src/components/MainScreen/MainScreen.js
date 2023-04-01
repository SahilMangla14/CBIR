// import ParticleBackground from '../ParticleBackground'
import './MainScreen.css'
import Topbar from './Topbar';
import 'bootstrap/dist/css/bootstrap.min.css'
// import './ImageUpload.js'
import ImageUpload from './ImageUpload.js';
import Results from './Results'
import { useEffect } from 'react';

function MainScreen() {
  return (
    <div className='mainscreen'>
      <Topbar />
      <ImageUpload />
      <Results />
    </div>
  );
}

export default MainScreen;
