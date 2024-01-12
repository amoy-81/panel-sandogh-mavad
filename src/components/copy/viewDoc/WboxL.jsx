import React from 'react'
import DownloadBoxL from './DownloadBoxL'

export default function WboxL({reqData}) {
  return (
    <div>
      <div className=" bg-p-2 rounded-xl p-5 mt-3">
          <div className=" pb-4">
              <p className=" font-bold"> محل تصاویر مدارک ثبتی و حقوقی </p>
          </div>
          <hr className="border-dashed border-gray-300" />
          {
              reqData.warranty && reqData.warranty.map((item) => {
                return Object.keys(item).map(( i , index ) => {
                  if (
                    ["bills","registration_doc","signatory"].includes(i) &&
                    item[i].length > 0
                  ) {
                      return(
                          <DownloadBoxL key={index} item={item} i={i} />
                        )
                    } 
                  }
                )
              })
            }
      </div>
      <div className=" bg-p-2 rounded-xl p-5 mt-3">
          <div className=" pb-4">
              <p className=" font-bold"> اسناد </p>
          </div>
          <hr className="border-dashed border-gray-300" />
          {
              reqData.warranty && reqData.warranty.map((item) => {
                return Object.keys(item).map(( i , index ) => {
                  if (
                    ["balance", "insurance", "knowledge", "loans", "proforma", "resume", "statement"].includes(i) &&
                    item[i].length > 0
                  ) {
                      return(
                          <DownloadBoxL key={index} item={item} i={i} />
                        )
                    } 
                  }
                )
              })
            }
      </div>
      <div className=" bg-p-2 rounded-xl p-5 mt-3">
          <div className=" pb-4">
              <p className=" font-bold"> محل تصاویر سایر مدارک </p>
          </div>
          <hr className="border-dashed border-gray-300" />
          {
              reqData.warranty && reqData.warranty.map((item) => {
                return Object.keys(item).map(( i , index ) => {
                  if (
                    ["catalog","license"].includes(i) &&
                    item[i].length > 0
                  ) {
                      return(
                          <DownloadBoxL key={index} item={item} i={i} />
                        )
                    } 
                  }
                )
              })
            }
      </div>
    </div>
  )
}