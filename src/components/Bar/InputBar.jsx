import PropTypes from 'prop-types';

const InputBar = ({ name, label, type, value, setValue, placeholder }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
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
        className="text-black"
      />
    </div>
  );
};

InputBar.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

export { InputBar };
