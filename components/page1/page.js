'use client'
import PropTypes from 'prop-types'
import style from './style.module.css'
import { useEffect, useState } from 'react'
import { fetchBg } from '../data/firebase'
import { LuPanelTopOpen } from "react-icons/lu";
// import Bg from '../assets/bghome.jpeg'



export default function Page1({btn, name, data, id}) {
    const [disable, setDisable] = useState(false)
    const [image, setImage] = useState('')
    // const [data, setData] = useState([])
    // console.log(data);

    
    
    
    const btnLocal = () => {
        setDisable(true)
    }

    useEffect(() => {
        const getImage = async () => {
            
            const url = await fetchBg(`${id}/hero`)
            setImage(url)
        }

        
        getImage()

    },[])
    return(
        <section style={{backgroundImage : `url(${image})`}} className= {style.bgHero}>
            <div className='relative z-20 w-full  text-center'>
                <h3 className='tracking-[0.7em]  text-md '>THE WEDDING OF</h3>
                <div  className='text-4xl  font-bold py-1 playfair  tracking-wide  '>
                    {/* <h1 className='mr-24 mb-2 sm:mb-0 sm:mr-0'>{data?.name?.mens} </h1> <p className='sm:mx-4'>&</p> <h1 className='ml-24 mt-2 sm:mt-0 sm:ml-0'> {data?.name?.grils}</h1> */}
                    <h3 style={{textShadow:'2px 2px black'}}>{data?.name?.mens} & {data?.name?.grils}</h3>
                </div> 
                {/* <p className='text-sm'>{data?.date?.resepsi}</p> */}
                <div className='mt-[40vh] '>
                    <p className='text-sm'>kpd Bpk/Ibu/Saudara/i</p>
                    <h3 className='font-bold py-3 sm:py-5 playfair'>{name ? name : 'Nama Tamu'}</h3>
                    <div className='flex justify-center text-gray-900'>
                        <button onClick={()=> {btnLocal(), btn()}} disabled={disable} className='flex justify-center items-center bg-gray-200 bg-opacity-70 p-2 px-4 border border-gray-950 rounded-full playfair'>
                            <LuPanelTopOpen className='mr-2' />
                            Buka Undangan
                        </button>
                    </div>
                    <p className='text-xs italic  my-1'>Mohon maaf apabila ada kesalahan penulisan nama/gelar</p>
                </div>
            </div>
        </section>

    )
}

Page1.propTypes = {
    btn: PropTypes.func,
    name: PropTypes.string,
    data: PropTypes.string,
    id: PropTypes.string
}