export const Validation = (data , type) => {
    const errors =  {}
    const datas = data

    if (data.type === "genuine") {
        if (type === "singup") {
    
            if (!data.name.trim()) {
                errors.name = "این فیلد نباید خالی باشد";
            } else if (data.name) {
                delete errors.name;
            }
            
            if (!data.family.trim()) {
                errors.family = "این فیلد نباید خالی باشد"
            } else {
                delete errors.family
            }
            
 
            if (!data.national_code) {
                errors.national_code = "این فیلد نباید خالی باشد"
            } else if (data.national_code.length !== 10) {
                errors.national_code = "تعداد ارقام صحیح نمیباشد"
            } else {
                delete errors.national_code
            }

            if (!data.password) {
                errors.password = "این فیلد نباید خالی باشد";
            } else if (data.password.length < 3) {
                errors.password = "پسورد کوتاه می باشد"
            } else {
                delete errors.password
            }
            
            if (!data.password_confirmation) {
                errors.password_confirmation = "این فیلد نباید خالی باشد";
            } else if (data.password_confirmation !== data.password) {
                errors.password_confirmation = "پسورد وارد شده منطبق نمی باشد"
            } else {
                delete errors.password_confirmation
            }
            
            if (!data.phone) {
                errors.phone = "این فیلد نباید خالی باشد";
            } else if (!/^[0-9]+$/.test(data.phone)) {
                errors.phone = "باید فقط از اعداد تشکیل شود"
            } else if (data.phone.length < 11) {
                errors.phone = "تعداد ارقام صحیح نیست"
            } else {
                delete errors.phone
            }
            
            if (!data.is_confirmed) {
                errors.is_confirmed = "لطفا قوانین را تایید کنید";
            } else {
                delete errors.is_confirmed
            }
        }

    }
    // legal
    if (data.type === "legal") {

        
        if (type === "singup") {
    
            if (!data.name.trim()) {
                errors.name = "این فیلد نباید خالی باشد";
            } else if (data.name) {
                delete errors.name;
            }
            
            if (!data.company_name.trim()) {
                errors.company_name = "این فیلد نباید خالی باشد"
            } else {
                delete errors.company_name
            }
            
            if (!data.national_company) {
                errors.national_company = "این فیلد نباید خالی باشد"
            } else if (data.national_company.length !== 11) {
                errors.national_company = "تعداد ارقام صحیح نمیباشد"
            } else {
                delete errors.national_company
            }

            if (!data.password) {
                errors.password = "این فیلد نباید خالی باشد";
            } else if (data.password.length < 3) {
                errors.password = "پسورد کوتاه می باشد"
            } else {
                delete errors.password
            }
            
            if (!data.password_confirmation) {
                errors.password_confirmation = "این فیلد نباید خالی باشد";
            } else if (data.password_confirmation !== data.password) {
                errors.password_confirmation = "پسورد وارد شده منطبق نمی باشد"
            } else {
                delete errors.password_confirmation
            }
            
            if (!data.phone) {
                errors.phone = "این فیلد نباید خالی باشد";
            } else if (!/^[0-9]+$/.test(data.phone)) {
                errors.phone = "باید فقط از اعداد تشکیل شود"
            } else if (data.phone.length < 11) {
                errors.phone = "تعداد ارقام صحیح نیست"
            } else {
                delete errors.phone
            }
            
            if (!data.is_confirmed) {
                errors.is_confirmed = "لطفا قوانین را تایید کنید";
            } else {
                delete errors.is_confirmed
            }
        }

    }
    

    
    if (type === "login") {
        if (!data.username.trim()) {
            errors.username = "این فیلد نباید خالی باشد";
        } else if (data.username) {
            delete errors.username;
        }

        if (!data.password) {
            errors.password = "این فیلد نباید خالی باشد";
        } else if (data.password.length < 3) {
            errors.password = "پسورد کوتاه می باشد"
        } else {
            delete errors.password
        }
    }
    if (type === 'forgotpass') {
        if (!data.phone) {
            errors.phone = "این فیلد نباید خالی باشد";
        } else if (!/^[0-9]+$/.test(data.phone)) {
            errors.phone = "باید فقط از اعداد تشکیل شود"
        } else if (data.phone.length < 11) {
            errors.phone = "تعداد ارقام صحیح نیست"
        } else {
            delete errors.phone
        }
    }

    if (type === "addExpert") {
        Object.keys(data).map((item) => {
            if (item === "national_code") {
                if (!item) {
                    errors.national_code = "این فیلد نباید خالی باشد"
                } else if (item.length !== 10) {
                    errors.national_code = "تعداد ارقام واردشده صحیح نمی باشد"
                } else {
                    delete errors.national_code
                }
            }
        })
    }

    // upDoc
    if (type === "upDoc") {
        // console.log(errors);
        Object.keys(data).map((item) => {
            if (item === "title") {
                if (data[item] === "") {
                    errors[item] = "این فیلد نباید خالی باشد"
                    console.log(item);
                } else {
                    delete errors[item]
                }
            }
            if (item === "type_w") {
                if (data[item] === "") {
                    
                    errors.type_w = "لطفا یک مورد را انتخاب کنید"
                } else {
                    delete errors.type_w
                }
            } else {
                if (data[item] === null) {
                    errors[item] = "لطفا فایلی را وارد کنید"
                } else {
                    delete errors[item]
                }
            }
        })
    }

    // tiket
    if (type === "tiket") {
        if (!data.title.trim()) {
            errors.title = "این فیلد نباید خالی باشد";
        } else if (data.title) {
            delete errors.title;
        }
        
        if (!data.category.trim()) {
            errors.category = "این فیلد نباید خالی باشد";
        } else if (data.category) {
            delete errors.category;
        }

        if (!data.priority.trim()) {
            errors.priority = "این فیلد نباید خالی باشد";
        } else if (data.priority) {
            delete errors.priority;
        }

        if (!data.body.trim()) {
            errors.body = "این فیلد نباید خالی باشد";
        } else if (data.body) {
            delete errors.body;
        }
    }

    return errors;
}