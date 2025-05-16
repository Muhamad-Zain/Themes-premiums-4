"use client"
import { useEffect, useState } from 'react'
import style from './style.module.css'
import { ref, set } from 'firebase/database'
import { database, fetchBg } from '../data/firebase'
import PropTypes from 'prop-types'
import { MdFileCopy } from "react-icons/md";
import { AnimatedSection, AnimateSee } from '../animation'



export default function Page8({id, data}) {
    const [image, setImage] = useState('')

    const [gift, setGift] = useState(false)
    const [select, setSelect] = useState('')
    const [name, setName] = useState('')
    const [jumlah, setJumlah] = useState('')

    const [succes, setSucces] = useState(false)
    const [load, setLoad] = useState(false)
    const [load2, setLoad2] = useState(false)
    const [load3, setLoad3] = useState(false)

    const currentDate = new Date()
    const day = currentDate.getDate()
    const month =currentDate.getMonth() + 1
    const year = currentDate.getFullYear()
    const hours = currentDate.getHours();       // Mendapatkan jam
    const minutes = currentDate.getMinutes();   // Mendapatkan menit
    const seconds = currentDate.getSeconds(); 


    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    

    const handleGift = () => {
        setGift(!gift)
    }
    const handleRsvp = (e) => {
        setSelect(e.target.value)
    }
    const [alert, setAlert] = useState('')
    const handleSendRsvp = (e) =>{
        e.preventDefault()
        if (name === '' || select === '') {
            setAlert('Silahkan isi terlebih dahulu')
            setTimeout(() => {
                setAlert('')
            }, 2000);
        } else {
            const rsvp = ref(database, `weddings/${id}/rsvp/${Date.now()}`)
            set(rsvp, {
                name,
                confirm:select,
                jumlah,
                time: formattedTime,
                day: formattedDate
            })
            setSucces(true)
            setName('')
            setJumlah('')
        }
    }
    

    const buttonCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text)
            if (text === data?.gift?.one?.rekening ) {
                setLoad(true)
                setTimeout(() => {
                    setLoad(false)
                }, 2000);
            } else if(text === data?.gift?.two?.rekening){
                setLoad2(true)
                setTimeout(() => {
                    setLoad2(false)
                }, 2000);
            } else if(text === data?.gift?.home){
                setLoad3(true)
                setTimeout(() => {
                   setLoad3(false) 
                }, 2000);
            }

        } catch (error) {
            
        }
    }
    useEffect(() => {
        const getImage = async () => {
            
            const url = await fetchBg(`${id}/rsvp`)
            setImage(url)
        }

        
        getImage()

    },[])

    return(
        <section className='my-10'>
            <AnimatedSection>
            <div className={style.rsvp}>
                <AnimateSee>
                <form 
                    onSubmit={handleSendRsvp}
                    className='z-10 relative w-full'>
                    <h3 className='text-5xl playfair font-bold text-center py-5'>RSVP</h3>
                    <p className='text-center text-xs'>Silahkan konfirmasi kehadiran anda !</p>
                    <label>Nama</label>
                    <input 
                        type='text' 
                        placeholder='Masukkan Nama'
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        className='w-full p-2 rounded-sm outline-none ' />
                    <p className='pt-5'>kehadiran</p>
                    <p className=' text-xs py-2 text-center'>Silahkan pilih salah satu</p>
                    <div className='flex justify-around w-[80%] sm:w-52 m-auto'>
                    <div className=''>
                    <label className='flex justify-center'>
                        <input 
                            type='radio'
                            className='' 
                            value='Hadir' 
                            checked={select === 'Hadir'}
                            onChange={handleRsvp} />
                    </label>
                        <p>Ya</p>
                    </div>
                    <div>
                    <label className='flex justify-center'>
                        <input 
                            type='radio' 
                            className=''
                            value='Tidak Hadir' 
                            checked={select === 'Tidak Hadir'}
                            onChange={handleRsvp} />
                    </label>
                        <p className='m-auto'>Tidak</p>
                    </div>
                    <div>
                    <label className='flex justify-center'>
                        <input 
                            type='radio' 
                            value='Ragu-Ragu' 
                            checked={select === 'Ragu-Ragu'}
                            onChange={handleRsvp} />
                    </label>
                        <p>Ragu</p>
                    </div>
                    </div>

                    <label className=' '>Jumlah</label>
                    <input 
                        type='number' 
                        placeholder='Jumlah (opsional)' 
                        value={jumlah}
                        onChange={(e) => setJumlah(e.target.value)}
                        className='outline-none p-2 rounded-sm w-full '/>
                       
                        <p className=' text-center py-2'>{alert}</p>
                    <div className='flex pt-5 justify-center'>
                        <button 
                            type='submit'
                            disabled={succes ? true : false}
                            className='py-2 px-4 rounded-md bg-gray-600 bg-opacity-80 text-white  mx-auto'
                            >
                                {succes ? 'succes' : 'Konfirmasi'}
                        </button>
                    </div>
                </form>
                </AnimateSee>
                <div className='border-b-2 w-[90%] m-auto relative z-10 py-5' />
                <AnimateSee>
                <div className='relative z-10'>
                    <h1 className='text-5xl playfair text-center py-5 font-bold'>GIFT</h1>
                    <p className='text-center text-sm italic pb-5'>Doa Restu Anda merupakan karunia yang sangat berarti bagi kami.</p>
                    <div className='flex justify-center'>
                        <button 
                            onClick={handleGift}
                            className=' bg-gray-600 bg-opacity-80 text-white py-2 px-4 rounded-md'>Open Gift</button>
                        </div>
                    <div className={`${gift ? ' max-h-[200rem] opacity-100' : ' max-h-0 opacity-0 '} transition-all duration-500 ease-in-out  overflow-hidden w-full  py-5`}>
                        {data?.gift?.one?.nameBank === data?.gift?.one?.nameBank ? (
                            <div className={style.cardBank}>
                            <h1 style={{textShadow:'2px 2px white'}} className='text-blue-800 font-bold text-3xl italic'>{data?.gift?.one?.nameBank}</h1>
                            <div className='py-5 italic'>
                                <p className='text-2xl text-slate-100 font-bold'>{data?.gift?.one?.rekening}</p>
                                <p className='text-end text-sm pt-3 text-white'>a.n {data?.gift?.one?.an}</p>
                            </div>
                            <button 
                                onClick={() => buttonCopy(data?.gift?.one?.rekening)}
                                disabled={load ? true : false}
                                className='w-full py-2 bg-gray-700  rounded-md border border-white font-bold text-gray-100 italic flex justify-center items-center'>
                                    <MdFileCopy className='mr-2' />
                                    {load ? 'Succes' : 'Salin'}
                            </button>
                            </div>
                        ): null}
                        {data?.gift?.two?.nameBank === data?.gift?.two?.nameBank ? (
                            <div className={style.cardBank}>
                            <h1 style={{textShadow:'2px 2px white'}} className='text-blue-800 font-bold text-3xl italic'>{data?.gift?.two?.nameBank}</h1>
                            <div className='py-5 italic'>
                                <p className='text-2xl text-slate-100 font-bold'>{data?.gift?.two?.rekening}</p>
                                <p className='text-end pt-3 text-sm text-white'>a.n  {data?.gift?.two?.an}</p>
                            </div>
                            {/* <div className='flex justify-center'> */}
                                <button 
                                    onClick={() => buttonCopy(data?.gift?.two?.rekening)}
                                    disabled={load2? true : false}
                                    className='w-full py-2 bg-gray-700  rounded-md border border-white font-bold text-gray-100 italic flex justify-center items-center'>
                                    <MdFileCopy className='mr-2' />
                                    {load2 ? 'Succes' : 'Salin'}
                                </button>
                            {/* </div> */}
                            </div>
                        ): null}
                        {/* {data?.gift?.home === data?.gift?.home ? (
                            <div className='sm:w-[45%] w-[90%] my-2 bg-white border-4 border-double border-slate-600 bg-opacity-95 px-5 py-2 rounded-2xl'>
                            <h1 className='text-black font-bold text-xl italic text-center'>Alamat kirim kado</h1>
                            <div className='border-b-2 border-black' />
                            <div className='flex justify-between py-5 text-sm text-slate-900 italic'>
                                <p>{data?.gift?.home}</p>
                            </div>
                                <button
                                    onClick={() => buttonCopy(data?.gift?.home)} 
                                    disabled= {load3 ? true : false}
                                    className='w-full py-1 bg-black bg-opacity-80 rounded-lg border flex justify-center items-center'>
                                    <MdFileCopy className='mr-2' />
                                    {load3 ? 'succes' : 'copy'}
                                </button>
                            </div>
                        ): null} */}
                    </div>
                </div>
            </AnimateSee>
            </div>
            </AnimatedSection>
        </section>
    )
}
Page8.propTypes = {
    id: PropTypes.string,
    data: PropTypes.string
}