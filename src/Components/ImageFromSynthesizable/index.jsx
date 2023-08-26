import { useEffect, useState } from "react";
import PSDUtils from "../../Utils/PSDUtils";
import Image from 'react-bootstrap/Image';

function ImageFromSynthesizable({synthesizable = null}) {

    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        if (synthesizable) {
            PSDUtils.imageDataFromSynthesizable(synthesizable).then((result)=>{
                setImageData(result);
            })
        }
    }, [synthesizable]);

    return(
        <Image src={`${PSDUtils.imageDataToDataURL(imageData)}`} rounded style={{width:'100%'}}/>
    )
}

export default ImageFromSynthesizable;
