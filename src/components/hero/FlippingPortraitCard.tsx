import { motion, type MotionValue } from 'framer-motion'
import { portraitBackSrc, portraitSrc } from '../../data/content'

interface FlippingPortraitCardProps {
  rotateY: MotionValue<number>
  className?: string
}

export function FlippingPortraitCard({
  rotateY,
  className = '',
}: FlippingPortraitCardProps) {
  return (
    <motion.div
      className={`portrait-card relative h-[min(62vw,420px)] w-[min(46vw,300px)] md:h-[520px] md:w-[340px] ${className}`}
      style={{ rotateY }}
    >
      <div className="portrait-card-face absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[#ececec] shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
        <img
          src={portraitSrc}
          alt="Portrait of Oey Chang"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="portrait-card-face portrait-card-back absolute inset-0 overflow-hidden rounded-[1.75rem] bg-[#ececec] shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
        <img
          src={portraitBackSrc}
          alt="Oey Chang performing martial arts"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </motion.div>
  )
}
