import { useState } from "react";
import PSDUtils from "../../Utils/PSDUtils";

function PSDFileUpload({setPSDFile = () => {}}) {

    const handleOnChangeFileInput = async (e) => {
        // console.log(e);
        let file = e.target.files[0];
        let psdFile = await PSDUtils.parsePSD(file);
        // console.log({psdFile:psdFile, file: file});
        setPSDFile({psdFile:psdFile, file: file})
    }                                
    
    
    return(
        <div>
            {
            // Todo: Poner validación para solo aceptar psd y psb
            }
            <input type="file" onChange={(e)=>{handleOnChangeFileInput(e)}} accept=".psd"/>   
        </div>
    )

}

export default PSDFileUpload;