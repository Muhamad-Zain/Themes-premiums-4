import PropTypes from 'prop-types'
import style from './style.module.css'
import { useEffect, useState } from 'react'
import { fetchBg } from '../data/firebase'
import { AnimatedSection, AnimateSee } from '../animation'
import { FaFacebookF, FaTiktok } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import Link from 'next/link'



export default function Page3({data, id}) {

    const [groom, setGroom] = useState('')
    const [bride, setBride] = useState('')

    useEffect(()=> {
        const getImage = async () => {
            const urlGroom = await fetchBg(`${id}/groom`)
            const urlBride = await fetchBg(`${id}/bride`)
            setGroom(urlGroom)
            setBride(urlBride)
        }
        getImage()
    },[])
    
    return(
        <section className='py-10 px-2 sm:px-20'>
            <div className='text-4xl sm:text-5xl text-center font-bold pb-10'>
                <h3 className='Lora -mb-2 font-extrabold'>Bride</h3>
                <h3 className='GVibes border-b-2 border-gray-600 w-72 m-auto  '>& Groom</h3>
                {/* <div className='border-b-2 border-orange-800 w-72  '/> */}
            </div>
            <div className='playfair text-md sm:text-lg opacity-80 italic text-center pb-10'>
                <p className=' pb-5'>Assalamualaikum Wr. Wb</p>
                <p>Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan kami:</p>
            </div>
            <AnimatedSection>
                <AnimateSee>
            <h3 className='text-center text-3xl pb-10 GVibes'>The Groom</h3>
            </AnimateSee>
            <AnimateSee>
            <div className=' flex  items-center justify-center '>
                <div style={{backgroundImage:`url(${groom})`}} className={style.bgCardMen} />
            </div>
            </AnimateSee>
            </AnimatedSection>
            <AnimateSee>
            <div className=' text-center  p-5'>
                <h3 className='text-2xl sm:text-4xl playfair italic font-bold' >{data?.name?.namaLengkap?.mens}</h3>
                <p className='italic w-32 mx-auto'  dangerouslySetInnerHTML={{ __html: data?.parent?.mens }}></p>
                <div className='flex justify-center items-center pt-4'>
                    <Link href={`${data?.sosmed?.mens?.facebook}`} className='p-2 bg-gray-600 m-1 text-gray-100 rounded-lg'><FaFacebookF /></Link>
                    <Link href={`${data?.sosmed?.mens?.instagram}`} className='p-2 bg-gray-600 m-1 text-gray-100 rounded-lg'><AiFillInstagram /></Link>
                    <Link href={`${data?.sosmed?.mens?.twitter}`} className='p-2 bg-gray-600 m-1 text-gray-100 rounded-lg'><FaTwitter /></Link>
                    <Link href={`${data?.sosmed?.mens?.tiktok}`} className='p-2 bg-gray-600 m-1 text-gray-100 rounded-lg'><FaTiktok /></Link>
                </div>
            </div>
            </AnimateSee>
            <div className='flex justify-center items-center py-20 text-5xl GVibes'>
                <div className='border-b-2 border-gray-700 w-20' /><span className='px-5 '>&</span><div className='border-b-2 border-gray-700 w-20 ' />
            </div>
            <AnimatedSection>
            <AnimateSee>
            <h3 className='text-center text-3xl pb-10 GVibes'>The Bride</h3>
            </AnimateSee>
            <AnimateSee>
            <div className=' flex  items-center justify-center'>
                <div style={{backgroundImage:`url(${bride})`}} className={style.bgCardGrils} />
            </div>
            </AnimateSee>
            </AnimatedSection>
            <AnimateSee>
            <div className='  text-center p-5'>
                <h3 className='text-2xl sm:text-4xl playfair italic font-bold'  >{data?.name?.namaLengkap?.grils}</h3>
                <p className='italic w-32 mx-auto'  dangerouslySetInnerHTML={{ __html: data?.parent?.grils }} />
                <div className='flex justify-center items-center pt-4'>
                    <Link href={`${data?.sosmed?.grils?.facebook}`} className='p-2 bg-gray-600 m-1 text-gray-100 rounded-lg'><FaFacebookF /></Link>
                    <Link href={`${data?.sosmed?.grils?.instagram}`} className='p-2 bg-gray-600 m-1 text-gray-100 rounded-lg'><AiFillInstagram /></Link>
                    <Link href={`${data?.sosmed?.grils?.twitter}`} className='p-2 bg-gray-600 m-1 text-gray-100 rounded-lg'><FaTwitter /></Link>
                    <Link href={`${data?.sosmed?.grils?.tiktok}`} className='p-2 bg-gray-600 m-1 text-gray-100 rounded-lg'><FaTiktok /></Link>
                </div>
            </div>
            </AnimateSee>
        </section>
    )
}
Page3.propTypes = {
    data: PropTypes.string,
    id: PropTypes.string
}