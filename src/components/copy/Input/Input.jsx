import React from "react";
import immm from '../../assets/imges/hide.png'
const Input = ({ lable, type, src , changeHandler , value , name , onFocus } ) => {
        if (type === "text") {
            return (
                <div class="relative">
                    <label for="form-1"  className="absolute top-0 -translate-y-1/2 right-3 bg-white text-sm text-c-16 px-1">
                        {lable}
                    </label>
                    <img className="absolute top-1/2 -translate-y-1/2 right-3 w-6 h-6" src={src} alt="" />
                    <input style={{paddingRight: "45px"}} onFocus={onFocus} onChange={changeHandler} value={value} name={name} id="form-1" className="border rounded-md	border-gray-300 focus-within:outline-none focus-within:border-black bg-white w-full py-4 pl-3.5 pr-c-20" type={type} />       
                    
                </div>
            )
        }
        if (type === "password") {
            
            return (
                <div className="relative">
                <label for="form-2" className="absolute top-0 -translate-y-1/2 right-3 bg-white text-sm text-c-16 px-1">
                    {lable}
                </label>
                <img className="absolute top-1/2 -translate-y-1/2 right-3 w-6 h-6" src={src} alt="" />
                <input style={{paddingRight: "45px"}} onFocus={onFocus} onChange={changeHandler} value={value} name={name} id="form-2" className="border rounded-md border-gray-300 focus-within:outline-none focus-within:border-black bg-white w-full py-4 px-c-20" type={type} />
                <button className="absolute top-1/2 -translate-y-1/2 left-3 w-6 h-6">
                  <img  className="w-full h-full" src={immm} alt="" />
                </button>
              </div>
            );
        }
};

export default Input;
