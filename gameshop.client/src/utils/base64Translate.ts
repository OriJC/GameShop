export const base64ToFile = (base64String: string, fileName: string) : File | null=> {
    if(!base64String) return null
      
    const arr= base64String.split(',');
    if(arr.length !== 2) return null;

    const mimeMatch = arr[0].match(/:(.*?);/);
    if(!mimeMatch || !mimeMatch[1]) return null;
    const mime = mimeMatch[1]
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mime });
    return new File([blob], fileName, { type: mime });
}