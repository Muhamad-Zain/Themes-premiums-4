import { useEffect, useState } from 'react'
import style from './style.module.css'
import { fetchBg, fetchGalery, fetchImage } from '../data/firebase'
import PropTypes from 'prop-types'
import { AnimateSee } from '../animation'
import Countdown from 'react-countdown'
import { motion, AnimatePresence } from 'framer-motion'

export default function Page2({data, id}) {
    // const [image, setImage] = useState('')
    const time = `${data?.date?.all}`
    // const WeddingDay = data?.date?.dateAll
    
    const wedingDate =  new Date(`${time}T10:00:00`)

  

    const render = ({days, hours, minutes, seconds, completed }) => {
        if (completed) {
              // return setSave(false)
            // Render a completed state
            return (
              <div style={{ fontSize: '2rem', textAlign: 'center' }} className=" GVibes  flex w-screen px-10 sm:w-full sm:px-0  m-auto font-serif text-orange-950 p-2 justify-between">
                <div className="rounded-lg border  border-orange-950 bg-yellow-600  bg-opacity-90 w-[4rem] h-[4rem]  flex justify-center items-center">
                  <div className="leading-6 text-4xl sm:text-5xl  font-bold">
                    <p>00</p>
                    <p className="text-xs sm:text-sm  ">Days</p>
                  </div>
                </div>
                <div className=" rounded-lg border border-orange-950 bg-yellow-600  bg-opacity-90 w-[4rem] h-[4rem]  flex justify-center items-center">
                  <div className="leading-6 text-4xl sm:text-5xl  font-bold">
                    <p>00</p>
                    <p className="text-xs sm:text-sm  ">Hours</p>
                  </div>
                </div>
                <div className=" rounded-lg border border-orange-950 bg-yellow-600  bg-opacity-90 w-[4rem] h-[4rem]  flex justify-center items-center">
                  <div className="leading-6 text-4xl sm:text-5xl  font-bold">
                    <p>00</p>
                    <p className="text-xs sm:text-sm  ">Minutes</p>
                  </div>
                </div>
                <div className=" rounded-lg border border-orange-950 bg-yellow-600  bg-opacity-90 w-[4rem] h-[4rem]  flex justify-center items-center">
                  <div className="leading-6 text-4xl sm:text-5xl  font-bold">
                    <p>00</p>
                    <p className="text-xs sm:text-sm  ">Seconds</p>
                  </div>
                </div>
              </div>
            );
          } else {
            // Render a countdown
            return (
                <div style={{ fontSize: '2rem', textAlign: 'center' }} className=" GVibes  flex w-screen px-10 sm:w-full sm:px-0  m-auto font-serif text-orange-950 p-2 justify-between">
                <div className="rounded-lg border  border-orange-950 bg-yellow-600  bg-opacity-90 w-[4rem] h-[4rem]  flex justify-center items-center">
                  <div className="leading-6 text-4xl sm:text-5xl  font-bold">
                    {days}
                    <p className="text-xs sm:text-sm  ">Days</p>
                  </div>
                </div>
                <div className=" rounded-lg border border-orange-950 bg-yellow-600  bg-opacity-90 w-[4rem] h-[4rem]  flex justify-center items-center">
                  <div className="leading-6 text-4xl sm:text-5xl  font-bold">
                    {hours}
                    <p className="text-xs sm:text-sm  ">Hours</p>
                  </div>
                </div>
                <div className=" rounded-lg border border-orange-950 bg-yellow-600  bg-opacity-90 w-[4rem] h-[4rem]  flex justify-center items-center">
                  <div className="leading-6 text-4xl sm:text-5xl  font-bold">
                    {minutes}
                    <p className="text-xs sm:text-sm  ">Minutes</p>
                  </div>
                </div>
                <div className=" rounded-lg border border-orange-950 bg-yellow-600  bg-opacity-90 w-[4rem] h-[4rem]  flex justify-center items-center">
                  <div className="leading-6 text-4xl sm:text-5xl  font-bold">
                    {seconds}
                    <p className="text-xs sm:text-sm  ">Seconds</p>
                  </div>
                </div>
              </div>
            );
          }
        };
        const [images, setImages] = useState([])
        // console.log(images);
        
        const [index, setIndex] = useState(0)
        // useEffect(() => {
          
        // },[]);
        useEffect(() => {
          const getImage = async () => {
            const url = await fetchGalery(id)
            setImages(url)

          }
          getImage()
          if (images.length === 0) return;
      
          const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
          }, 2500);
      
          return () => clearInterval(timer);
        }, [images]);
      
        // Ambil gambar hanya sekali
useEffect(() => {
  const getImage = async () => {
    const url = await fetchGalery(id);
    setImages(url);
  };
  getImage();
}, []); // kosong = hanya sekali saat mount

// Buat slideshow setelah gambar ada
// useEffect(() => {
//   if (images.length === 0) return;

//   const timer = setInterval(() => {
//     setIndex((prev) => (prev + 1) % images.length);
//   }, 2500);

//   return () => clearInterval(timer);
// }, [images]);

//         if (images.length === 0) return <p>Memuat gambar...</p>;
useEffect(() => {
  if (typeof window === 'undefined' || images.length === 0) return;

  const timer = setInterval(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, 2500);

  return () => clearInterval(timer);
}, [images]);
    return(
        <section className='relative'>
          <div className={`${style.bg} `}>
      <AnimatePresence>
        <motion.img
          key={images[index]}
          src={images[index]}
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
    </div>
            {/* <div style={{backgroundImage : `url('/assets/home.jpeg')`}} className={`${style.bg} w-full h-screen  `}>
                <div className={`${style.wrap} relative z-10 h-screen  w-full flex justify-center items-center`}>
                        <div className=''>
                            <div style={{textShadow: '1px 1px #065f46 '}} className='text-center  relative z-10  '>
                              <AnimateSee>
                                <p className='font-bold tracking-[0.3rem] mb-5'>THE WEDDING OF</p>
                                <h3 className="text-5xl sm:text-7xl GVibes font-bold py-2 text-center  flex  justify-center ">
                                <span className="text-center sm:text-left italic">{data?.name?.mens}</span>
                                <span className="px-5" >&</span>
                                <span className="">{data?.name?.grils}</span>
                                </h3>
                              </AnimateSee>
                            </div>
                            <AnimateSee>
                            <Countdown date={time} renderer={render}/>
                            </AnimateSee>
                    </div>
                </div>
            </div> */}

                    <AnimateSee>
                    <p className='relative my-20 sm:mt-[20vh] w-[95%]  sm:max-w-[1000px] mx-auto text-center playfair opacity-85   text-sm  sm:text-xl italic leading-tight z-10'>
                        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, 
                        supaya kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. 
                        Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir." (QS. Ar-Rum: 21)
                    </p>
                    </AnimateSee>
        </section>
    )
}

Page2.propTypes = {
    data: PropTypes.string,
    id: PropTypes.string
}