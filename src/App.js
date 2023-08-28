import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import PSDFileUpload from './Components/PSDFileUpload';
import { useState } from 'react';
import PSDInfo from './Components/PSDInfo';
import { LayersProvider } from './Context/LayersContext';
import PSDResult from './Components/PSDResult';


function App() {

  /**
   * psdFile
   * 
   * {psdFile: Psd, file: File}
   * 
   */
  const [psdFile, setPSDFile] = useState(null);



  return ( 

    <LayersProvider>
      {
        psdFile?
        <>
          <PSDInfo psdFile={psdFile.psdFile} />
          <PSDResult filePSD={psdFile.file}/>
        </>
        :
        <PSDFileUpload setPSDFile={setPSDFile} />
      }
    </LayersProvider>

  )
}

export default App;
