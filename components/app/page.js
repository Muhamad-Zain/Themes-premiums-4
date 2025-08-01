'use client'

import { useEffect, useState } from "react";
import { GiMusicSpell } from "react-icons/gi";
import { CgMenuRound } from "react-icons/cg";
import { HiHomeModern } from "react-icons/hi2";
import { FaPeoplePulling } from "react-icons/fa6";
import { MdOutlineShareLocation } from "react-icons/md";
import { PiGooglePhotosLogoFill } from "react-icons/pi";
import PropTypes from "prop-types";

import { fetchData } from "../data/firebase";
import Page1 from "../page1/page";
import Page2 from "../page2/page";
import Page3 from "../page3/page";
import Page4 from "../page4/page";
import Page5 from "../page5/page";
import Page6 from "../page6/page";
import Page7 from "../page7/page";
import Page8 from "../page8/page";
import Page9 from "../page9/page";

export default function App({ id, name }) {
  const [bgToggle, setBgToggle] = useState("bg-black");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
  // 1. Pastikan scroll ke atas segera saat halaman dimuat
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  // 2. Tambahkan ke event `load` agar dipastikan dijalankan saat halaman dimuat
  window.addEventListener('load', scrollToTop);

  // 3. Untuk beberapa browser, juga pastikan saat `beforeunload`, posisi disimpan ke atas
  window.addEventListener('beforeunload', scrollToTop);

  // 4. Lock scroll dan hitung vh
  document.body.style.overflow = 'hidden';
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  return () => {
    document.body.style.overflow = '';
    window.removeEventListener('load', scrollToTop);
    window.removeEventListener('beforeunload', scrollToTop);
  };
}, []);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData(id);
      setData(result);
    };
    getData();
  }, [id]);

  const toggleMusic = () => {
    const audio = document.getElementById("music");
    if (audio.paused) {
      audio.play();
      setBgToggle("bg-black");
    } else {
      audio.pause();
      setBgToggle("bg-red-600");
    }
  };

  const handleStart = () => {
    toggleMusic();
    // setIsHidden(false);
    document.body.style.overflow = "auto";
    setTimeout(() => {
      const section = document.getElementById("page2");
      section?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const scrollToPage = (pageId) => {
    setTimeout(() => {
      const section = document.getElementById(pageId);
      section?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return data ? (
    <section className="sm:px-20 relative">
      <div id="page1">
        <Page1 id={id} btn={handleStart} data={data} name={name}  />
      </div>

      <div id="page2">
        <Page2 id={id} data={data} />
      </div>
      <div id="page3">
        <Page3 id={id} data={data} />
      </div>
        <Page4 id={id} data={data} />
      <div id="page5">
      <Page5 data={data} />
      </div>

      <div id="page6">
      <Page6 id={id} data={data} />
      </div>
      <Page7 id={id} />
      <Page8 id={id} data={data} />
      <Page9 id={id} data={data} />
      {/* Musik Button */}
      <button
        onClick={toggleMusic}
        className={`w-10 h-10 rounded-full border border-white flex justify-center items-center bg-opacity-50 fixed bottom-16 left-5 sm:left-20 z-20 ${bgToggle}`}
      >
        <GiMusicSpell className="fill-current text-white animate-spin" size={25} />
      </button>

      <audio id="music">
        <source src="/melodi.mp3" type="audio/mp3" />
      </audio>

      {/* Navbar Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full border border-white flex justify-center items-center bg-black bg-opacity-50 fixed bottom-5 sm:bottom-16 sm:left-36 left-5 z-20"
      >
        <CgMenuRound className="fill-current text-white" size={25} />
      </button>

      {/* Navbar Buttons */}
      <div
        className={`flex justify-around fixed bottom-5 w-52 left-20 sm:left-48 sm:bottom-16 transition-transform transform-gpu translate-x-full ${open ? "animate-slide-in z-20" : "animate-slide-out z-10"}`}
      >
        <button
          disabled={!open}
          onClick={() => scrollToPage("page2")}
          className="w-9 h-9 rounded-full border border-white flex justify-center items-center bg-black bg-opacity-70"
        >
          <HiHomeModern className="fill-current text-white" size={20} />
        </button>
        <button
          disabled={!open}
          onClick={() => scrollToPage("page3")}
          className="w-9 h-9 rounded-full border border-white flex justify-center items-center bg-black bg-opacity-70"
        >
          <FaPeoplePulling className="fill-current text-white" size={20} />
        </button>
        <button
          disabled={!open}
          onClick={() => scrollToPage("page5")}
          className="w-9 h-9 rounded-full border border-white flex justify-center items-center bg-black bg-opacity-70"
        >
          <MdOutlineShareLocation className="fill-current text-white" size={20} />
        </button>
        <button
          disabled={!open}
          onClick={() => scrollToPage("page6")}
          className="w-9 h-9 rounded-full border border-white flex justify-center items-center bg-black bg-opacity-70"
        >
          <PiGooglePhotosLogoFill className="fill-current text-white" size={20} />
        </button>
      </div>
    </section>
  ) : (
    <h1 className=" text-red-400 flex justify-center items-center h-[50vh]" >ID tidak ada !!</h1>
  );
}

App.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};

