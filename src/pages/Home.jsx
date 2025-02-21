import { useEffect, useState, useRef } from 'react';
import './pagesCss/home.css'
import ProductCard from '../components/ProductCard'
import hero_section_image_one from '../assets/hero_section_image_one.jpg';
import hero_section_image_two from '../assets/hero_section_image_two.jpg';
import hero_section_image_three from '../assets/hero_section_image_three.jpg';
import hero_section_image_four from '../assets/hero_section_image_four.jpg';
import hero_section_image_five from '../assets/hero_section_image_five.jpg';
import hero_section_image_six from '../assets/hero_section_image_six.jpg';
import hero_section_image_seven from '../assets/hero_section_image_seven.jpg';
import hero_section_image_eight from '../assets/hero_section_image_eight.jpg';
import { MdOutlineArrowForward } from "react-icons/md";
import section_three_video from '../assets/section_three_video.mp4'
import miroodles_sticker from '../assets/miroodles_sticker.png'
import miroodles_sticker2 from '../assets/miroodles_sticker2.png'
import miroodles_sticker3 from '../assets/miroodles_sticker3.png'
import miroodles_sticker4 from '../assets/miroodles_sticker4.png'
import section_five_bottom_image from '../assets/section_five_bottom_image.png'


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
    },
    {
      id: 4,
      image: hero_section_image_four,
      text: "Professional Portfolio Management",
    },
    {
      id: 5,
      image: hero_section_image_five,
      text: "Professional Portfolio Management",
    },
    {
      id: 6,
      image: hero_section_image_six,
      text: "Professional Portfolio Management",
    },
    {
      id: 7,
      image: hero_section_image_seven,
      text: "Professional Portfolio Management",
    },
    {
      id: 8,
      image: hero_section_image_eight,
      text: "Professional Portfolio Management",
    },
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
                  backgroundImage: `linear-gradient(270deg, #0000005e, #0000005e, #0000005e), url(${item.image})`,
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
            <ProductCard limit={8}/>
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
        <div className='section_four'>
          <h3>JUST FOR YOU</h3>
          <div className='section_four_product_container'>
            <ProductCard limit={4}/>
          </div>
        </div>
        <div className='section_five'>
          <p>Making a luxurious lifestyle accessible for a generous group of women is our daily drive.</p>
          <div className='section_five_middle_container'>
            <div className='section_five_middle_item_container'>
              <img src={miroodles_sticker} alt=''/>
              <p>Fast shipping. Free on orders over $25.</p>
            </div>
            <div className='section_five_middle_item_container'>
              <img src={miroodles_sticker2} alt=''/>
              <p>Sustainable process from start to finish.</p>
            </div>
            <div className='section_five_middle_item_container'>
              <img src={miroodles_sticker3} alt=''/>
              <p>Unique designs and high-quality materials.</p>
            </div>
            <div className='section_five_middle_item_container'>
              <img src={miroodles_sticker4} alt=''/>
              <p>Fast shipping. Free on orders over $25.</p>
            </div>
          </div>
          <div className='section_five_bottom_container'>
            <img src={section_five_bottom_image} alt=''/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home