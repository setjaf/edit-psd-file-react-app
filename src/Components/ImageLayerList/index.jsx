import { Col, Form, Image, Row } from "react-bootstrap";
import PSDUtils from "../../Utils/PSDUtils";
import ImageFromSynthesizable from "../ImageFromSynthesizable";
import ImageLayerInputControl from "../ImageLayerInputControl";

function ImageLayerList({list = []}) {
    return (
        <>
            <h2>Capas de imagen</h2>           
                
            {
                list.map((layer, index)=>{
                    return(

                        <Row key={"imageLayer_"+index}>
                            <Col sm={3}>
                                <h5>{layer.name}</h5>
                            </Col>
                            <Col sm={9}>
                                
                                <Row>
                                    <Col sm={3}>
                                        <ImageFromSynthesizable synthesizable={layer} />                                           
                                    </Col>
                                    <ImageLayerInputControl layer={layer}/>

                                </Row>

                            </Col>

                        </Row>
                    )
                })
            }
        </>
        
    );
}

export default ImageLayerList;