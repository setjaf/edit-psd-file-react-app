import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import PSDFileUpload from './Components/PSDFileUpload';
import { useState } from 'react';
import PSDInfo from './Components/PSDInfo';


function App() {

  const [psdFile, setPSDFile] = useState(null);



  return ( 
      <>          
        {
          psdFile?
          <PSDInfo psdFile={psdFile} />
          :
          <PSDFileUpload setPSDFile={setPSDFile} />
        }
      </>      
  );
}

export default App;
