import Ellipse1 from "../../../assets/svg/dashboard/Ellipse-1.svg";
import Ellipse2 from "../../../assets/svg/dashboard/Ellipse-2.svg";
import Ellipse3 from "../../../assets/svg/dashboard/Ellipse-3.svg";
import Ellipse4 from "../../../assets/svg/dashboard/Ellipse-4.svg";
import Ellipse5 from "../../../assets/svg/dashboard/Ellipse-5.svg";
import Ellipse6 from "../../../assets/svg/dashboard/Ellipse-6.svg";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">دسترسی سریع</h2>
      <div className="flex gap-6 text-white max-lg:flex-col">
        <div className="w-1/3 max-lg:w-full h-28 flex justify-between items-center rounded-2xl bg-secondary relative overflow-hidden pr-11">
          <Link to="/user/warranty">ثبت درخواست ضانت نامه</Link>
          <div>
            <img className="absolute left-1 inset-y-0" src={Ellipse6} alt="" />
            <img className="absolute left-0 inset-y-0" src={Ellipse5} alt="" />
          </div>
        </div>
        <div className="w-1/3 max-lg:w-full h-28 flex justify-between items-center rounded-2xl bg-secondary relative overflow-hidden pr-11">
          <Link to="/user/facilities">ثبت درخواست تسهیلات</Link>
          <div>
            <img className="absolute left-0 inset-y-0" src={Ellipse2} alt="" />
            <img className="absolute left-0 inset-y-0" src={Ellipse1} alt="" />
          </div>
        </div>
        <div className="w-1/3 max-lg:w-full h-28 flex justify-between items-center rounded-2xl bg-secondary relative overflow-hidden pr-11">
          <Link to="/user/guide">راهنمای سایت</Link>
          <div>
            <img className="absolute left-1 inset-y-0" src={Ellipse4} alt="" />
            <img className="absolute left-0 inset-y-0" src={Ellipse3} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
