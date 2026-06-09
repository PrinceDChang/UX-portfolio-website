import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { photographyPage, type PhotographyMediaItem } from '../../data/photographyPage'

const FILM_ROLL_S = 3.4
const FRAMES_FADE_DELAY_S = 3.1
const FRAME_STAGGER_S = 0.12
const FRAME_FADE_S = 0.65

function bentoTransform(item: PhotographyMediaItem) {
  const { rotate = 0, scale = 1 } = item.bento
  if (rotate === 0 && scale === 1) return undefined
  return `rotate(${rotate}deg) scale(${scale})`
}

function PhotographyFrame({
  item,
  index,
  framesReady,
}: {
  item: PhotographyMediaItem
  index: number
  framesReady: boolean
}) {
  const reducedMotion = useReducedMotion()
  const { column, row, size, zIndex } = item.bento

  return (
    <figure
      className={`photography-film__item photography-film__item--${size} photography-film__item--${item.id}`}
      style={{
        gridColumn: column,
        gridRow: row,
        zIndex,
        transform: bentoTransform(item),
      }}
    >
      <motion.div
        className="photography-film__polaroid"
        initial={reducedMotion ? false : { opacity: 0, y: 10, scale: 0.97 }}
        animate={
          framesReady || !!reducedMotion
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 10, scale: 0.97 }
        }
        transition={{
          duration: reducedMotion ? 0 : FRAME_FADE_S,
          delay: reducedMotion ? 0 : index * FRAME_STAGGER_S,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="photography-film__pin" aria-hidden="true" />
        <div className="photography-film__frame-inner">
          <img
            className="photography-film__media"
            src={item.src}
            alt={item.alt}
            loading="lazy"
          />
        </div>
      </motion.div>
    </figure>
  )
}

interface PhotographyFilmGalleryProps {
  playEntry?: boolean
}

export function PhotographyFilmGallery({ playEntry = true }: PhotographyFilmGalleryProps) {
  const reducedMotion = useReducedMotion()
  const [rollReady, setRollReady] = useState(!playEntry || !!reducedMotion)
  const [framesReady, setFramesReady] = useState(!playEntry || !!reducedMotion)

  useEffect(() => {
    if (!playEntry || reducedMotion) {
      setRollReady(true)
      setFramesReady(true)
      return
    }

    const rollTimer = window.setTimeout(() => setRollReady(true), 80)
    const framesTimer = window.setTimeout(
      () => setFramesReady(true),
      FRAMES_FADE_DELAY_S * 1000,
    )

    return () => {
      window.clearTimeout(rollTimer)
      window.clearTimeout(framesTimer)
    }
  }, [playEntry, reducedMotion])

  return (
    <div className="photography-film" aria-label="Photography film gallery">
      <motion.div
        className="photography-film__strip"
        initial={reducedMotion ? false : { scaleY: 0, opacity: 1 }}
        animate={rollReady ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 1 }}
        transition={{
          duration: reducedMotion ? 0 : FILM_ROLL_S,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: 'top center' }}
      >
        <div className="photography-film__perforations photography-film__perforations--top" aria-hidden="true" />
        <div className="photography-film__perforations photography-film__perforations--bottom" aria-hidden="true" />
        <div className="photography-film__perforations photography-film__perforations--left" aria-hidden="true" />
        <div className="photography-film__perforations photography-film__perforations--right" aria-hidden="true" />

        <div className="photography-film__frames photography-film__frames--bento">
          {photographyPage.media.map((item, index) => (
            <PhotographyFrame
              key={item.id}
              item={item}
              index={index}
              framesReady={framesReady}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
