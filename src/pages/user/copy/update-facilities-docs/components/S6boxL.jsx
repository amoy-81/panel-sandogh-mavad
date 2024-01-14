import React from 'react'
import DownloadBoxL from '../../../../../components/copy/viewDoc/DownloadBoxL';

export default function S6boxL({document , setDocment , reqData}) {
  const changeHandler = (e) => {
    const filesEvent = e.target.files;
    const filesList = []
    for (let i = 0 ; i < filesEvent.length ; i++) {
      filesList.push({file : filesEvent[i]})
    }
    setDocment({
      ...document,
      [e.target.name]: filesList
    });
    console.log(document);
  }
  console.log(reqData);
  return (
    <div className=" bg-c-4 rounded-xl p-5 mt-3">
        <div className=" pb-4">
            <p className=" font-bold"> اسناد </p>
        </div>
        <hr className="border-dashed border-gray-300" />
        {   
          
              Object.keys(reqData).map(( i , index ) => {
                  let ii = i === "f_balance" ? "balances" :
                  i === "f_bills" ? "bills" :
                  i === "f_catalog" ? "catalogs" :
                  i === "f_insurance" ? "insurances" :
                  i === "f_knowledge" ? "knowledge" :
                  i === "f_license" ? "licenses" :
                  i === "f_loans" ? "loans" :
                  i === "f_proforma" ? "invoices" :
                  i === "f_registration" ? "register_doc" :
                  i === "f_resume" ? "resume" :
                  i === "f_signatory" ? "signatory" :
                  i === "f_statement" ? "statements" : ""
                if (
                  ["f_balance" , "f_bills" , "f_catalog" , "f_insurance" , "f_knowledge" , "f_license" , "f_loans" , "f_proforma" , "f_registration" , "f_resume" , "f_signatory" , "f_statement"].includes(i)
                ) {
                  return(
                    <div key={index}>
                          <DownloadBoxL item={reqData} i={i} />
                          {
                            document[ii] === undefined ?
                              <label htmlFor={ii} className="text-yellow-400 text-xs w-full justify-center cursor-pointer">
                                برای بروزرسانی کلیک کنید
                              </label> :
                              <div>
                                {
                                  document[ii] && document[ii].map((item , keyNum)=> {
                                        return (
                                            <p key={keyNum} className="text-blue-400 text-xs w-full m-1 justify-center">
                                            {
                                              `نام فایل جدید : ${item.file.name}`
                                            }
                                            </p>
                                        )
                                    })
                                }
                                <label htmlFor={ii} className="text-yellow-400 m-1 text-xs w-full justify-center cursor-pointer">
                                  برای تغییر کلیک کنید
                                </label>
                              </div>

                          }
                          <input style={{ display: "none" }} id={ii} className="text-blue-400 text-xs " accept="application/pdf" type="file"  multiple onChange={changeHandler} name={ii} />
                          <br />
                        </div>
                        
                      )
                  } 
                }
              )
            }
          
    </div>
  )
}