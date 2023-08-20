import { klinesResult } from "../../types/IKlines";

export class helpers {
    public static parseKlines(resultKlines: klinesResult[]): number[][]{
        const parsedKlines: number[][] = []
        for(let i = 0; i < resultKlines.length; i++){
            parsedKlines.push([])
            for(let j = 1; j < 5; j++){
                if (typeof resultKlines[i][j] === "string" ) {
                    const parsedValue = parseFloat(resultKlines[i][j] as string);
                    parsedKlines[i].push(parsedValue);
                } 
                
            }
        }
        return parsedKlines
    }
}