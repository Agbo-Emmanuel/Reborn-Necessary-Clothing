import { useEffect, useState, useRef } from 'react';
import './pagesCss/home.css'
import ProductCard from '../components/ProductCard'
import hero_section_image_one from '../assets/hero_section_image_one.jpg';
import hero_section_image_two from '../assets/hero_section_image_two.jpg';
import hero_section_image_three from '../assets/hero_section_image_three.jpg';
import { MdOutlineArrowForward } from "react-icons/md";
import section_three_video from '../assets/section_three_video.mp4'

const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  const Context = [
    {
      id: 1,
      image: hero_section_image_one,
      text: 'A Philosophy Rooted In The Pursuit Of Alpha',
    },
    {
      id: 2,
      image: hero_section_image_two,
      text: "Your Future Is Created By What You Do Today",
    },
    {
      id: 3,
      image: hero_section_image_three,
      text: "Professional Portfolio Management",
    }
  ];

  useEffect(()=>{
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide => (currentSlide + 1) % Context.length);
    }, 4000); 

    return () => clearInterval(interval); 
  },[Context.length])


  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <>
      <div className='home_body'>
        <div className='hero_section'>
          <div
            className="hero_background_slider"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`, // Slide effect
            }}
          >
            {Context.map((item, index) => (
              <div
                key={item.id}
                className="hero_slide"
                style={{
                  backgroundImage: `linear-gradient(270deg, #00000070, #00000070, #00000070), url(${item.image})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'flex-end flex-end',
                }}
              ></div>
            ))}
          </div>
          <div className='hero_section_text_container'>
            <h1>Luxury<br/>Fashion<br/>& Accessories</h1>
            <button>Explore Collection</button>
          </div>
        </div>
        <div className='section_one'>
         <div className='section_one_text_container'>
          <h3>NEW ARRIVAL</h3>
         </div>
          <div className='section_one_product_container'>
            <ProductCard/>
          </div>
          <div className='section_one_explore_container'>
            <button>
              Explore More
              <MdOutlineArrowForward/>
            </button>
          </div>
        </div>
        <div className='section_two'>
          <div className='section_two_collection_container'>
            <div className='section_two_writeup_container_one'>
              <h3>Autumn</h3>
              <p>Collection</p>
            </div>
            <div className='section_two_writeup_container_two'>
              <h3>October</h3>
              <p>Collection</p>
            </div>
            <h1>10</h1>
          </div>
        </div>
        <div className='section_three'>
          <video ref={videoRef} onPause={() => setIsPlaying(false)} width="100%" className='section_three_video_container'>
           <source src={section_three_video} type="video/mp4"/>
          </video>
          {!isPlaying && (
            <button className="play_button" onClick={handlePlay}>
              ▶
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Home