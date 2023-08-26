import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import PSDUtils from "../../Utils/PSDUtils";

function ImagePreviewCanvas({imageData = null}) {

    const [imageDataURL, setImageDataURL] = useState("");

    useEffect(() => {
        
        if (imageData)
            setImageDataURL(PSDUtils.imageDataToDataURL(imageData))

    }, [imageData]);

    return(
        <Card style={{width: '60%' }}>
            <Card.Img src={`${imageDataURL}`} />
            <Card.Body>
                <Card.Title>PSD original</Card.Title>
            </Card.Body>
        </Card>
    )
}

export default ImagePreviewCanvas;