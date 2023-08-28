import { useEffect, useState } from "react";
import { useLayers, useLayersDispatch } from "../../Context/LayersContext";
import { Form } from "react-bootstrap";


function TextLayerControl ({layer = null}){

    const [textValue, setTextValue] = useState(layer?.text);

    let layersDispatch = useLayersDispatch();

    let layers = useLayers();

    useEffect(() => {
        
        if(textValue && textValue != layer.text)
            layersDispatch({
                nameLayer:layer.name,
                typeLayer: 'text',
                type: 'add',
                text: textValue
            })
        else if(textValue && textValue == layer.text)
            layersDispatch({
                nameLayer:layer.name,
                type: 'delete'
            })

    }, [textValue]);

    useEffect(() => {
        if(layer)
            setTextValue(layer.text)
    }, [layer]);

    useEffect(() => {
        console.log(layers);
    }, [layers]);


    return (
        <Form.Control
            value={textValue}
            onChange={e => setTextValue(e.target.value)}
        />
    )
}

export default TextLayerControl;