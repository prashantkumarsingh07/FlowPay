/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export const BottomWarning = ({ label1, label2, href }) => {
  return (
    <p className='font-medium text-sm py-2'>
      {label1}
      <Link className='underline cursor-pointer ' to={href}>
        {label2}
      </Link>
    </p>
  );
};