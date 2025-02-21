import { useEffect, useState, useRef } from 'react';
import './pagesCss/home.css'
import ProductCard from '../components/ProductCard'
import hero_section_image_one from '../assets/hero_section_image_one.jpg';
import hero_section_image_five from '../assets/hero_section_image_five.jpg';
import hero_section_image_seven from '../assets/hero_section_image_seven.jpg';
import { MdOutlineArrowForward } from "react-icons/md";
import section_three_video from '../assets/section_three_video.mp4'
import miroodles_sticker from '../assets/miroodles_sticker.png'
import miroodles_sticker2 from '../assets/miroodles_sticker2.png'
import miroodles_sticker3 from '../assets/miroodles_sticker3.png'
import miroodles_sticker4 from '../assets/miroodles_sticker4.png'
import section_five_bottom_image from '../assets/section_five_bottom_image.png'
import rbnc_logo from '../assets/rbnc_logo.png'


const Home = () => {

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [show, setShow] = useState(0);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  // const [isVisible, setIsVisible] = useState(true);
  // const [isFixed, setIsFixed] = useState(true);

  const Context = [
    {
      id: 1,
      image: hero_section_image_one,
      text: 'A Philosophy Rooted In The Pursuit Of Alpha',
    },
    // {
    //   id: 2,
    //   image: hero_section_image_two,
    //   text: "Your Future Is Created By What You Do Today",
    // },
    // {
    //   id: 4,
    //   image: hero_section_image_four,
    //   text: "Professional Portfolio Management",
    // },
    {
      id: 5,
      image: hero_section_image_five,
      text: "Professional Portfolio Management",
    },
    {
      id: 7,
      image: hero_section_image_seven,
      text: "Professional Portfolio Management",
    },
  ];

  useEffect(()=>{
    const interval = setInterval(() => {
      setCurrentSlide(currentSlide => (currentSlide + 1) % Context.length);
    }, 4000); 

    return () => clearInterval(interval); 
  },[Context.length])

  useEffect(() => {
    const updateSlidesPerView = () => {
      let newSlidesPerView = 4;
      if (window.innerWidth <= 768) {
        newSlidesPerView = 1; 
      } else if (window.innerWidth <= 1024) {
        newSlidesPerView = 2;
      }
      setSlidesPerView(newSlidesPerView);
      setCurrentProductSlide(0); // Reset slide position
    };
  
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  useEffect(() => {
    setShow(slidesPerView === 1 ? 4 : 0);
  }, [slidesPerView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductSlide((prev) => (prev + 1) % show);
    }, 4000);
  
    return () => clearInterval(interval);
  }, [show]);
  
  useEffect(() => {
    if (sliderRef.current) {
      const slideWidth = 100 / slidesPerView;
      sliderRef.current.style.transform = `translateX(-${currentProductSlide * slideWidth}%)`;
    }
  }, [currentProductSlide, slidesPerView]);


  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  // Touch event handlers for swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const swipeThreshold = 50; // Minimum swipe distance

    if (swipeDistance > swipeThreshold) {
      // Swipe Left → Next Slide
      setCurrentProductSlide((prev) => Math.min(prev + 1, show - 1));
    } else if (swipeDistance < -swipeThreshold) {
      // Swipe Right → Previous Slide
      setCurrentProductSlide((prev) => Math.max(prev - 1, 0));
    }
  };


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const heroSection = document.querySelector(".hero_section");
  //     if (!heroSection) return;

  //     const rect = heroSection.getBoundingClientRect();

  //     // Check if hero section is in viewport
  //     const inView = rect.top < window.innerHeight && rect.bottom > 0;
  //     setIsVisible(false);

  //     // If scrolled past the hero section, set position to absolute
  //     setIsFixed(rect.bottom > window.innerHeight);
  //   };

  //   const onScroll = () => requestAnimationFrame(handleScroll);

  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);


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
                  backgroundPosition: 'flex-end center',
                }}
              ></div>
            ))}
          </div>
          <div 
            className='hero_section_text_container'
            // style={{
            //   position: isFixed ? "fixed" : "absolute",
            //   top: isFixed ? "10%" : "auto",
            //   bottom: isFixed ? "auto" : "0",
            //   opacity: isVisible ? 1 : 0,
            //   transition: "opacity 0.5s ease-in-out",
            // }}
          >
            <h1>Luxury<br/>Fashion<br/>& Accessories</h1>
            <button>Explore Collection</button>
          </div>
        </div>
        <div className='section_one'>
         <div className='section_one_text_container'>
          <h3>Designer Mood</h3>
          <p>Designed, Made & Styled!</p>
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
              <img src={rbnc_logo} alt='img'/>
              {/* <p>Collection</p> */}
            </div>
            <div className='section_two_writeup_container_two'>
              <img src={rbnc_logo} alt='img'/>
              <p>Collection</p>
            </div>
            {/* <h1>10</h1> */}
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
            <div 
              className='slider_wrapper' 
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}  
            >
              <ProductCard showLastFour = {true}/>
            </div>
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
        {/* <div className='section_six'>
          <img src={hero_section_image_three} alt=''/>
        </div> */}
      </div>
    </>
  )
}

export default Home