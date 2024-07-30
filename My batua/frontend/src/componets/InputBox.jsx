/* eslint-disable react/prop-types */
export const InputBox = ({ label, placeholder, onChange, inputType }) => {
  return (
    <>
      <div className='flex flex-col items-start'>
        <h2 className='text-lg py-3 font-medium'>{label}</h2>
        <input
          className='outline-none border border-slate-200 w-full px-2 py-1 rounded'
          type={inputType}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};