import React, { useState } from "react";

export const TashilatContext = React.createContext();

export default function TashilatProvider({ children }) {
  const [stepOne, setStepOne] = useState({
    user_id: "",
    type: "facilities",
    title: "",
    type_f: "leasing",
    places: [
      {
        scope: "workHouse",
        address: "",
        meterage: "",
        ownership: "owner",
        count: "",
      },
      {
        scope: "factory",
        address: "",
        meterage: "",
        ownership: "owner",
        count: "",
      },
      {
        scope: "storeHouse",
        address: "",
        meterage: "",
        ownership: "owner",
        count: "",
      },
    ],
    history: "",
    activity: "",
    is_knowledge: false,
    // confirmation: "",
    // expiration: "",
    // area: "",
  });
  const [stepTwo, setStepTwo] = useState(
    //shareholder
  {
      facilities_id:"",
      shareholders:[
        {
          name:"",
          type:"genuine",
          n_certificate:"",
          n_national:"",
          count:"0",
          percent:"0",
          cost:"0",
          education:""
        },
      ],
      boards:[ 
        { 
            name:"", 
            type:"genuine", 
            position:"", 
            n_national:"", 
            birth_date:"", 
            education:"", 
            study:"" 
        } ,
      ],
      residences:[
        {
          name:"",
          position:"",
          address:""
        }
      ],
      manpowers:[
          {
              name:"",
              position:"",
              level_education:"",
              study:"",
              type_contract:"full",
              work_experience:"",
              important:""
          }
      ],
      educational:[
          {
              name:"",
              university:"",
              study:"",
              position:"",
              records:""
          }
      ],
      sum_count:0,
      sum_percent:0,
      sum_cost:0,
      number:"77",
      date:"2022-04-05",
  });
  const [stepThree, setStepThree] = useState({
    
      facilities_id:"",
      products:[
          {
              name:"",
              customer:"",
              specifications:"",
              competitor:"",
              sales_amount:"",
              is_confirmation: false
          }
      ]
  
  });
  
  const [stepFour, setStepFour] = useState({
    facilities_id:1,
    banks:[
        {
            name:"",
            branch:"",
            account_number:""
        }
    ],
    active_facilities:[
        {
            year:"",
            name:"",
            amount_f:"",
            type_f:"",
            rate:"",
            type_collateral:"",
            n_refunds:"",
            n_remaining:"",
            amount_installment:"",
            remaining_f:"",
            settlement_time:"" //2022-03-03
        }
    ],
    active_warranty:[
        {
            name:"",
            amount:"",
            subject:"",
            institution:"",
            type_w:"",
            type_collateral:"",
            deposit_amount:"",
            received:"", //2022-10-10
            due_date:""  //2022-10-10
        }
    ],
    benefits:[
        {
            account:"NetSales",
            last_balance_a:"", //55
            last_balance_d:"1402", //2022-10-10
            last_year_a:"", //55
            last_year_d:"1401", //2022-10-10
            two_years_a:"", //55
            two_years_d:"1400", //2022-10-10
            three_years_a:"", //55
            three_years_d:"1399" //2022-10-10
        },
        {
          account:"CostOfgoodssold",
          last_balance_a:"", //55
          last_balance_d:"1402", //2022-10-10
          last_year_a:"", //55
          last_year_d:"1401", //2022-10-10
          two_years_a:"", //55
          two_years_d:"1400", //2022-10-10
          three_years_a:"", //55
          three_years_d:"1399" //2022-10-10
      },
      {
        account:"GrossProfit",
        last_balance_a:"", //55
        last_balance_d:"1402", //2022-10-10
        last_year_a:"", //55
        last_year_d:"1401", //2022-10-10
        two_years_a:"", //55
        two_years_d:"1400", //2022-10-10
        three_years_a:"", //55
        three_years_d:"1399" //2022-10-10
    },
    {
      account:"SellingAdministrativeAndGeneralExpenses",
      last_balance_a:"", //55
      last_balance_d:"1402", //2022-10-10
      last_year_a:"", //55
      last_year_d:"1401", //2022-10-10
      two_years_a:"", //55
      two_years_d:"1400", //2022-10-10
      three_years_a:"", //55
      three_years_d:"1399" //2022-10-10
  },
  {
    account:"OtherOperatingExpenses",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"", //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"", //55
    three_years_d:"1399" //2022-10-10
},
{
  account:"OperatingProfit",
  last_balance_a:"", //55
  last_balance_d:"1402", //2022-10-10
  last_year_a:"", //55
  last_year_d:"1401", //2022-10-10
  two_years_a:"", //55
  two_years_d:"1400", //2022-10-10
  three_years_a:"", //55
  three_years_d:"1399" //2022-10-10
},
{
  account:"financialCosts",
  last_balance_a:"", //55
  last_balance_d:"1402", //2022-10-10
  last_year_a:"", //55
  last_year_d:"1401", //2022-10-10
  two_years_a:"", //55
  two_years_d:"1400", //2022-10-10
  three_years_a:"", //55
  three_years_d:"1399" //2022-10-10
},
{
  account:"NonOperatingExpenses",
  last_balance_a:"", //55
  last_balance_d:"1402", //2022-10-10
  last_year_a:"", //55
  last_year_d:"1401", //2022-10-10
  two_years_a:"", //55
  two_years_d:"1400", //2022-10-10
  three_years_a:"", //55
  three_years_d:"1399" //2022-10-10
},
{
  account:"NonOperatingIncome",
  last_balance_a:"", //55
  last_balance_d:"1402", //2022-10-10
  last_year_a:"", //55
  last_year_d:"1401", //2022-10-10
  two_years_a:"", //55
  two_years_d:"1400", //2022-10-10
  three_years_a:"", //55
  three_years_d:"1399" //2022-10-10
},
{
  account:"ProfitBeforeTax",
  last_balance_a:"", //55
  last_balance_d:"1402", //2022-10-10
  last_year_a:"", //55
  last_year_d:"1401", //2022-10-10
  two_years_a:"", //55
  two_years_d:"1400", //2022-10-10
  three_years_a:"", //55
  three_years_d:"1399" //2022-10-10
},
{
  account:"incomeTax",
  last_balance_a:"", //55
  last_balance_d:"1402", //2022-10-10
  last_year_a:"", //55
  last_year_d:"1401", //2022-10-10
  two_years_a:"", //55
  two_years_d:"1400", //2022-10-10
  three_years_a:"", //55
  three_years_d:"1399" //2022-10-10
},
{
  account:"NetProfit",
  last_balance_a:"", //55
  last_balance_d:"1402", //2022-10-10
  last_year_a:"", //55
  last_year_d:"1401", //2022-10-10
  two_years_a:"", //55
  two_years_d:"1400", //2022-10-10
  three_years_a:"", //55
  three_years_d:"1399" //2022-10-10
},
{
  account:"OtherAdjustments",
  last_balance_a:"", //55
  last_balance_d:"1402", //2022-10-10
  last_year_a:"", //55
  last_year_d:"1401", //2022-10-10
  two_years_a:"", //55
  two_years_d:"1400", //2022-10-10
  three_years_a:"", //55
  three_years_d:"1399" //2022-10-10
},
{
  account:"RetainedEarnings",
  last_balance_a:"", //55
  last_balance_d:"1402", //2022-10-10
  last_year_a:"", //55
  last_year_d:"1401", //2022-10-10
  two_years_a:"", //55
  two_years_d:"1400", //2022-10-10
  three_years_a:"", //55
  three_years_d:"1399" //2022-10-10
},
    ],
    assets:[
        {
            account:"CashBalanceBank",
            last_balance_a:"", //55
            last_balance_d:"1402", //2022-10-10
            last_year_a:"", //55
            last_year_d:"1401", //2022-10-10
            two_years_a:"",  //55
            two_years_d:"1400", //2022-10-10
            three_years_a:"",  //55
            three_years_d:"1399", //2022-10-10
            is_asset:true
        },
        {
          account:"ShortTermInvestments",
          last_balance_a:"", //55
          last_balance_d:"1402", //2022-10-10
          last_year_a:"", //55
          last_year_d:"1401", //2022-10-10
          two_years_a:"",  //55
          two_years_d:"1400", //2022-10-10
          three_years_a:"",  //55
          three_years_d:"1399", //2022-10-10
          is_asset:true
      },
      {
        account:"DocumentsAndAccountsReceivable",
        last_balance_a:"", //55
        last_balance_d:"1402", //2022-10-10
        last_year_a:"", //55
        last_year_d:"1401", //2022-10-10
        two_years_a:"",  //55
        two_years_d:"1400", //2022-10-10
        three_years_a:"",  //55
        three_years_d:"1399", //2022-10-10
        is_asset:true
    },
    {
      account:"OtherDocumentsAndAccountsReceivable",
      last_balance_a:"", //55
      last_balance_d:"1402", //2022-10-10
      last_year_a:"", //55
      last_year_d:"1401", //2022-10-10
      two_years_a:"",  //55
      two_years_d:"1400", //2022-10-10
      three_years_a:"",  //55
      three_years_d:"1399", //2022-10-10
      is_asset:true
  },
  {
    account:"Inventory",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:true
  },
  {
    account:"prePaids",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:true
  },
  {
    account:"OtherCurrentAssets",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:true
  },
  {
    account:"TotalCurrentAssets",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:true
  },
  {
    account:"TangibleFixedAssets",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:true
  },
  {
    account:"IntangibleFixedAssets",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:true
  },
  {
    account:"LongtermInvestmentsAndPartnerships",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:true
  },
  {
    account:"OtherNoncurrentAssets",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:true
  },
  {
    account:"TotalFixedAssets",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:true
  },
  {
    account:"TotalAssets",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:true
  },    
  {
    account:"DocumentsAndAccountsPayable",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },  
  {
    account:"OtherDocumentsAndAccountsPayable",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },  
  {
    account:"ShorttermFacility",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },  
  {
    account:"prepayments",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },  
  {
    account:"OtherCurrentLiabilities",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },      
  {
    account:"TotalCurrentLiabilities",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },  
  {
    account:"LongtermDebt",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },  
  {
    account:"currentPartners",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },  
  {
    account:"TotalDebts",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },  
  {
    account:"ReservesAndReserves",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },  
  {
    account:"Fund",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  },  
  {
    account:"RetainedEarnings",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  }, 
  {
    account:"Equities",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  }, 
  {
    account:"totalSumOfLiabilitiesAndEquity",
    last_balance_a:"", //55
    last_balance_d:"1402", //2022-10-10
    last_year_a:"", //55
    last_year_d:"1401", //2022-10-10
    two_years_a:"",  //55
    two_years_d:"1400", //2022-10-10
    three_years_a:"",  //55
    three_years_d:"1399", //2022-10-10
    is_asset:false
  }, 

    ]
  });
  const [stepFive, setStepFive] = useState(
    //approvals
  {
      facilities_id:1,
      approvals:[
          {
            license:"",
            reference:"",
            date:"",
            validity:"",
            description:""
          }
      ],
      contracts:[
          {
            subject:"",
            name:"",
            amount:"",
            start:"",
            end:"",
            progress:""
          }
      ],
      pledges:[
          {
            type:"",
            cost:"",
            description:""
          }
      ],
      estates:[
          {
            type:"",
            owner:"",
            cost:"",
            description:""
          }
      ]
  });
  const [confirm, setConfirm] = useState({
    facilities_id : 1,
    name : "",
    amount : "",
    title : "",
    supply : "",
    signature : null,
  })

  return (
    <TashilatContext.Provider
      value={{
        stepOne,
        setStepOne,
        stepTwo,
        setStepTwo,
        stepThree,
        setStepThree,
        stepFour,
        setStepFour,
        stepFive,
        setStepFive,
        confirm,
        setConfirm
      }}
    >
      {children}
    </TashilatContext.Provider>
  );
}
