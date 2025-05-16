import Link from "next/link";
import { SiWhatsapp, SiShopee } from "react-icons/si";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { fetchGalery } from "../data/firebase";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
import { CgCloseO } from "react-icons/cg";
import { AnimatedSection, AnimateSee } from "../animation";



export default function Page9({data, id}) {
    const [image, setImage] = useState([])

    useEffect(() =>{
        const fetch = async () => {
            const data = await fetchGalery(id)
            setImage(data)
        }
        fetch()
    },[])

    const [open, setOpen] = useState(false)
    const [imgIndex, setImgIndex] = useState(0)

    const handleImg = (index) => {
        setOpen(true)
        setImgIndex(index)
    }

    const closeBtn = () => setOpen(false)
    const prevImage = () => {
        setImgIndex((prev) => (prev - 1 + image.length ) % image.length)
    }
    const nextImage = () => {
        setImgIndex((next) => (next + 1  ) % image.length)
    }

    return(
        <section className=''>
            <AnimatedSection>
            <h3 className='text-center text-4xl font-extrabold -mb-3 playfair pt-20 '>Capture</h3>
            <h3 className="GVibes text-center text-4xl mb-10 border-b-2 m-auto border-gray-800 w-72  ">Moment</h3>
            <div className=' p-2'>
                {image && image.length > 0 ? image.map((url, index) => (
                <AnimateSee key={index} >
                    <img 
                        key={index} 
                        onClick={() => handleImg(index)}
                        src={url}  
                        className='w-full h-[80vh] sm:h-screen my-2 rounded-sm sm:rounded-md ' 
                        style={{backgroundSize: 'cover', objectFit: 'cover', backgroundPosition: 'center'}} />
                </AnimateSee>
                )):

                null}
                {/* {open && (
                    <section className="h-screen fixed flex z-30 justify-center items-center bg-black bg-opacity-50 p-5 inset-0 w-full">
                        <div className="relative ">
                            <button 
                                onClick={closeBtn}
                                className="absolute top-2 sm:top-2  right-3 p-2 bg-black bg-opacity-70 rounded-full">
                                <CgCloseO className="fill-current text-xl" />
                            </button>
                            <div className="absolute top-1/2 flex justify-between w-full">
                            <button 
                                onClick={prevImage}
                                className="w-10 h-20 ml-2 bg-black bg-opacity-70 rounded-xl flex justify-center items-center">
                                <FaAngleDoubleLeft className="fill-current text-xl"/>
                            </button>
                            <button 
                                onClick={nextImage}
                                className="w-10 h-20 mr-2 bg-black bg-opacity-70 rounded-xl flex justify-center items-center">
                                <FaAngleDoubleRight />
                            </button>
                            </div>
                            <div className="w-[92vw] h-[82vh] sm:w-[80vw] sm:h-[90vh] border-4 border-double rounded-xl  flex justify-center bg-black bg-opacity-50">
                                <img src={image[imgIndex]} className=" sm:w-auto sm:h-auto w-auto h-auto object-cover bg-center bg-cover rounded-xl  " />
                            </div>
                        </div>
                    </section>
                )} */}
            </div>
            </AnimatedSection>
            {/* <div className='text-center pt-28 text-sm italic '>
                <p>
                    Merupakan suatu kebaagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do'a restu kepada kami. <br />
                    Atas do'a dan restunya kami ucapkan terima kasih. 
                </p>
                <p className='font-bold italic pt-10' >Dari Kami yang berbahagia :</p>
                <h3 className='playfair text-3xl italic'>{data?.name?.mens} & {data?.name?.grils}</h3>
            </div>
            <div className="pt-20 pb-10 m-auto">
                <p className="text-center text-xs py-2" >Create Invitation by i-vee</p>
                <div className="flex text-sm w-10 justify-around m-auto " >
                <Link href=''>
                    <SiWhatsapp />
                </Link>
                <Link href=''>
                    <SiShopee />
                </Link>
                </div>
            </div> */}
        </section>
    )
}
Page9.propTypes = {
    data: PropTypes.string,
    id: PropTypes.string
}