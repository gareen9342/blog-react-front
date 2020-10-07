export const dataURLtoFile = (dataurl, fileName) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], fileName, { type: mime })
}

/** 사용법
 * 
 * 
 *     var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
    console.log(file);
 * 
 */

//이미지 url만 뽑아 놓기
export const searchSrc = (root) => {
    const arr1 = root
        .split('img')
        .map((v) => v.includes('src') === true && v.split('src='))
    const arr2 = arr1.map((v) => v && v[1]?.split('></p'))
    return arr2
        .map((v) => v && v[0].slice(1, v[0]?.length - 1))
        .filter((v) => v !== false)
}

//blob 형태로 치환
export const DataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(',')
    const byteString =
        splitDataURI[0].indexOf('base64') >= 0
            ? atob(splitDataURI[1])
            : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i)

    return new Blob([ia], { type: mimeString })
}

export const Base64toServerImage = (fullstring) => {
    const changeStr = fullstring
        .split('>')
        .map((v) => {
            if (v.includes('<p')) {
                return v + '>'
            } else if (v.includes('</p')) {
                return v + '>'
            } else if (v.includes('<img')) {
                return false
            } else {
                return false
            }
        })
        .filter((v) => v !== false)
        .join('')

    return changeStr
}
