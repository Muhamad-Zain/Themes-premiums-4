import style from './style.module.css'
import { LuAlarmClock } from "react-icons/lu";
import { IoLocationOutline } from "react-icons/io5";
import { SiGooglemaps } from "react-icons/si";
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchBg } from '../data/firebase';
import { AnimatedSection, AnimateSee } from '../animation';

export default function Page4({data, id}) {
    const [image, setImage] = useState('')
    useEffect(() => {
        const getImage = async () => {
            
            const url = await fetchBg(`${id}/location`)
            setImage(url)
        }
        getImage()

    },[])
    return(
        <section>
            <div className='text-4xl sm:text-5xl text-center pt-10'>
                <h3 className='font-extrabold playfair -mb-3'>Wedding</h3>
                <h3 className='GVibes border-b-2 border-gray-800 w-72 m-auto '>Event</h3>
            </div>
            <AnimatedSection>
                <div  className={style.bg}>
                 <AnimateSee>
                    <h3 className='text-center z-10 relative text-2xl GVibes font-semibold border-b-2 border-gray-800 w-40 mx-auto'>Akad Nikah</h3>
                    <div className='relative z-10 text-center py-5 text-sm '>
                        <p>{data?.date?.akad}</p>
                        <p>{data?.date?.time?.akad} - Selesai</p>
                        <div  className='py-5'>
                            <p>Bertempat di:</p>
                            <p>{data?.gift?.home}</p>
                        </div>
                        <Link href={`${data?.location?.akad}`} className='py-2 w-48 m-auto flex justify-center items-center rounded-md bg-gray-600 text-white bg-opacity-80 text-lg '>
                            <SiGooglemaps className='mr-2' />
                            Google Maps
                        </Link>
                    </div>
                 </AnimateSee>
                </div>
                <div className={style.bg}>
                 <AnimateSee>
                    <h3 className='text-center z-10 relative text-2xl GVibes font-semibold border-b-2 border-gray-800  w-40 mx-auto'>Resepsi</h3>
                    <div className='relative z-10 text-center py-5 text-sm '>
                        <p>{data?.date?.resepsi}</p>
                        <p>{data?.date?.time?.resepsi} - Selesai</p>
                        <div  className='py-5'>
                            <p>Bertempat di:</p>
                            <p>{data?.gift?.home}</p>
                        </div>
                        <Link href={`${data?.location?.resepsi}`} className='py-2 w-48 m-auto flex justify-center items-center rounded-md bg-gray-600 text-white bg-opacity-80 text-lg '>
                            <SiGooglemaps className='mr-2' />
                            Google Maps
                        </Link>
                    </div>
                 </AnimateSee>
                </div>
            {/* <div style={{backgroundImage: `url(${image})`}} className={style.bgAcara}> 
                <AnimateSee>
                <div className='relative z-10 py-5'>
                    <h3 style={{textShadow: '1px 1px #065f46'}} className='playfair text-3xl sm:text-5xl'>AKAD NIKAH</h3>
                    <p className='uppercase'>{data?.date?.akad}</p>
                    <div className='text-xs py-3'>
                        <div className='flex items-center '>
                            <LuAlarmClock />
                            <p className='pl-2'>{data?.date?.time?.akad} - selesai</p>
                        </div>
                        <div className='flex items-center '>
                            <IoLocationOutline />
                            <p className='pl-2'>Rumah Mempelai Wanita</p>
                        </div>
                    </div>
                    <Link href={`${data?.location?.akad}`} className='py-2 w-32 flex justify-center items-center rounded-full bg-green-800 bg-opacity-70 border border-white'>
                        <SiGooglemaps className='mr-2' />
                        location
                    </Link>
                </div>
                </AnimateSee>
                <div className='border-b-2 border-white w-10/12 sm:w-1/2 relative z-10' />
                <AnimateSee>
                <div className='relative z-10 py-5'>
                    <h3 style={{textShadow: '1px 1px #065f46'}} className='playfair text-3xl sm:text-5xl'>RESEPSI</h3>
                    <p className='uppercase'>{data?.date?.resepsi}</p>
                    <div className='text-xs py-3'>
                        <div className='flex items-center '>
                            <LuAlarmClock />
                            <p className='pl-2'>{data?.date?.time?.resepsi} - selesai</p>
                        </div>
                        <div className='flex items-center '>
                            <IoLocationOutline />
                            <p className='pl-2'>Rumah Mempelai Pria</p>
                        </div>
                    </div>
                    <Link href={`${data?.location?.resepsi}`} className='py-2 w-32 flex justify-center items-center rounded-full bg-green-800 bg-opacity-70 border border-white'>
                        <SiGooglemaps className='mr-2' />
                        location
                    </Link>
                </div>
                </AnimateSee>
            </div> */}
            </AnimatedSection>
        </section>
    )
}
Page4.propTypes = {
    data: PropTypes.string,
    id: PropTypes.string
}