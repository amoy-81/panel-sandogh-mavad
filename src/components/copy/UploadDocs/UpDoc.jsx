import React from 'react'
import UPBox from './UPBox'

export default function UpDoc({ document, changeHandler, errors, showErr , removeItem }) {
  return (
    <div className="w-1/2 px-2">
      <div className="rounded-xl ">

        <div className=" pb-4 p-2 bg-white rounded-lg ">
          <div className=" pb-4">
            <p className=" font-bold">محل تصاویر مدارک ثبتی و حقوقی</p>
          </div>
          <hr className="border-dashed border-gray-300" />
          <UPBox
            SelectDocument={document.bills}
            changeHandler={changeHandler}
            InputName="bills"
            titleText={"تصویر قرارداد اجاره یا سند مالکیت محل استقرار شرکت"}
            errors={errors.bills}
            showErr={showErr.bills}
            removeItem={removeItem}
          />
          <UPBox
            SelectDocument={document.register_doc}
            changeHandler={changeHandler}
            InputName="register_doc"
            titleText={" مدارک ثبتی شرکت شامل اساسنامه/لیست سهامداران/روزنامه رسمی آخرین تغییرات ثبتی شرکت/پروانه و جواز تاسیس"}
            errors={errors.register_doc}
            showErr={showErr.register_doc}
            removeItem={removeItem}
          />
          <UPBox
            SelectDocument={document.signatory}
            changeHandler={changeHandler}
            InputName="signatory"
            titleText={"تصویر مدارک هویتی اعضای هیئت مدیره  شرکت که صاحب امضا می باشند (تصویر کارت ملی و شناسنامه)"}
            errors={errors.signatory}
            showErr={showErr.signatory}
            removeItem={removeItem}
          />
        </div>



        <div className=" pb-4 p-2 mt-5 bg-white rounded-lg ">
          <div className=" pb-4">
            <p className=" font-bold">محل تصاویر مدارک مالی</p>
          </div>
          <hr className="border-dashed border-gray-300" />
          <UPBox
            SelectDocument={document.statements}
            changeHandler={changeHandler}
            InputName="statements"
            titleText={"اظهارنامه مالیاتی سال 1399 , 1400 , 1401"}
            errors={errors.statements}
            showErr={showErr.statements}
            removeItem={removeItem}
          />
          <UPBox
            SelectDocument={document.balances}
            changeHandler={changeHandler}
            InputName="balances"
            titleText={" اسکن گزارش معدل تمام حساب های فعال شرکت برای حداقل یک سال گذشته"}
            errors={errors.balances}
            showErr={showErr.balances}
            removeItem={removeItem}
          />
          <UPBox
            SelectDocument={document.insurances}
            changeHandler={changeHandler}
            InputName="insurances"
            titleText={"آخرین لیست بیمه کارکنان شرکت "}
            errors={errors.insurances}
            showErr={showErr.insurances}
            removeItem={removeItem}
          />

          <UPBox
            SelectDocument={document.knowledge}
            changeHandler={changeHandler}
            InputName="knowledge"
            titleText={"مستندات قرارداد ها (فروش محصول به مشتریان) و فروش فصلی سال 1401"}
            errors={errors.knowledge}
            showErr={showErr.knowledge}
            removeItem={removeItem}
          />
          <UPBox
            SelectDocument={document.resume}
            changeHandler={changeHandler}
            InputName="resume"
            titleText={"معدل حساب های فعال شرکت و گردش حساب خلاصه سال 1401"}
            errors={errors.resume}
            showErr={showErr.resume}
            removeItem={removeItem}
          />
          <UPBox
            SelectDocument={document.loans}
            changeHandler={changeHandler}
            InputName="loans"
            titleText={"لیست تسهیلات و وام های اخذ شده شرکت"}
            errors={errors.loans}
            showErr={showErr.loans}
            removeItem={removeItem}
          />
          <UPBox 
              SelectDocument={document.invoices}
              changeHandler={changeHandler}
              InputName="invoices"
              titleText={"پیش فاکتور مواد اولیه و قطعات مورد نیاز جهت تولید محصول طرح"}
              errors={errors.invoices}
              showErr={showErr.invoices}
              removeItem={removeItem}
            />
        </div>



        <div className=" pb-4 mt-5 p-2 bg-white rounded-lg ">
          <div className=" pb-4">
            <p className=" font-bold">محل تصاویر سایر مدارک  </p>
          </div>
          <hr className="border-dashed border-gray-300" />
          <UPBox
            SelectDocument={document.licenses}
            changeHandler={changeHandler}
            InputName="licenses"
            titleText={"تصویر آخرین مجوز ها و گواهی نامه های اخذ شده توسط شرکت"}
            errors={errors.licenses}
            showErr={showErr.licenses}
            removeItem={removeItem}
          />
          <UPBox
            SelectDocument={document.catalogs}
            changeHandler={changeHandler}
            InputName="catalogs"
            titleText={"مشخصات فنی و کاتالوگ محصول / خدمات"}
            errors={errors.catalogs}
            showErr={showErr.catalogs}
            removeItem={removeItem}
          />
        </div>









      </div>
    </div>
  )
}
