import { NavigationContainer } from '@react-navigation/native'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { cacheFonts, cacheImages } from '../utils';
import { FontSource } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { getAppConstants } from '../utils/app.constant';
import AppProvider from '../context/globalContext';
import Dialog from '../dialog';

interface Props<T = void> {
    promises?: Array<Promise<any>>;
    images?: Array<string | number>;
    fonts?: Record<string, FontSource>;
    splashScreen?: JSX.Element;
    onPromisesResolved?(data: T): void;
}

/**
 * It helps configure (cache assets, data fetching) an app.
 * This component depends on several dependencies to work.
 * e.g. yarn add @react-navigation/native @react-navigation/bottom-tabs expo-splash-screen @react-navigation/native-stack
 * @param props Props<T>
 * @returns 
 */
const AppWrapper = <T,>(props: PropsWithChildren<Props<T>>) => {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        /**
         * Load app constants.
         */

        getAppConstants();
        /**
         * resolves all promises and toggle screen
         */
        const processProps = async () => {
            const { promises, onPromisesResolved, images, fonts } = props;

            try {

                if (promises) {
                    const promisesResponse: unknown = Promise.all(promises);
                    onPromisesResolved && onPromisesResolved(promisesResponse as T)
                }
                if (images) {
                    await cacheImages(images);
                }
                if (fonts) {
                    await cacheFonts(fonts)
                }
            } catch (error) {
                throw error;
            } finally {
                setLoaded(true);
                SplashScreen.hideAsync();
            }
        }

        processProps();
    }, [loaded]);

    /*     if (props.splashScreen && !loaded) {
            if (typeof props.splashScreen === "number") {
                return <SplashScreenImage source={props.splashScreen} />
            }
            return props.splashScreen;
        } */

    if (props.promises && !loaded) {
        SplashScreen.preventAutoHideAsync();
    }

    return (
        <AppProvider>
            {props.children}
            <Dialog />
        </AppProvider>
    )
}

export default AppWrapper

const styles = StyleSheet.create({})
