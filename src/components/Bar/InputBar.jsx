import PropTypes from 'prop-types';

const InputBar = ({
  name,
  label,
  type,
  value,
  setValue,
  placeholder,
  className,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block font-sans text-[14px] mb-[8px] text-[rgb(128,128,128)]"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type || 'text'}
        value={value || ''}
        placeholder={placeholder}
        onChange={e =>
          setValue(prev => {
            return { ...prev, [name]: e.target.value };
          })
        }
        className={`block w-full font-sans bg-[#1e1e1e] rounded-[4px] border !border-[#3e3e3e] text-[14px] text-white px-[15px] py-[10px] focus:!border-[rgb(128,128,128)] ${className}`}
      />
    </div>
  );
};

InputBar.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export { InputBar };
