import { Platform } from "react-native";

export default class AppConstants {
    static isAndroid = false;
    static isIOS = false;
    static isMacos = false;
    static isWindow = false;
    static isWeb = false;
    constructor() {
       AppConstants.isAndroid = Platform.OS === "android";
       AppConstants.isIOS = Platform.OS === "ios";
       AppConstants.isMacos = Platform.OS === "macos";
       AppConstants.isWeb = Platform.OS === "web";
       AppConstants.isWindow = Platform.OS === "windows";

    }


}


let appConstant: AppConstants;

export function getAppConstants(){
    if(!appConstant) {
        return appConstant = new AppConstants();
    }
    return appConstant;
}
