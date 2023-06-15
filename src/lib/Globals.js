// structure of local storage for this app
// 
// USER_NAME = currently logged in user's username (example eric, keqin, dan etc)

// object USER_NAME = {
        //     POGFilter{
        //         AUTHORIZED_STORE_LIST : "4,5,6,8"
        //         SELECTED_STORE_LIST : "4,5"
        //         SELECTED_GONDOLA_LIST : "22,23,27,32,45,67"
        //         SELECTED_SUPERCATEGORY_LIST :"'catagory_1','catagory_2','catagory_3'"
        //         SELECTED_CATEGORY_LIST
        //     }
// }

//   URL and server 
export const PRODUCT_IMAGE_URL = 'https://imgserver.sungalcorp.synology.me/'
export const API_SERVER_URL    = 'https://apiserver.sungalcorp.synology.me/'

//   user info and authorization
export const USER_NAME = 'USER_NAME'
//export const AUTHORIZED_STORE_LIST_FILTER = '.POGFilter.AUTHORIZED_STORE_LIST'

// filtering constants
export const SELECTED_STORE_LIST_FILTER   = '.POGFilter.SELECTED_STORE_LIST'
export const SELECTED_GONDOLA_LIST_FILTER = '.POGFilter.SELECTED_GONDOLA_LIST'
export const SELECTED_SUPERCATEGORY_LIST_FILTER ='.POGFilter.SELECTED_SUPERCATEGORY_LIST'
export const SELECTED_CATEGORY_LIST_FILTER ='.POGFilter.SELECTED_CATEGORY_LIST'
//other constants
export const DEFAULT_DETECTED_UPC = 'POGUPC'

// this changes the key colors to different schemes
export const KEY_COLORS_OPTION = 'keycolors3'

//general purpose functions
export const LIST_TO_COMMA_DELIMITTED_TEXT_STRING = (mList) =>{
    var retString= ""
    console.log("---> isNaN('5') = ",isNaN('5'))
    for (const item of mList){
        retString += ((isNaN(item) ?  "'" + item + "'" : item ) +',')
    }
    return retString.substring(0,retString.length - 1)

}