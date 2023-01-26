const SearchBar = ({
  input,
  handleSetInput,
  isFocus,
  setIsFocus,
  placeholder,
}) => {
  return (
    <div className="relative w-full">
      <input
        className="block w-full pl-3 pr-9 py-2 rounded-xl border-[2px] border-[rgba(255,_255,_255,_0.1)] text-[rgba(255,_255,_255,_0.4)] bg-transparent placeholder:text-[rgba(255,_255,_255,_0.1)] focus:border-[rgba(255,_255,_255,_0.4)]"
        type="text"
        placeholder={placeholder}
        defaultValue={input}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={handleSetInput}
      />
      <i
        className={`bx bx-search absolute right-3 top-1/2 -translate-y-1/2 text-lg ${
          isFocus
            ? 'text-[rgba(255,_255,_255,_0.4)]'
            : 'text-[rgba(255,_255,_255,_0.1)]'
        }`}
      ></i>
    </div>
  );
};

export { SearchBar };
