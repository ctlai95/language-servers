export const createDeferred = () => {
    let resolve
    let reject
    const promise = new Promise((res, rej) => {
        resolve = res
        reject = (e: Error) => rej(e)
    })
    return { promise, resolve, reject }
}
