import { Fragment } from 'react';
import ModalBase from '~/components/Base/ModalBase';
import { api } from '~/config';
import useModal from '~/hooks/useModal';

const TrailerItem = ({ keyId, index }) => {
  const { show, handleShow, handleHide } = useModal();

  return (
    <div>
      <Fragment>
        <div
          className="group relative w-full h-0 pt-[60%] overflow-hidden border-[2px] rounded-sm border-solid border-[#222222] hover:border-[var(--primary-color)] cursor-pointer"
          onClick={handleShow}
        >
          <img
            className="absolute left-0 top-1/2 block w-full h-full object-cover object-center -translate-y-1/2"
            src={api.getThumbnail(keyId)}
            alt={`thumbnailKey${index}`}
          />
          <img
            className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden w-[45px] h-[45px] opacity-70 object-center object-cover group-hover:block"
            src="/small-round-play-button.png"
            alt="play icon"
          />
        </div>
        <ModalBase visible={show} onClose={handleHide}>
          <Fragment>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${keyId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-[1000px] h-[562.5px]"
            ></iframe>
            <i
              className="bx bx-x absolute top-[10%] right-[10%]"
              onClick={handleHide}
            ></i>
          </Fragment>
        </ModalBase>
      </Fragment>
    </div>
  );
};

export default TrailerItem;
