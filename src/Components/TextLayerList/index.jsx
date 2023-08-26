import { Form, InputGroup } from "react-bootstrap";

function TextLayerList({list = []}) {
    return (
        <>
        <h2>Capas de texto</h2>
        {
            list.map((layer, index)=>{
                return(
                    <InputGroup key={"textLayer_" + index} className="pb-3">
                        <InputGroup.Text>{layer.name}</InputGroup.Text>
                        <Form.Control
                            value={layer.text}
                        />
                    </InputGroup>
                )
            })
        }
        </>
    );
}

export default TextLayerList;