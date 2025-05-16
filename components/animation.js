// src/components/AnimatedSection.js

import { motion } from 'framer-motion';
const AnimatedSection = ({ children }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 200 }} // Mulai dari opacity 0 dan sedikit di bawah
        whileInView={{ opacity: 1, y: 0 }} // Saat berada di view, set opacity 1 dan ke posisi asli
        transition={{ duration: 0.7 }} // Durasi animasi
        viewport={{ once: true }} // Animasi akan diputar ulang saat scroll kembali
      >
        {children}
      </motion.div>
    );
  };
const AnimateSee= ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }} // Mulai dari opacity 0 dan skala 0.5
      whileInView={{ opacity: 1, scale: 1 }} // Saat berada di view, set opacity 1 dan skala 1
      transition={{ duration: 0.5 }} // Durasi animasi
      viewport={{ once: false }} // Animasi akan diputar ulang saat scroll kembali
    >
      {children}
    </motion.div>
  );
};

export {AnimateSee, AnimatedSection}
// src/components/AnimatedSection.js

