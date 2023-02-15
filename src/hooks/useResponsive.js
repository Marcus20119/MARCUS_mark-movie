import { useMediaQuery } from 'react-responsive';

export function useResponsive() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  // const isSM = useMediaQuery({minWidth: 640});
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  // const isLG = useMediaQuery({minWidth: 1024});
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  // const is2XL = useMediaQuery({minWidth: 1536});

  return { isMobile, isTablet, isLaptop };
}
