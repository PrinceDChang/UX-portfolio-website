import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { wushuPage, type WushuMediaItem } from '../../data/wushuPage'

type WushuCompanion = NonNullable<WushuMediaItem['companion']>

const SCROLL_UNROLL_S = 5
const SCROLL_REVEAL_SLOW = 1.4

function WushuCompanionContent({ companion }: { companion: WushuCompanion }) {
  if (companion.type === 'video') {
    return (
      <video
        className="wushu-scroll__media"
        src={companion.src}
        poster={companion.poster}
        controls={!companion.autoPlay}
        playsInline
        preload="metadata"
        loop={companion.loop}
        autoPlay={companion.autoPlay}
        muted={companion.muted ?? companion.autoPlay}
      />
    )
  }

  return (
    <img
      className="wushu-scroll__media"
      src={companion.src}
      alt={companion.alt}
      loading="lazy"
    />
  )
}

function WushuBelowPrimaryContent({ media }: { media: NonNullable<WushuMediaItem['belowPrimary']> }) {
  if (media.type === 'video') {
    return (
      <video
        className="wushu-scroll__media"
        src={media.src}
        poster={media.poster}
        controls={!media.autoPlay}
        playsInline
        preload="metadata"
        loop={media.loop}
        autoPlay={media.autoPlay}
        muted={media.muted ?? media.autoPlay}
      />
    )
  }

  return (
    <img className="wushu-scroll__media" src={media.src} alt={media.alt} loading="lazy" />
  )
}

function WushuMediaContent({ item }: { item: WushuMediaItem }) {
  if (item.type === 'video') {
    return (
      <video
        className="wushu-scroll__media"
        src={item.src}
        poster={item.poster}
        controls={!item.autoPlay}
        playsInline
        preload="metadata"
        loop={item.loop}
        autoPlay={item.autoPlay}
        muted={item.muted ?? item.autoPlay}
      />
    )
  }

  return (
    <img className="wushu-scroll__media" src={item.src} alt={item.alt} loading="lazy" />
  )
}

function WushuMediaBlock({ item, index }: { item: WushuMediaItem; index: number }) {
  const reducedMotion = useReducedMotion()
  const primaryWidth =
    item.splitPrimary ?? (item.scale ? `${72 * item.scale}%` : undefined)

  const motionProps = {
    initial: reducedMotion ? false : { opacity: 0, y: 18, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: 0.65 * SCROLL_REVEAL_SLOW,
      delay: reducedMotion ? 0 : (1.05 + index * 0.38) * SCROLL_REVEAL_SLOW,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }

  const bentoClass = `wushu-scroll__item--bento wushu-scroll__item--bento-${item.id}`

  if (item.row?.length) {
    return (
      <motion.figure
        className={`wushu-scroll__item wushu-scroll__item--row wushu-scroll__item--landscape ${bentoClass}`}
        {...motionProps}
        style={
          {
            '--wushu-row-count': item.rowLayout === '2x2' ? 2 : item.row.length,
          } as React.CSSProperties
        }
      >
        <div
          className={`wushu-scroll__row${
            item.rowLayout === '2x2' ? ' wushu-scroll__row--grid-2x2' : ''
          }`}
        >
          {item.row.map((cell) =>
            cell.below ? (
              <div key={cell.src} className="wushu-scroll__row-cell wushu-scroll__row-cell--stack">
                <div className="wushu-scroll__media-frame">
                  <img className="wushu-scroll__media" src={cell.src} alt={cell.alt} loading="lazy" />
                </div>
                <div className="wushu-scroll__media-frame">
                  <img
                    className="wushu-scroll__media"
                    src={cell.below.src}
                    alt={cell.below.alt}
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              <div key={cell.src} className="wushu-scroll__media-frame">
                <img className="wushu-scroll__media" src={cell.src} alt={cell.alt} loading="lazy" />
              </div>
            ),
          )}
        </div>
      </motion.figure>
    )
  }

  if (item.companion) {
    const isPairedLayout =
      item.companion.frameShape === 'landscape' && !item.companion.scale
    const hasFixedCompanion = Boolean(item.companion.splitWidth)

    return (
      <motion.figure
        className={`wushu-scroll__item wushu-scroll__item--split ${bentoClass}`}
        {...motionProps}
        style={
          {
            ...(primaryWidth ? { '--wushu-split-primary': primaryWidth } : {}),
            ...(item.companion.splitWidth
              ? { '--wushu-companion-width': item.companion.splitWidth }
              : {}),
          } as React.CSSProperties
        }
      >
        <div
          className={`wushu-scroll__split${
            isPairedLayout ? ' wushu-scroll__split--paired' : ''
          }${hasFixedCompanion ? ' wushu-scroll__split--companion-fixed' : ''}${
            item.belowPrimary ? ' wushu-scroll__split--with-below' : ''
          }${item.companion.align === 'left' ? ' wushu-scroll__split--companion-left' : ''}`}
        >
          <div className="wushu-scroll__split-primary">
            {item.belowPrimary ? (
              <div className="wushu-scroll__split-primary-stack">
                <div
                  className={`wushu-scroll__media-frame${
                    item.frameShape === 'landscape'
                      ? ' wushu-scroll__media-frame--landscape'
                      : ' wushu-scroll__media-frame--portrait'
                  }${item.frameShape === 'square' ? ' wushu-scroll__media-frame--square' : ''}`}
                >
                  <WushuMediaContent item={item} />
                </div>
                <div className="wushu-scroll__media-frame wushu-scroll__media-frame--landscape">
                  <WushuBelowPrimaryContent media={item.belowPrimary} />
                </div>
              </div>
            ) : (
              <div
                className={`wushu-scroll__media-frame${
                  item.frameShape === 'landscape'
                    ? ' wushu-scroll__media-frame--landscape'
                    : ' wushu-scroll__media-frame--portrait'
                }${item.frameShape === 'square' ? ' wushu-scroll__media-frame--square' : ''}`}
              >
                <WushuMediaContent item={item} />
              </div>
            )}
          </div>
          <div
            className={`wushu-scroll__split-companion${
              item.companion.scale && !item.companion.splitWidth
                ? ' wushu-scroll__split-companion--scaled'
                : ''
            }${
              item.companion.heightScale ? ' wushu-scroll__split-companion--height-scaled' : ''
            }${
              item.companion.align === 'right' ? ' wushu-scroll__split-companion--align-right' : ''
            }${
              item.companion.align === 'left' ? ' wushu-scroll__split-companion--align-left' : ''
            }`}
            style={
              {
                ...(item.companion.scale
                  ? { '--wushu-companion-scale': item.companion.scale }
                  : {}),
                ...(item.companion.heightScale
                  ? { '--wushu-companion-height-scale': item.companion.heightScale }
                  : {}),
              } as React.CSSProperties
            }
          >
            <div
              className={`wushu-scroll__media-frame wushu-scroll__media-frame--fill${
                item.companion.scale && !item.companion.splitWidth
                  ? ' wushu-scroll__media-frame--scaled'
                  : ''
              }${
                item.companion.frameShape === 'landscape'
                  ? ' wushu-scroll__media-frame--landscape'
                  : ''
              }${
                item.companion.frameShape === 'portrait'
                  ? ' wushu-scroll__media-frame--portrait-reel'
                  : ''
              }`}
            >
              <WushuCompanionContent companion={item.companion} />
            </div>
          </div>
        </div>
      </motion.figure>
    )
  }

  return (
    <motion.figure
      className={`wushu-scroll__item wushu-scroll__item--${item.orientation}${
        item.align === 'left'
          ? ' wushu-scroll__item--align-left'
          : item.align === 'center-left'
            ? ' wushu-scroll__item--align-center-left'
            : ''
      } ${bentoClass}`}
      {...motionProps}
    >
      <div
        className="wushu-scroll__media-frame"
        style={
          item.orientation === 'portrait' && item.scale
            ? { maxWidth: `${72 * item.scale}%` }
            : undefined
        }
      >
        <WushuMediaContent item={item} />
      </div>
    </motion.figure>
  )
}

interface WushuScrollGalleryProps {
  playEntry?: boolean
}

export function WushuScrollGallery({ playEntry = true }: WushuScrollGalleryProps) {
  const reducedMotion = useReducedMotion()
  const [ready, setReady] = useState(!playEntry || reducedMotion)

  useEffect(() => {
    if (!playEntry || reducedMotion) {
      setReady(true)
      return
    }
    const timer = window.setTimeout(() => setReady(true), 120)
    return () => window.clearTimeout(timer)
  }, [playEntry, reducedMotion])

  return (
    <div className="wushu-scroll" aria-label="Wushu gallery scroll">
      <div className="wushu-scroll__rod wushu-scroll__rod--top" aria-hidden="true">
        <span className="wushu-scroll__rod-icon wushu-scroll__rod-icon--left">
          <img src="/images/wushu-husky-logo.png" alt="" loading="lazy" />
        </span>
        <span className="wushu-scroll__rod-icon wushu-scroll__rod-icon--right">
          <img src="/images/wushu-nw-academy-logo.png" alt="" loading="lazy" />
        </span>
      </div>

      <motion.div
        className="wushu-scroll__paper"
        initial={reducedMotion ? false : { scaleY: 0, opacity: 0.6 }}
        animate={
          ready
            ? { scaleY: 1, opacity: 1 }
            : { scaleY: 0, opacity: 0.6 }
        }
        transition={{
          duration: reducedMotion ? 0 : SCROLL_UNROLL_S,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformOrigin: 'top center' }}
      >
        <div className="wushu-scroll__paper-inner wushu-scroll__paper-inner--bento">
          {wushuPage.media.map((item, index) => (
            <WushuMediaBlock key={item.id} item={item} index={index} />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="wushu-scroll__rod wushu-scroll__rod--bottom"
        aria-hidden="true"
        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{
          duration: 0.5 * SCROLL_REVEAL_SLOW,
          delay: reducedMotion ? 0 : SCROLL_UNROLL_S - 0.35,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="wushu-scroll__finial wushu-scroll__finial--left" />
        <span className="wushu-scroll__finial wushu-scroll__finial--right" />
      </motion.div>
    </div>
  )
}
