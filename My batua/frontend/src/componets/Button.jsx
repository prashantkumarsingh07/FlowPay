/* eslint-disable react/prop-types */
export const Button = ({ label, onClick }) => {
  return (
    <button
      className='w-full rounded-lg font-medium hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 px-5 bg-gray-800 text-white py-2.5  mb-2'
      onClick={onClick}
      type='button'>
      {label}
    </button>
  );
};