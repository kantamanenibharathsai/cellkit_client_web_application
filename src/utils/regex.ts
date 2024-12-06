export const checkForNumbers = (string: string) => {

    if (/\d/.test(string)) {
        return true
    }
    return false
}

export const checkForSpecialCharacters = (string: string) => {
    if (/[^a-zA-Z0-9]/.test(string)) {
        return true
    }
    return false
}

export const validatepinCode = (string: string) => {
    if (!/^\d*$/.test(string)) {
        return true
    }
    return false
}