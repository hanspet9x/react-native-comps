import { Asset } from "expo-asset";
import { Image } from "react-native";
import * as Font from 'expo-font';
import { FontSource } from "expo-font";

export const cacheImages = async (images: Array<string | number>):Promise<Array<boolean | Asset[]>>  => {

    try {       
        const promisesImages = images.map((imageSource) => {
            if(typeof imageSource === "string") {
                return Image.prefetch(imageSource);
            }
            return Asset.loadAsync(imageSource);
        });    
        return await Promise.all(promisesImages);
    } catch (error) {
        throw error;
    } 
}

export const cacheFonts = async (fonts: Record<string, FontSource>): Promise<void> => {
    return await Font.loadAsync(fonts);
}