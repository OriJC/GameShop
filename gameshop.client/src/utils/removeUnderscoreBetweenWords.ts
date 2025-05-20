export const removeUnderscoreBetweenWords = (str: string | undefined) =>{
    if(str == undefined) return ''
    let prev;
        do {
            prev = str;
            str = str.replace(/_?([A-Z0-9]+)_([A-Z0-9]+)_?/g, (match, p1, p2) => {
            return p1 + ' ' + p2;
            });
        } while (str !== prev);
        return str.trim();
}