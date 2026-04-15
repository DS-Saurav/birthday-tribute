import { useState, useEffect, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'

// ═══════════════════════════════════════════════════════════
//  🌹  PERSONALIZE THESE VALUES BEFORE DEPLOYING  🌹
// ═══════════════════════════════════════════════════════════
const HER_NAME        = "Swastika Pandeya"               // ← her name
const TOGETHER_SINCE  = new Date("2022-12-19T00:00:00")  // ← your start date
const HERO_SUBTITLE   = "Every star in the sky tonight is a wish made just for you"
// ═══════════════════════════════════════════════════════════

// ── Timeline data ──────────────────────────────────────────
const TIMELINE = [
  {
    id: 1, img: "/images/img1.jpg", side: "right",
    imgPos: "center top", imgRotate: "90deg",
    title: "Your Infectious Laugh",
    period: "A Beautiful Day",
    caption: "The way you laugh with your whole heart — head thrown back, eyes bright — is the most beautiful sound I've ever known.",
  },
  {
    id: 2, img: "/images/img2.jpg", side: "left",
    imgPos: "center top",
    title: "Standing Tall",
    period: "A Sunny Afternoon",
    caption: "Pink dupatta, quiet smile, mountains behind you. You were a whole poem and didn't even know it.",
  },
  {
    id: 3, img: "/images/img8.jpg", side: "right",
    imgPos: "center center",
    title: "Blooming Like Spring",
    period: "March 2026",
    caption: "Under those cascading red flowers, you looked like spring itself had decided to take a stroll.",
  },
  {
    id: 4, img: "/images/img7.jpg", side: "left",
    imgPos: "center center",
    title: "The Rose Moment",
    period: "April 2026",
    caption: "A single red rose — I placed it in your hands and watched your whole face soften. In that moment, I knew: you are the most beautiful thing I have ever given flowers to.",
  },
  {
    id: 5, img: "/images/img16.jpg", side: "right",
    imgPos: "center top",
    title: "Mountain Queen",
    period: "March 2025",
    caption: "With the Himalayas behind you and that smile, I thought — I am without a doubt the luckiest person alive.",
  },
  {
    id: 6, img: "/images/img15.jpg", side: "left",
    imgPos: "center top",
    title: "Golden Hour",
    period: "December 2025",
    caption: "The pine forest turned to gold. Or maybe it was just you — you make everything around you glow.",
  },
  {
    id: 7, img: "/images/img10.jpg", side: "right",
    imgPos: "center top",
    title: "On Top of the World",
    period: "December 2025",
    caption: "You spread your arms wide from my shoulders. I thought: this is what pure joy looks like from below.",
  },
  {
    id: 8, img: "/images/img12.jpg", side: "left",
    imgPos: "center center",
    title: "Sacred Together",
    period: "April 2026",
    caption: "Standing before something ancient and magnificent — just like what we have.",
  },
]

// ── Memory gallery data ────────────────────────────────────
const GALLERY = [
  { id: 1, img: "/images/img3.jpg",
    note: "That face! 😄 The tika on your forehead and those wide, dramatic eyes — you were absolutely making fun of me, weren't you? Still the cutest thing I've ever seen." },
  { id: 2, img: "/images/img6.jpg",
    note: "A quiet, beautiful smile. Wavy hair, soft light. You looked like a painting come to life that day." },
  { id: 3, img: "/images/img4.jpg",
    note: "Festival tika and a cheeky pout — you were the most beautiful person at the entire celebration." },
  { id: 4, img: "/images/img9.jpg",
    note: "Holding hands in a field under a dramatic sky. The mountains didn't need to try that hard with you standing in front of them." },
  { id: 5, img: "/images/img11.jpg",
    note: "Holi colours on your face, earrings catching the light. I couldn't stop smiling for the rest of the day." },
  { id: 6, img: "/images/img5.jpg",
    note: "Eyes half-closed, leaning against me, tree-canopy above. Peaceful. Perfect. I want to live in this moment forever." },
  { id: 7, img: "/images/img13.jpg",
    note: "Selfie in the pines with Tibetan prayer flags above us — it felt like the universe was wishing us well." },
  { id: 8, img: "/images/img14.jpg",
    note: "Two small, happy people before something ancient and magnificent. This trip was everything." },
  { id: 9, img: "/images/img17.jpg",
    note: "Mountain backdrop, matching sweaters, matching smiles. We accidentally coordinate because we're becoming the same person." },
]

// ── Reasons I love you ─────────────────────────────────────
const REASONS = [
  { icon: "🌟", title: "Your laugh",
    body: "It starts somewhere deep before it reaches your lips — and it makes the whole world feel lighter." },
  { icon: "💫", title: "Your heart",
    body: "You love so fiercely, so genuinely. Being loved by you is the greatest gift I have ever received." },
  { icon: "🌸", title: "Your spirit",
    body: "You face everything with grace. The world is a kinder place simply because you are in it." },
  { icon: "✨", title: "How you see me",
    body: "No one makes me feel as seen, as known, as whole as you do. You understand me completely." },
  { icon: "🌹", title: "Your courage",
    body: "You are braver than you know, stronger than you believe, and more loved than you could ever imagine." },
  { icon: "💝", title: "Every little thing",
    body: "The nose pin. The tika. The earrings. The look you give me. Your voice. All of it — everything." },
  { icon: "🦋", title: "How you make me better",
    body: "Being with you makes me want to be the very best version of myself, every single day." },
  { icon: "🌙", title: "Simply you",
    body: "No reason needed. You exist — and that alone is more than enough to be in complete awe." },
]

// ══════════════════════════════════════════════════════════
//  SPARKLE CURSOR HOOK
// ══════════════════════════════════════════════════════════
function useSparkle() {
  const dotRef = useRef(null)

  useEffect(() => {
    // Dot cursor
    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    document.body.appendChild(dot)
    dotRef.current = dot

    const emojis = ['❤️', '✨', '💫', '🌸', '💕', '⭐']
    let lastSparkle = 0

    const moveDot = (x, y) => {
      dot.style.left = x + 'px'
      dot.style.top  = y + 'px'
    }

    const createTrail = (x, y) => {
      const now = Date.now()
      if (now - lastSparkle < 90) return
      lastSparkle = now

      const el = document.createElement('span')
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      const size = 10 + Math.random() * 12
      el.style.cssText = `
        position:fixed;pointer-events:none;z-index:9998;
        font-size:${size}px;
        left:${x - size / 2}px;top:${y - size / 2}px;
        opacity:1;transform:scale(1) translateY(0);
        transition:opacity 0.7s ease-out,transform 0.7s ease-out;
        user-select:none;
      `
      document.body.appendChild(el)
      requestAnimationFrame(() => {
        el.style.opacity = '0'
        el.style.transform = `scale(0.3) translateY(-${25 + Math.random() * 25}px)`
      })
      setTimeout(() => el.remove(), 700)
    }

    const onMouseMove = (e) => { moveDot(e.clientX, e.clientY); createTrail(e.clientX, e.clientY) }
    const onTouch     = (e) => {
      const t = e.touches[0]
      if (t) createTrail(t.clientX, t.clientY)
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouch, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouch)
      dot.remove()
    }
  }, [])
}

// ══════════════════════════════════════════════════════════
//  SCROLL REVEAL HOOK
// ══════════════════════════════════════════════════════════
function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed') }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

// ══════════════════════════════════════════════════════════
//  STARFIELD BACKGROUND
// ══════════════════════════════════════════════════════════
function Stars() {
  const stars = Array.from({ length: 110 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    dur: 2 + Math.random() * 4,
    delay: Math.random() * 4,
  }))

  return (
    <div className="stars-bg" aria-hidden="true">
      {stars.map(s => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.size, height: s.size,
            '--d': `${s.dur}s`, '--delay': `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  FLOATING PETALS
// ══════════════════════════════════════════════════════════
function Petals() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    emoji: ['🌸', '✨', '💕', '🌹', '⭐', '💫'][i % 6],
    x: `${Math.random() * 100}%`,
    dur: `${8 + Math.random() * 12}s`,
    delay: `${Math.random() * 12}s`,
    size: `${14 + Math.random() * 12}px`,
    drift: `${(Math.random() - 0.5) * 120}px`,
    rot: `${Math.random() * 720 - 360}deg`,
  }))
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }} aria-hidden="true">
      {items.map(p => (
        <span key={p.id} className="petal" style={{
          '--x': p.x, '--dur': p.dur, '--delay': p.delay,
          '--size': p.size, '--drift': p.drift, '--rot': p.rot,
        }}>
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  AUDIO PLAYER
// ══════════════════════════════════════════════════════════
function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const [loaded,  setLoaded]  = useState(false)
  const audioRef = useRef(null)

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) { audioRef.current.pause(); setPlaying(false) }
    else { audioRef.current.play().then(() => setPlaying(true)).catch(() => {}) }
  }

  return (
    <div style={{ position:'fixed', top:20, right:20, zIndex:900 }}>
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        onCanPlay={() => setLoaded(true)}
        preload="none"
      />
      <button
        onClick={toggle}
        className="glass"
        style={{
          width: 52, height: 52,
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          border: `1px solid ${playing ? 'var(--gold)' : 'var(--glass-border)'}`,
          background: playing ? 'rgba(245,215,142,0.12)' : 'var(--glass-bg)',
          transition: 'all 0.3s ease',
          boxShadow: playing ? '0 0 20px rgba(245,215,142,0.3)' : 'none',
        }}
        title={playing ? 'Mute music' : 'Play music'}
      >
        {/* Visualizer bars */}
        <div style={{ display:'flex', gap:3, alignItems:'flex-end', height:22 }}>
          {[1,0.6,1.0,0.7,0.9].map((h, i) => (
            <div key={i} style={{
              width: 3, borderRadius: 2,
              background: playing ? 'var(--gold)' : 'rgba(255,255,255,0.4)',
              height: `${h * 100}%`,
              transformOrigin: 'bottom',
              animation: playing ? `bar-wave ${0.5 + i * 0.15}s ease-in-out infinite alternate` : 'none',
            }}/>
          ))}
        </div>
        <style>{`
          @keyframes bar-wave {
            from { transform: scaleY(0.3); }
            to   { transform: scaleY(1); }
          }
        `}</style>
      </button>
      <div style={{
        position:'absolute', right:0, top:58,
        fontSize:'0.65rem', color:'var(--gold)', opacity:0.6,
        whiteSpace:'nowrap', letterSpacing:'0.05em',
        fontFamily:'Montserrat,sans-serif',
      }}>
        {playing ? '♪ playing' : '♪ music'}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════
//  HERO SECTION
// ══════════════════════════════════════════════════════════
function Hero() {
  const [clicked, setClicked] = useState(false)

  const handleBegin = () => {
    setClicked(true)
    // small confetti burst on begin
    confetti({
      particleCount: 80, spread: 100, origin: { y: 0.6 },
      colors: ['#F5D78E', '#FFB6C1', '#ffffff', '#D4AF37'],
    })
    setTimeout(() => {
      document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })
    }, 600)
  }

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #1a0d2e 0%, #0d0d2b 40%, #07071a 100%)',
    }}>
      <Petals />

      {/* Ambient orbs */}
      {[
        { top:'-15%', left:'-10%', w:500, color:'rgba(213,140,255,0.07)' },
        { top:'60%',  right:'-10%', w:400, color:'rgba(245,215,142,0.07)' },
        { top:'30%',  left:'40%',  w:300, color:'rgba(255,182,193,0.06)' },
      ].map((o, i) => (
        <div key={i} style={{
          position:'absolute', borderRadius:'50%',
          width: o.w, height: o.w,
          background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
          top: o.top, left: o.left, right: o.right,
          animation: `float ${6 + i * 2}s ease-in-out infinite`,
          pointerEvents: 'none',
        }} aria-hidden="true"/>
      ))}

      {/* Glass hero card */}
      <div
        className="glass"
        style={{
          position: 'relative', zIndex: 10,
          maxWidth: 560, width: '90%',
          padding: 'clamp(2.5rem, 6vw, 4rem)',
          textAlign: 'center',
          animation: 'float-up 1.2s cubic-bezier(.22,1,.36,1) forwards, glow-pulse 4s ease-in-out 1.5s infinite',
          borderRadius: 28,
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top decorative ring */}
        <div style={{
          width: 80, height: 80, margin: '0 auto 1.5rem',
          borderRadius: '50%',
          border: '1.5px solid var(--gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'spin-slow 20s linear infinite',
          opacity: 0.7,
        }}>
          <span className="heartbeat" style={{ fontSize: 32, animation: 'heartbeat 2.2s ease-in-out infinite' }}>🌸</span>
        </div>

        <div className="section-sub" style={{ animationDelay:'0.3s' }}>
          ✦ A Message Just For You ✦
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.6rem, 8vw, 4.5rem)',
          fontWeight: 700, lineHeight: 1.1,
          margin: '0.6rem 0 0.4rem',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, var(--gold-bright) 0%, var(--cream) 45%, var(--rose) 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            display: 'block',
          }}>
            Happy Birthday
          </span>
          <span style={{
            fontStyle: 'italic',
            background: 'linear-gradient(270deg, #ffd966, #ffb6c1, #f5d78e, #e87b8e, #ffd966)',
            backgroundSize: '300% 300%',
            animation: 'name-gradient 4s ease infinite',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            display: 'block',
          }}>
            {HER_NAME}
          </span>
        </h1>

        <div className="gold-divider" />

        <p style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 'clamp(0.85rem, 2vw, 1rem)',
          color: 'rgba(253,246,236,0.75)',
          lineHeight: 1.7, letterSpacing: '0.03em',
          margin: '1rem 0 2rem',
        }}>
          {HERO_SUBTITLE}
        </p>

        <button
          className="btn-gold"
          onClick={handleBegin}
          disabled={clicked}
          style={{
            padding: '0.9rem 2.4rem',
            borderRadius: 50,
            fontSize: '0.9rem',
            letterSpacing: '0.12em',
            opacity: clicked ? 0.5 : 1,
            transform: clicked ? 'scale(0.95)' : undefined,
          }}
        >
          {clicked ? '✨ Journey Unfolding...' : '✨ Begin Our Story'}
        </button>

        {/* Small hint */}
        <p style={{
          marginTop: '1.5rem', fontSize: '0.72rem',
          color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em',
          fontFamily: 'Montserrat, sans-serif',
        }}>
          SCROLL TO EXPLORE
          <span style={{ display:'block', marginTop:6, fontSize:16, opacity:0.5,
            animation: 'float 1.5s ease-in-out infinite' }}>↓</span>
        </p>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════
//  TIMELINE SECTION
// ══════════════════════════════════════════════════════════
function Timeline() {
  return (
    <section id="journey" style={{ position:'relative', padding:'7rem 1.5rem', overflow:'hidden' }}>
      {/* Section header */}
      <div className="reveal" style={{ textAlign:'center', marginBottom:'5rem' }}>
        <p className="section-sub">✦ Our Journey ✦</p>
        <h2 className="section-title">Moments That Are Us</h2>
        <div className="gold-divider" />
      </div>

      {/* Vertical line */}
      <div style={{ position:'relative', maxWidth: 900, margin:'0 auto' }}>
        <div className="timeline-line" />

        {TIMELINE.map((item, idx) => {
          const isRight = item.side === 'right'
          return (
            <div
              key={item.id}
              className={isRight ? 'reveal-right' : 'reveal-left'}
              style={{
                display: 'flex',
                justifyContent: isRight ? 'flex-end' : 'flex-start',
                marginBottom: '4rem',
                position: 'relative',
              }}
            >
              {/* Dot on line */}
              <div style={{
                position:'absolute', left:'50%', top:'50%',
                transform:'translate(-50%,-50%)',
                width:14, height:14, borderRadius:'50%',
                background:'var(--gold)',
                boxShadow:'0 0 16px var(--gold)',
                animation: 'dot-pulse 2.5s ease-in-out infinite',
                zIndex:2,
              }}/>

              {/* Card */}
              <div
                className="glass glass-hover"
                style={{
                  width:'44%',
                  minWidth: 260,
                  overflow:'hidden',
                  transition:'all 0.3s ease',
                  // Mobile: full width
                }}
              >
                <div style={{ position:'relative', paddingTop: item.id === 1 ? '100%' : '66%', overflow:'hidden' }}>
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      position:'absolute', inset:0,
                      width: item.imgRotate ? '100%' : '100%',
                      height: item.imgRotate ? '100%' : '100%',
                      objectFit:'cover',
                      objectPosition: item.imgPos || 'center center',
                      transform: item.imgRotate ? `rotate(${item.imgRotate})` : 'scale(1)',
                      transition:'transform 0.5s ease',
                    }}
                    onMouseEnter={e => {
                      e.target.style.transform = item.imgRotate
                        ? `rotate(${item.imgRotate}) scale(1.05)`
                        : 'scale(1.05)'
                    }}
                    onMouseLeave={e => {
                      e.target.style.transform = item.imgRotate
                        ? `rotate(${item.imgRotate})`
                        : 'scale(1)'
                    }}
                  />
                  <div style={{
                    position:'absolute', inset:0,
                    background:'linear-gradient(to top, rgba(7,7,26,0.7) 0%, transparent 50%)',
                  }}/>
                  <span style={{
                    position:'absolute', bottom:12, left:12,
                    fontSize:'0.7rem', fontFamily:'Montserrat,sans-serif',
                    letterSpacing:'0.12em', color:'var(--gold)',
                    background:'rgba(0,0,0,0.4)', padding:'3px 10px', borderRadius:20,
                  }}>
                    {item.period}
                  </span>
                </div>
                <div style={{ padding:'1.2rem 1.4rem 1.4rem' }}>
                  <h3 style={{
                    fontFamily:"'Playfair Display',serif",
                    fontSize:'1.15rem', fontWeight:600,
                    color:'var(--gold)', margin:'0 0 0.5rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontFamily:'Montserrat,sans-serif',
                    fontSize:'0.83rem', lineHeight:1.65,
                    color:'rgba(253,246,236,0.7)', margin:0,
                  }}>
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile: override to single column */}
      <style>{`
        @media (max-width: 640px) {
          .timeline-line { left: 18px !important; }
          .reveal-left, .reveal-right { justify-content: flex-end !important; }
          .reveal-left > div:last-child,
          .reveal-right > div:last-child { width: 88% !important; min-width: 0 !important; }
          .reveal-left > div:first-child,
          .reveal-right > div:first-child { left: 18px !important; }
        }
      `}</style>
    </section>
  )
}

// ══════════════════════════════════════════════════════════
//  MEMORY GRID  +  MODAL
// ══════════════════════════════════════════════════════════
function MemoryGrid() {
  const [selected, setSelected] = useState(null)

  return (
    <section style={{ padding:'6rem 1.5rem', background:'rgba(255,255,255,0.015)' }}>
      <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
        <p className="section-sub">✦ Memory Grid ✦</p>
        <h2 className="section-title">Frames of You</h2>
        <div className="gold-divider"/>
        <p style={{
          fontFamily:'Montserrat,sans-serif', fontSize:'0.88rem',
          color:'rgba(253,246,236,0.5)', marginTop:'0.8rem',
          letterSpacing:'0.05em',
        }}>
          Click any photo to read a note ✦
        </p>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: 960, margin:'0 auto',
        display:'grid',
        gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
        gap:'1.25rem',
      }}>
        {GALLERY.map((item, idx) => (
          <div
            key={item.id}
            className={`reveal glass glass-hover`}
            style={{ transitionDelay: `${(idx % 3) * 0.08}s`, cursor:'pointer', overflow:'hidden' }}
            onClick={() => setSelected(item)}
          >
            <div style={{ position:'relative', paddingTop:'100%', overflow:'hidden' }}>
              <img
                src={item.img}
                alt="Memory"
                loading="lazy"
                style={{
                  position:'absolute', inset:0,
                  width:'100%', height:'100%',
                  objectFit:'cover',
                  transition:'transform 0.5s ease',
                }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              {/* Hover overlay */}
              <div style={{
                position:'absolute', inset:0,
                background:'linear-gradient(to top, rgba(7,7,26,0.85) 0%, transparent 55%)',
                display:'flex', alignItems:'flex-end',
                padding:'1rem',
                opacity:0, transition:'opacity 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0'}
              >
                <span style={{
                  color:'var(--gold)', fontFamily:'Montserrat,sans-serif',
                  fontSize:'0.75rem', letterSpacing:'0.1em',
                }}>
                  ✦ Read note
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="modal-backdrop"
          onClick={() => setSelected(null)}
        >
          <div
            className="modal-inner glass"
            style={{
              maxWidth: 680, width:'92%',
              maxHeight:'90vh', overflow:'hidden',
              borderRadius: 24,
              border:'1px solid rgba(245,215,142,0.2)',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display:'flex', flexDirection:'column' }}>
              {/* Photo */}
              <div style={{ position:'relative', maxHeight:'55vh', overflow:'hidden' }}>
                <img
                  src={selected.img}
                  alt="Memory"
                  style={{ width:'100%', display:'block', objectFit:'cover', maxHeight:'55vh' }}
                />
                {/* Close */}
                <button
                  onClick={() => setSelected(null)}
                  style={{
                    position:'absolute', top:14, right:14,
                    width:36, height:36, borderRadius:'50%',
                    background:'rgba(7,7,26,0.7)',
                    border:'1px solid rgba(255,255,255,0.2)',
                    color:'white', fontSize:18,
                    cursor:'pointer', display:'flex',
                    alignItems:'center', justifyContent:'center',
                  }}
                >
                  ×
                </button>
              </div>
              {/* Note */}
              <div style={{ padding:'1.8rem 2rem' }}>
                <div style={{
                  display:'flex', gap:10, alignItems:'center', marginBottom:'0.75rem',
                }}>
                  <div style={{ flex:1, height:1, background:'linear-gradient(90deg, var(--gold), transparent)' }}/>
                  <span style={{ color:'var(--rose)', fontSize:18 }}>💌</span>
                  <div style={{ flex:1, height:1, background:'linear-gradient(90deg, transparent, var(--gold))' }}/>
                </div>
                <p className="handwritten">{selected.note}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// ══════════════════════════════════════════════════════════
//  REASONS CAROUSEL (3D Swiper)
// ══════════════════════════════════════════════════════════
function ReasonsCarousel() {
  const [curr, setCurr] = useState(0)
  const total = REASONS.length
  const prev = () => setCurr(i => (i - 1 + total) % total)
  const next = () => setCurr(i => (i + 1) % total)

  // Touch swipe support
  const touchStartX = useRef(null)
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e) => {
    if (touchStartX.current === null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev()
    touchStartX.current = null
  }

  // For 3D: show 3 cards side by side
  const getStyle = (idx) => {
    const diff = ((idx - curr + total) % total)
    const normalised = diff > total / 2 ? diff - total : diff

    if (normalised === 0) return {
      transform:'translateX(0) scale(1) rotateY(0deg)',
      zIndex:10, opacity:1, filter:'none',
    }
    if (normalised === 1 || normalised === -1) return {
      transform:`translateX(${normalised * 85}%) scale(0.82) rotateY(${normalised * -25}deg)`,
      zIndex:5, opacity:0.55, filter:'brightness(0.6)',
    }
    if (normalised === 2 || normalised === -2) return {
      transform:`translateX(${normalised * 80}%) scale(0.65) rotateY(${normalised * -40}deg)`,
      zIndex:2, opacity:0.2, filter:'brightness(0.4)',
    }
    return { transform:'translateX(0) scale(0.4)', zIndex:0, opacity:0 }
  }

  return (
    <section style={{ padding:'7rem 1.5rem' }}>
      <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
        <p className="section-sub">✦ Written in Stars ✦</p>
        <h2 className="section-title">Reasons I Love You</h2>
        <div className="gold-divider"/>
      </div>

      {/* 3D stage */}
      <div style={{ position:'relative', maxWidth:800, margin:'0 auto', overflow:'visible' }}>
        <div
          style={{
            perspective: 1200,
            height: 300,
            position:'relative',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {REASONS.map((r, idx) => {
            const s = getStyle(idx)
            return (
              <div
                key={idx}
                className="glass"
                style={{
                  position:'absolute',
                  width: 'min(300px, 80vw)',
                  padding:'2rem 1.8rem',
                  textAlign:'center',
                  transition:'all 0.55s cubic-bezier(.34,1.2,.64,1)',
                  borderRadius:20,
                  cursor: idx === curr ? 'default' : 'pointer',
                  border: idx === curr ? '1px solid rgba(245,215,142,0.35)' : '1px solid var(--glass-border)',
                  background: idx === curr ? 'rgba(245,215,142,0.07)' : 'var(--glass-bg)',
                  ...s,
                }}
                onClick={() => idx !== curr && (idx === (curr + 1) % total ? next() : prev())}
              >
                <div style={{ fontSize:42, marginBottom:'0.8rem', lineHeight:1 }}>{r.icon}</div>
                <h3 style={{
                  fontFamily:"'Playfair Display',serif",
                  fontSize:'1.2rem', fontWeight:600,
                  color:'var(--gold)', margin:'0 0 0.7rem',
                }}>
                  {r.title}
                </h3>
                <p style={{
                  fontFamily:'Montserrat,sans-serif',
                  fontSize:'0.85rem', lineHeight:1.7,
                  color:'rgba(253,246,236,0.75)', margin:0,
                }}>
                  {r.body}
                </p>
              </div>
            )
          })}
        </div>

        {/* Navigation */}
        <div style={{
          display:'flex', justifyContent:'center', alignItems:'center',
          gap:'1.5rem', marginTop:'2.5rem',
        }}>
          <button
            onClick={prev}
            className="glass"
            style={{
              width:44, height:44, borderRadius:'50%',
              fontSize:18, cursor:'pointer',
              color:'var(--gold)', border:'1px solid var(--glass-border)',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.2s',
            }}
          >‹</button>

          {/* Dots */}
          <div style={{ display:'flex', gap:6 }}>
            {REASONS.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurr(i)}
                style={{
                  width: i === curr ? 22 : 7,
                  height:7, borderRadius:4,
                  background: i === curr ? 'var(--gold)' : 'rgba(245,215,142,0.3)',
                  cursor:'pointer',
                  transition:'all 0.3s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="glass"
            style={{
              width:44, height:44, borderRadius:'50%',
              fontSize:18, cursor:'pointer',
              color:'var(--gold)', border:'1px solid var(--glass-border)',
              display:'flex', alignItems:'center', justifyContent:'center',
              transition:'all 0.2s',
            }}
          >›</button>
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════
//  DAYS TOGETHER COUNTER
// ══════════════════════════════════════════════════════════
function DaysCounter() {
  const [t, setT] = useState({ days:0, hours:0, minutes:0, seconds:0 })

  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - TOGETHER_SINCE.getTime()
      if (diff < 0) return
      setT({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      })
    }
    tick(); const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label:'Days',    value: t.days    },
    { label:'Hours',   value: t.hours   },
    { label:'Minutes', value: t.minutes },
    { label:'Seconds', value: t.seconds },
  ]

  return (
    <section style={{
      padding:'7rem 1.5rem',
      background:'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(245,215,142,0.04) 0%, transparent 70%)',
    }}>
      <div className="reveal" style={{ textAlign:'center', marginBottom:'3.5rem' }}>
        <p className="section-sub">✦ Still Counting ✦</p>
        <h2 className="section-title">Us, Together</h2>
        <div className="gold-divider"/>
        <p style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:'clamp(1rem,2.5vw,1.2rem)',
          fontStyle:'italic', color:'rgba(253,246,236,0.55)',
          marginTop:'0.5rem',
        }}>
          Every second of this has been a gift.
        </p>
      </div>

      <div style={{
        display:'flex', flexWrap:'wrap',
        justifyContent:'center', gap:'1.25rem',
        maxWidth:700, margin:'0 auto',
      }}>
        {units.map((u, i) => (
          <div
            key={u.label}
            className={`reveal glass`}
            style={{
              transitionDelay:`${i*0.1}s`,
              minWidth:140, flex:'1 1 130px',
              padding:'2rem 1rem',
              textAlign:'center',
              border:'1px solid rgba(245,215,142,0.18)',
              borderRadius:20,
            }}
          >
            <span className="counter-digit">{String(u.value).padStart(2,'0')}</span>
            <span style={{
              display:'block', marginTop:'0.6rem',
              fontFamily:'Montserrat,sans-serif',
              fontSize:'0.72rem', letterSpacing:'0.2em',
              textTransform:'uppercase', color:'rgba(245,215,142,0.6)',
            }}>
              {u.label}
            </span>
          </div>
        ))}
      </div>

      <p className="reveal" style={{
        textAlign:'center', marginTop:'2.5rem',
        fontFamily:"'Playfair Display',serif",
        fontStyle:'italic',
        fontSize:'clamp(0.9rem,2vw,1.1rem)',
        color:'rgba(253,246,236,0.4)',
        transitionDelay:'0.4s',
      }}>
        … and every one of them with you has been worth it.
      </p>
    </section>
  )
}

// ══════════════════════════════════════════════════════════
//  BIRTHDAY CAKE + CONFETTI
// ══════════════════════════════════════════════════════════
function BirthdayCake() {
  const [blown, setBlown] = useState(false)

  const triggerConfetti = () => {
    if (blown) return
    setBlown(true)

    const duration = 6000
    const end = Date.now() + duration
    const colors = ['#F5D78E','#FFD966','#FFB6C1','#ffffff','#C0C0C0','#D4AF37']

    const frame = () => {
      confetti({ particleCount:4, angle:60,  spread:60, origin:{x:0,   y:0.7}, colors })
      confetti({ particleCount:4, angle:120, spread:60, origin:{x:1,   y:0.7}, colors })
      confetti({ particleCount:5, angle:90,  spread:80, origin:{x:0.5, y:0.9}, colors })
      if (Date.now() < end) requestAnimationFrame(frame)
    }
    frame()

    // Big burst at start
    confetti({ particleCount:150, spread:180, startVelocity:35, origin:{y:0.5}, colors, scalar:1.3 })
  }

  return (
    <section style={{ padding:'7rem 1.5rem 5rem', textAlign:'center' }}>
      <div className="reveal" style={{ marginBottom:'3rem' }}>
        <p className="section-sub">✦ Make A Wish ✦</p>
        <h2 className="section-title">Blow Out the Candles</h2>
        <div className="gold-divider"/>
      </div>

      {/* SVG Cake */}
      <div
        className="reveal"
        style={{
          cursor: blown ? 'default' : 'pointer',
          display:'inline-block',
          transition:'transform 0.2s',
          userSelect:'none',
        }}
        onClick={triggerConfetti}
      >
        <svg
          width="220" height="260" viewBox="0 0 220 260"
          style={{ overflow:'visible', filter: blown ? 'grayscale(0.3)' : 'none' }}
        >
          {/* Plate */}
          <ellipse cx="110" cy="248" rx="90" ry="10" fill="rgba(245,215,142,0.2)" />

          {/* Bottom tier */}
          <rect x="25" y="160" width="170" height="80" rx="8" fill="#2a1a3e"/>
          <rect x="25" y="160" width="170" height="80" rx="8"
            fill="none" stroke="rgba(245,215,142,0.4)" strokeWidth="1.5"/>
          {/* Frosting drops bottom */}
          {[40,70,100,130,160,180].map((x,i) => (
            <ellipse key={i} cx={x} cy="162" rx="10" ry="8" fill="#3d2060" opacity="0.8"/>
          ))}
          {/* Bottom decoration */}
          <text x="110" y="208" textAnchor="middle" fontSize="22" fill="var(--gold)" opacity="0.9">
            🌸 Happy Birthday 🌸
          </text>

          {/* Middle tier */}
          <rect x="45" y="90" width="130" height="70" rx="8" fill="#1e1040"/>
          <rect x="45" y="90" width="130" height="70" rx="8"
            fill="none" stroke="rgba(255,182,193,0.4)" strokeWidth="1.5"/>
          {/* Frosting drops mid */}
          {[55,80,105,130,155].map((x,i) => (
            <ellipse key={i} cx={x} cy="92" rx="9" ry="7" fill="#2a1a4e" opacity="0.8"/>
          ))}
          {/* Stars */}
          {[62,90,110,130,158].map((x,i) => (
            <text key={i} x={x} y="132" fontSize="14" fill="rgba(245,215,142,0.7)">✦</text>
          ))}

          {/* Top tier */}
          <rect x="70" y="30" width="80" height="60" rx="8" fill="#150d30"/>
          <rect x="70" y="30" width="80" height="60" rx="8"
            fill="none" stroke="rgba(245,215,142,0.3)" strokeWidth="1.5"/>

          {/* Candles */}
          {[85, 110, 135].map((x, i) => (
            <g key={i} className={blown ? '' : ''}>
              {/* Candle body */}
              <rect x={x-5} y="8" width="10" height="22" rx="3"
                fill={['#e87b8e','#f5d78e','#b8a9f0'][i]}/>
              {/* Wick */}
              <line x1={x} y1="8" x2={x} y2="4" stroke="#555" strokeWidth="1.5"/>
              {/* Flame */}
              {!blown && (
                <g className="candle-flame" style={{ transformOrigin:`${x}px 0px` }}>
                  <ellipse cx={x} cy="1" rx="5" ry="8"
                    fill="#FFD966" opacity="0.9"/>
                  <ellipse cx={x} cy="2" rx="3" ry="5"
                    fill="#FF6B35" opacity="0.8"/>
                  <ellipse cx={x} cy="3" rx="1.5" ry="3"
                    fill="white" opacity="0.7"/>
                  {/* Glow */}
                  <circle cx={x} cy="1" r="10"
                    fill="rgba(255,217,102,0.15)"/>
                </g>
              )}
              {blown && (
                <text x={x} y="3" textAnchor="middle" fontSize="10">💨</text>
              )}
            </g>
          ))}
        </svg>

        <div style={{ marginTop:'1.5rem' }}>
          {!blown ? (
            <button
              className="btn-gold"
              style={{ padding:'0.9rem 2.8rem', borderRadius:50, fontSize:'0.9rem', letterSpacing:'0.1em' }}
              onClick={triggerConfetti}
            >
              🎂 Click to Celebrate!
            </button>
          ) : (
            <div style={{
              fontFamily:"'Playfair Display',serif",
              fontSize:'clamp(1.1rem,3vw,1.6rem)',
              fontStyle:'italic',
              background:'linear-gradient(135deg, var(--gold-bright), var(--rose))',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              animation:'float-up 0.6s ease forwards',
            }}>
              ✨ Your wish is on its way! ✨
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════
//  CLOSING LETTER
// ══════════════════════════════════════════════════════════
function ClosingLetter() {
  return (
    <section style={{ padding:'5rem 1.5rem 8rem' }}>
      <div
        className="reveal glass"
        style={{
          maxWidth:660, margin:'0 auto',
          padding:'clamp(2rem,5vw,3.5rem)',
          borderRadius:24,
          border:'1px solid rgba(245,215,142,0.18)',
          textAlign:'center',
        }}
      >
        <div style={{ fontSize:36, marginBottom:'1.2rem' }}>💌</div>
        <p className="section-sub" style={{ marginBottom:'0.2rem' }}>A Final Note</p>
        <h2 style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:'clamp(1.6rem,4vw,2.4rem)',
          fontWeight:600, color:'var(--gold)',
          margin:'0 0 1.5rem', lineHeight:1.2,
        }}>
          For You, {HER_NAME.split(' ')[0]}. Always.
        </h2>
        <div className="gold-divider" />
        <div style={{ marginTop:'1.5rem' }}>
          {[
            "On your birthday, I don't want to just say 'happy birthday'.",
            "I want to say: thank you for existing.",
            "Thank you for every laugh, every shared silence, every ordinary Tuesday that became extraordinary because you were in it.",
            "You are the most beautiful thing to happen to me — not because of the grand moments, but because of all the small, quiet ones we've built together.",
            "Here's to you. To us. To every day ahead.",
            `I love you, ${HER_NAME.split(' ')[0]} — yesterday, today, and every tomorrow there is.`,
          ].map((line, i) => (
            <p key={i} style={{
              fontFamily:"'Playfair Display',serif",
              fontStyle:'italic',
              fontSize:'clamp(0.9rem,2vw,1.05rem)',
              lineHeight:1.85,
              color: i === 5 ? 'var(--gold)' : 'rgba(253,246,236,0.78)',
              margin:'0.5rem 0',
              fontWeight: i === 5 ? 600 : 400,
            }}>
              {line}
            </p>
          ))}
        </div>
        <div style={{ marginTop:'2rem', fontSize:32 }}>🌸 ❤️ 🌸</div>
      </div>
    </section>
  )
}

// ══════════════════════════════════════════════════════════
//  ROOT APP
// ══════════════════════════════════════════════════════════
export default function App() {
  useSparkle()
  useScrollReveal()

  return (
    <div style={{ position:'relative', minHeight:'100vh' }}>
      <Stars />
      <AudioPlayer />

      <div style={{ position:'relative', zIndex:1 }}>
        <Hero />
        <Timeline />
        <MemoryGrid />
        <ReasonsCarousel />
        <DaysCounter />
        <BirthdayCake />
        <ClosingLetter />

        {/* Footer */}
        <footer style={{
          textAlign:'center', padding:'2rem 1.5rem',
          fontFamily:'Montserrat,sans-serif', fontSize:'0.75rem',
          letterSpacing:'0.12em',
          borderTop:'1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{
            color:'rgba(245,215,142,0.5)',
            marginBottom:'0.4rem',
          }}>
            Made with ❤️ for the one who makes every day worth living
          </div>
          <div style={{
            color:'rgba(245,215,142,0.2)',
            fontSize:'0.65rem',
            letterSpacing:'0.2em',
          }}>
            ✦ Happy Birthday, {HER_NAME} ✦
          </div>
        </footer>
      </div>
    </div>
  )
}
