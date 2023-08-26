import { Col, Container, Row } from "react-bootstrap";
import ImagePreviewCanvas from "../ImagePreviewCanvas";
import PSDUtils from "../../Utils/PSDUtils";
import { useEffect, useState } from "react";
import TextLayerList from "../TextLayerList";
import ImageLayerList from "../ImageLayerList";

function PSDInfo({psdFile = null}) {

    const [imageData, setImageData] = useState(null);
    const [textListLayer, setTextListLayer] = useState([]);
    const [imageListLayer, setImageListLayer] = useState([]);

    useEffect(() => {
        if (psdFile!=null){
            PSDUtils.imageDataFromPSDFile(psdFile).then((result)=>{
                setImageData(result);
            });
            setTextListLayer(PSDUtils.getListTextLayers(psdFile));
            setImageListLayer(PSDUtils.getListImageLayers(psdFile));
        }
    }, [psdFile]);

    return (
        <Container fluid={true}>
            <Row >
                <Col md={6}>
                    <h1>Información del PSD</h1>
                    <TextLayerList list={textListLayer}/>
                    <ImageLayerList list={imageListLayer} />
                </Col>
                <Col md={6}>
                    <h1>Vista previa del PSD</h1>
                    <ImagePreviewCanvas imageData={imageData}/>
                </Col>
            </Row>
        </Container>
    );
}

export default PSDInfo;