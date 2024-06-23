import { toPascalCase } from "@utils/index"

export const languageFix = ( language: string ) => {
    return toPascalCase(language)
}