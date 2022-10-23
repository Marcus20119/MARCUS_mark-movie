import Carousel from 'react-bootstrap/Carousel';
import './overWrite.scss';

function CarouselFadeExample() {
  const links = [
    'https://preview.redd.it/6osikpalawp91.jpg?auto=webp&s=9440231fa70c4cba6f7fda7ac7d22646a9c7f25c',
    'https://images.thequint.com/thequint/2019-04/7bbf3477-8596-4a1b-9150-d67fc0eedf13/w4botl43ntm21.png?auto=format,compress&fmt=webp&format=webp&w=1200&h=900&dpr=1.0',
    'https://www.theilluminerdi.com/wp-content/uploads/2020/11/Wandavision-banner.jpg',
  ];
  return (
    <Carousel
      fade
      nextIcon={
        <i className="bx bx-chevron-right flex justify-center items-center w-[45px] h-[45px] text-4xl bg-slate-700 bg-opacity-60 rounded-full"></i>
      }
    >
      {links.map(link => (
        <Carousel.Item key={link}>
          <img className="carousel-item__img" src={link} alt="First slide" />
          <div className="carousel-item__overlay"></div>
          <Carousel.Caption>
            <h3 className="carousel-caption__name">Avenger: Endgame</h3>
            <div className="carousel-caption__tag-wrap">
              {['Action', 'Adventure', 'Drama'].map(tag => (
                <button key={tag} className="carousel-caption__tag">
                  {tag}
                </button>
              ))}
            </div>
            <div className="carousel-caption__wrap-btn">
              <button className="carousel-caption__play-btn">
                <span>Watch</span>
                <img src="/small-round-play-button.png" alt="play-icon" />
              </button>
              <button className="carousel-caption__plus-btn">
                <img src="/plus.png" alt="" />
              </button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselFadeExample;
