const LoadingBackdrop = () => {
  return (
    <div
      className="block w-full h-[500px] object-top backdrop-blur-3xl opacity-50 bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(0deg, rgb(34, 34, 34, 0.85), transparent), linear-gradient(#ffffff50, #ffffff50)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    ></div>
  );
};

export default LoadingBackdrop;
