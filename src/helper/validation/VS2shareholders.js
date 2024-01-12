export const  VS2shareholders = (data) => {
    const errArry = []
    data.map((item , index) => {
        const errObj = {}
        Object.keys(item).map(i => {
            if (item[i] === "") {
                errObj[i] = "این فیلد نباید خالی باشد"
            } else {
                delete errObj[i]
            }
        })
        errArry.push(errObj)
        
        // console.log(errObj);
    })

    return errArry
}

export const  V4AssetsVal = (data) => {
    const errArry = []
    data.map(i => {
        errArry.push({})
    })
    
    data.map((item , index) => {
        const errObj = {}
        Object.keys(item).map(i => {
            if (item[i] === "") {
                errObj[i] = "این فیلد نباید خالی باشد"
            } else {
                delete errObj[i]
            }
        })
        errArry[index] = errObj
    })

    console.log(errArry);
    return errArry
}

export const  Vconfirm = (data) => {
    const objectErr = {}
        Object.keys(data).map(i => {
            if (i !== "signature" && data[i] === "") {
                objectErr[i] = "این فیلد نباید خالی باشد"
            } else if (i === "signature" && data[i] === null) {
                objectErr[i] = "این فیلد نباید خالی باشد"
            } else {
                delete objectErr[i]
            }
        })
    return objectErr
}