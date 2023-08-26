import { Col, Form, Image, Row } from "react-bootstrap";
import PSDUtils from "../../Utils/PSDUtils";
import ImageFromSynthesizable from "../ImageFromSynthesizable";

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
                                    <Col sm={6}>
                                        <Form.Control type="file"/>
                                    </Col>
                                    <Col sm={3}>
                                        <Image src="" rounded />
                                    </Col>

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