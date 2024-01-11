import React from 'react'
import { onlyDateConversion } from '../../../helper/dateConversion';
import user from "../../../assets/imges/user.png"

export default function UserLine({GenuineUser , setShowMore}) {
  return (
    <tr
        key={GenuineUser.id}
        id={GenuineUser.id}
    >
        <td>
        {" "}
        <img
            className="w-10 h-10"
            src={user}
            alt=""
        />
        </td>
        <td className="p-4 text-xs text-gray-400 font-bold">{GenuineUser.name}</td>
        {
            GenuineUser.type === "legal" ?
            <td className="p-4 text-xs text-gray-400 font-bold">{GenuineUser.national_company}</td> :
            <td className="p-4 text-xs text-gray-400 font-bold">{GenuineUser.family}</td>

            
        }
        <td className="p-4 text-xs text-gray-400 font-bold">
        {onlyDateConversion(GenuineUser.created_at)}
        </td>
        <td className="p-4 text-xs text-gray-400 font-bold">
        <button onClick={() => setShowMore(GenuineUser)} className="text-600 border-2 rounded-2xl p-2 ml-2">
            بیشتر
        </button>
        </td>
    </tr>
  )
}
