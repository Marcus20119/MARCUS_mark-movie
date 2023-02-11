import { useRef, useEffect, useState } from 'react';
import { supabase } from '~/supabase';
const TestPage = () => {
  const iframeRef = useRef();
  const [isPlay, setIsPlay] = useState(false);
  console.log('isPlay', isPlay);
  // useEffect(() => {
  //   if (iframeRef.current) {
  //     const iframeRefCurrent = iframeRef.current;
  //     const handlePlay = () => {
  //       console.log('lalal');
  //       setIsPlay(true);
  //     };
  //     iframeRefCurrent.addEventListener('playing', handlePlay);
  //     return () => iframeRefCurrent.removeEventListener('playing', handlePlay);
  //   }
  // }, [iframeRef]);
  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      <iframe
        ref={iframeRef}
        width="420"
        height="315"
        src="https://www.youtube.com/embed/tgbNymZ7vqY"
        title="test"
        allowFullScreen={true}
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        onClick={() => setIsPlay(true)}
      ></iframe>
    </div>
  );
};

export default TestPage;
