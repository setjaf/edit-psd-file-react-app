import Psd from "@webtoon/psd";

export default class PSDUtils {
    static parsePSD = async (file = null) => {

        const result = await file.arrayBuffer();
        const psdFile = Psd.parse(result);
        
        return psdFile;       
    }

    static imageDataFromPSDFile = async(psdFile = null) => {

        const compositeBuffer = await psdFile.composite();
        const imageData = new ImageData(
            compositeBuffer,
            psdFile.width,
            psdFile.height
        );

        return imageData;
    }
    
    static imageDataFromSynthesizable = async(object = null) => {

        const compositeBuffer = await object.composite();
        const imageData = new ImageData(
            compositeBuffer,
            object.width,
            object.height
        );

        return imageData;
    }

    static imageDataToDataURL = (imgData = null) => {

        if(imgData == null)
            return '';

        var canvas = document.createElement("canvas");
        canvas.width = imgData.width;
        canvas.height = imgData.height;
        var ctx = canvas.getContext("2d");
        ctx.putImageData(imgData, 0, 0);

        return canvas.toDataURL("image/png");    
        
    }

    static getListTextLayers = (psdFile) => {        
        
        return psdFile.layers.filter((layer)=>layer.text!=undefined);

    }

    static getListImageLayers = (psdFile) => {        
        
        return psdFile.layers.filter((layer)=>layer.text==undefined);

    }
}