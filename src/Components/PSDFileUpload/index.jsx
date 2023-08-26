import { useState } from "react";
import PSDUtils from "../../Utils/PSDUtils";

function PSDFileUpload({setPSDFile = () => {}}) {

    const handleOnChangeFileInput = async (e) => {
        console.log(e);
        let file = e.target.files[0];
        let psdFile = await PSDUtils.parsePSD(file);
        console.log(psdFile);
        setPSDFile(psdFile)
    }                                
    
    
    return(
        <div>
            {
            // Todo: Poner validación para solo aceptar psd y psb
            }
            <input type="file" onChange={(e)=>{handleOnChangeFileInput(e)}} />   
        </div>
    )

}

export default PSDFileUpload;