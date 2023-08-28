import { Col, Form, Image } from "react-bootstrap";
import { useLayers, useLayersDispatch } from "../../Context/LayersContext";
import { useEffect, useState } from "react";
import FileUtils from "../../Utils/FileUtils";

function ImageLayerInputControl({layer=null}) {

    const [fileSelected, setfileSelected] = useState(null);
    const [urlFile, seturlFile] = useState('');

    let layersDispatch = useLayersDispatch();
    let layers = useLayers();

    useEffect(() => {
        if(fileSelected){
            layersDispatch({
                nameLayer: layer.name,
                typeLayer: 'image',
                imageData: fileSelected,
                type: 'add'
            });
            FileUtils.fileToURL(fileSelected).then((result)=>{
                seturlFile(result);
            })
        }else{
            layersDispatch({
                nameLayer: layer.name,
                type: 'delete'
            });
            seturlFile('');
        }    
    }, [fileSelected]);

    useEffect(() => {
        console.log(layers);
    }, [layers]);
    
    return (
        <>
            <Col sm={6}>
                <Form.Control type="file" onChange={(e)=>setfileSelected(e.target.files[0])} accept="image/*"/>
            </Col>
            <Col sm={3}>
                <Image src={`${urlFile}`} rounded style={{width:'100%'}}/>
            </Col>
        </>
    )

}

export default ImageLayerInputControl;