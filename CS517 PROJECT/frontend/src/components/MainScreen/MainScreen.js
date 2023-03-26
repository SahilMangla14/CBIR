// import ParticleBackground from '../ParticleBackground'
import './MainScreen.css'
import Topbar from './Topbar';
import 'bootstrap/dist/css/bootstrap.min.css'
// import './ImageUpload.js'
import ImageUpload from './ImageUpload.js';

function MainScreen() {
  return (
    <div className='mainscreen'>
      <Topbar />
      <ImageUpload />
    </div>
  );
}

export default MainScreen;
