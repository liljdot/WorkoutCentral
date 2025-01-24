export const rejectJson = (res: Response) => {
    return new Promise((resolve, reject) => {
        res.json()
        .then(json => reject(json))
    })
}