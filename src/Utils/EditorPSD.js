var Dropbox = require('dropbox').Dropbox;

export default class EditorPSD{

    #accessToken = 'sl.Bk8avkcZyvKZ7wEDJ9DNlhoVtJFob-46SUaV8QYffbRxg9XGgUvGt6ZZNOMu6eh_DZLJR5EzogqgJZ6W4xeD4CC7PjzeNXWbAJSaProc-v58Pj0-vdSImKgh5NQhm0QzjBK8vlSqm5tV4Ba3bXGqPSE';
    #dbx;
    #psdInfo={};
    #layersToEditList=[];
    #current_timestamp = Date.now()

    constructor(filePSD = null, layersToEdit = null){

        if(!filePSD && !layersToEdit)
            throw new Exception("Invalid parameters in constructor")

        this.#dbx = new Dropbox({accessToken: this.#accessToken});

        this.#psdInfo = {
            file: filePSD,
            pathDBX: null
        }

        this.#layersToEditList = layersToEdit;

        console.log(this.#psdInfo);
    }

    /**
     *  Upload all files selected including psd and image files
     */

    async uploadFilesToDBX(){

        //#region Upload PSD file
        let fileName = "PSDFile.psd"
        let pathPSDFile = "/origin/"+this.#current_timestamp+"/"+fileName;

        let filesUploadArgObject = {
            contents: this.#psdInfo.file,
            path: pathPSDFile,
            autorename: true,
            mute: true,
            strict_conflict: false
        }

        let result = await this.#dbx.filesUpload(filesUploadArgObject);

        this.#psdInfo.pathDBX = result.result.path_display;

        console.log(this.#psdInfo);

        //#endregion

        //#region Upload image layer files
        await this.#layersToEditList.reduce(async (previusPromise,l,index)=>{
            
            await previusPromise;

            if (l.type=='image'){

                let extension = l.imageData.type.split("/")[1];
                let fN = "image_"+index+"."+extension;

                let pathImageFile = "/origin/"+this.#current_timestamp+"/"+fN;

                filesUploadArgObject = {
                    contents: l.imageData,
                    path: pathImageFile,
                    autorename: true,
                    mute: true,
                    strict_conflict: false
                }

                let resultImage = await this.#dbx.filesUpload(filesUploadArgObject);

                let indexReal = this.#layersToEditList.findIndex((x)=>x.name == l.name);
                
                this.#layersToEditList[indexReal].path = resultImage.result.path_display;
                
                console.log(this.#layersToEditList);

            }            

            return Promise.resolve();

        }, Promise.resolve());
        //#endregion

    }

    async createAPIjson(){

        let jsonAPI = {
            "inputs": [],
            "options": {
              "manageMissingFonts": "useDefault",
              "layers": []
            },
            "outputs": [
              {
                "storage": "dropbox",
                "href": null,
                "type": "image/png"
              }
            ]
        };

        let urlPSDResult = await this.#dbx.filesGetTemporaryLink({path: this.#psdInfo.pathDBX});

        console.log(urlPSDResult);

        jsonAPI.inputs = [{storage:"dropbox", href:urlPSDResult.result.link}];

        this.#layersToEditList.reduce(async (previusPromise,l)=>{
            await previusPromise;

            let layerInfo = {
                name:l.name,
                edit: {}
            }

            switch (l.type) {
                case "text":

                    layerInfo.text = { content: l.text }

                    break;
                
                case "image":   
                
                    console.log(l);

                    alert();

                    let urlImageResult = await this.#dbx.filesGetTemporaryLink({path: l.path});

                    layerInfo = {...layerInfo,
                        locked : false,
                        visible : true,
                        input: {
                            storage:"dropbox",
                            href: urlImageResult.result.link
                        }
                    }

                    break;
            }

            jsonAPI.options.layers.push(layerInfo);

            return Promise.resolve();

        }, Promise.resolve());

        let commit_info = {
            path: "/result/"+this.#current_timestamp+"/image.png", 
            mode: { '.tag': 'add' },
            autorename: true,
            mute: true,
            strict_conflict: false
        };
        
        let urlUploadImageResult = await this.#dbx.filesGetTemporaryUploadLink({duration:3600, commit_info: commit_info});

        console.log("Upload Link Result", urlUploadImageResult);

        jsonAPI.outputs[0].href = urlUploadImageResult.result.link;

        console.log("JSON completo", jsonAPI);
    }

    async startEditPSDFile () {
        await this.uploadFilesToDBX();
        await this.createAPIjson();
    }

}