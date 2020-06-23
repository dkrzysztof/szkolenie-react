import { RootState } from "./store";

export function mapStateToProps(state: RootState) {
    return state;
}

export function mapDispatchToProps(state: any) {
    return state;
}

export function capitalizeEachWordInString(str: string) {
    let splitStr = str.toLowerCase().split(" ");
    for (let i = 0; i < splitStr.length; i++) {

        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(" ");
}

export type MapDispatchToPropsType = ReturnType<typeof mapDispatchToProps>;
export type MapStateToPropsType = ReturnType<typeof mapStateToProps>;
