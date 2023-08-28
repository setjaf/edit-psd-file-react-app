import { Form, InputGroup } from "react-bootstrap";
import { useLayersDispatch } from "../../Context/LayersContext";
import TextLayerControl from "../TextLayerControl";

function TextLayerList({list = []}) {

    

    return (
        <>
        <h2>Capas de texto</h2>
        {
            list.map((layer, index)=>{
                return(
                    <InputGroup key={"textLayer_" + index} className="pb-3">
                        <InputGroup.Text>{layer.name}</InputGroup.Text>
                        <TextLayerControl layer={layer}/>
                    </InputGroup>
                )
            })
        }
        </>
    );
}

export default TextLayerList;