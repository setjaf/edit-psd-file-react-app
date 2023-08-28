import { createContext, useContext, useReducer } from "react";


export const LayersContext = createContext(null);
export const LayersDispatchContext = createContext(null);

export function LayersProvider({children}) {
    
    const [layers, dispatch] = useReducer(layersReducer,[])

    return(
        <LayersContext.Provider value={layers}>
            <LayersDispatchContext.Provider value={dispatch}>
                {children}
            </LayersDispatchContext.Provider>
        </LayersContext.Provider>
    )

}

export function useLayers(){
    return useContext(LayersContext);
}

export function useLayersDispatch(){
    return useContext(LayersDispatchContext);
}

/**
 * Reducer of layers
 *
 * @param {Array} layers - A list of object({
 *  name,
 *  type,
 *  text,
 *  imageData
 * }) layers
 * 
 * @param {Object} action - An object representing action ({
 *  nameLayer,
 *  typeLayer,
 *  text,
 *  imageData,
 *  type
 * })
 */

function layersReducer(layers, action) {
    
    switch (action.type) {
        case 'add':
            
            if (layers.some((l)=>l.name == action.nameLayer)) {

                return layers.map((l)=>{

                    if(l.name == action.nameLayer){
                        if (action.typeLayer == 'text') 
                            l.text = action.text;
                        else
                            l.imageData = action.imageData;  
                        return l;
                    }else{
                        return l;
                    }

                })
            }else{
                return [...layers, {
                    name: action.nameLayer,
                    type: action.typeLayer,
                    text: action.text,
                    imageData: action.imageData
                }]
            }

        case 'delete':

            return layers.filter((l)=> l.name != action.nameLayer);
            
    
        default:
            break;
    }
    
}
