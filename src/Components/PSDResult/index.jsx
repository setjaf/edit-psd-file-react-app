import { Button } from "react-bootstrap";
import { useLayers } from "../../Context/LayersContext";
import EditorPSD from "../../Utils/EditorPSD";


function PSDResult({filePSD = null}){

    let layers = useLayers();

    const handleOnClick = () => {
        let ePSD = new EditorPSD(filePSD, layers);
        ePSD.startEditPSDFile();
    }

    return(
        layers.length > 0 ?
        <Button onClick={()=>handleOnClick()}>Procesar PSD</Button>:
        null
    )
}

export default PSDResult;