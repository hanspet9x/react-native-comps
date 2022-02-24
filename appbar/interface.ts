
export interface IAppBarIcons {
    title: string;
    show: boolean;
    icon: JSX.Element;
}

export type TAction = {
    title: string;
    index: number;
}

export type TAppBarHiddenOption = {
    icons: IAppBarIcons[],
    onIconPresed(icon: TAction): void;
    offsetCount: number;
}

export interface IAppBar {
    title: string;
    subTitle?: string;
    primaryIcon?: JSX.Element;
    isBack?: boolean;
    onBackPress?():void;
    noBgColor?: boolean;
    /**
     * {
            title: string;
            show: boolean;
            icon: JSX.Element;
        }
     */
    secondaryIcons?: IAppBarIcons[];
    /**
     * It return the icon name and index
     * @param dataArgs TAction - {title: string, index: number}
     */
    onActionClicked?(dataArgs: TAction): void;

}