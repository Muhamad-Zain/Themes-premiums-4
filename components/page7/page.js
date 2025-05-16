import PropTypes from 'prop-types'
import style from './style.module.css'
import { useEffect, useState } from 'react'
import { database, fetchBg, fetchData } from '../data/firebase'
import { onValue, ref, set } from 'firebase/database'
import { AnimatedSection, AnimateSee } from '../animation'

export default function Page7({ id}) {

    const [message, setMessage] = useState('')
    const [name, setName] = useState('')
    const [ucapan, setUcapan] = useState([])
    const [image, setImage] = useState('')
   
    

    useEffect(() => {
        const getImage = async () => {
            
            const url = await fetchBg(`${id}/expresion`)
            setImage(url)
        }

        
        getImage()
        const messageRef = ref(database, `weddings-four/${id}/expresion/`)
        onValue(messageRef ,(snapshot) => {
            const data = snapshot.val()
            const list = []
            for(const key in data){
                list.push({id: key, ...data[key]})
            }
            setUcapan(list)
        })
    },[])
    const [alert, setAlert] = useState('')
    const handleSend = (e) =>{
        e.preventDefault()

        if (name === '' || message === '') {
            setAlert('Silahkan isi terlebih dahulu !!')
            setTimeout(() => {
                setAlert('')
            }, 2000);
        } else {
            const messages = ref(database, `/weddings-four/${id}/expresion/${Date.now()}`)
            set(messages, {
                name,
                text:message
            })
            setName('')
            setMessage('')
        }

    }
    return(
        <section className='py-10'>
            <AnimatedSection>
            <div className={style.comment}>
                <AnimateSee>
                <form
                    onSubmit={handleSend} 
                    className='relative z-10 '>
                        <h3 className='playfair font-bold text-4xl -mb-3 text-center'>Wedding</h3>
                        <h3 className='GVibes text-4xl text-center border-b-2 border-gray-800 w-72 m-auto mb-5'>Expression</h3>
                    {/* <h1 style={{textShadow: '2px 2px #065f46'}}  className=' playfair text-white text-3xl sm:text-5xl text-center'>WEDDING EXPRESSION</h1> */}
                    {/* <div className='border-b-2 border- w-full mb-5' /> */}
                    <input 
                        type='text' 
                        placeholder='Masukkan Nama' 
                        className='w-full p-2 rounded-sm my-2 outline-none'
                        onChange={(e) => setName(e.target.value)}
                        value={name} />
                    <textarea 
                        type='text' 
                        placeholder='Ucapkan Sesuatu' 
                        className='w-full p-2 pb-7 rounded-sm my-2 outline-none flex flex-wrap'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message} />
                        <p className=' text-center py-2'>{alert}</p>
                    <button 
                        type='submit' 
                        // disabled={message ==='' || name === '' ? true : false}
                        className='bg-gray-600 bg-opacity-80 px-4 py-2  rounded-sm text-white'
                        >Kirim</button>
                    <div className='border-b-2 border-gray-800 w-full mt-2 ' />
                    <div className='h-56 overflow-y-scroll'>
                    {ucapan && ucapan.length > 0 ? (
                        ucapan.map((msg) => (
                            <p key={msg.id} className='text-gray-900 border-b-2 border-gray-800 py-3'>
                                <strong>{msg.name}:</strong> {msg.text}
                            </p>
                        ))
                    ) : (
                        <p className='text-gray-900'>Tidak ada ucapan.</p>
                    )}

                    </div>
                </form>
                </AnimateSee>
            </div>
            </AnimatedSection>
        </section>
    )
}

Page7.propTypes = {
    id: PropTypes.string
}