const LoadingBounce = () => {
  return (
    <div>
      <div className="flex justify-center">
          <div
            className="
            w-4 h-4 mx-2 bg-white rounded-full
            animate-loading-bounce
          "
          ></div>
          <div
            className="
            w-4 h-4 mx-2 bg-white rounded-full
            animate-loading-bounce animation-delay-150
          "
          ></div>
          <div
            className="
            w-4 h-4 mx-2 bg-white rounded-full
            animate-loading-bounce animation-delay-300
          "
          ></div>
          <div
            className="
            w-4 h-4 mx-2 bg-white rounded-full
            animate-loading-bounce animation-delay-450
          "
          ></div>
        </div>
    </div>
  );
};

export default LoadingBounce;