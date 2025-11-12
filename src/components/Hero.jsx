import Spline from '@splinetool/react-spline'

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden" style={{ background: 'linear-gradient(180deg, #FFEFEF 0%, #FFF5E1 60%, #FFD6D6 100%)' }}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="backdrop-blur-[2px] bg-white/40 rounded-3xl p-6 md:p-10 shadow-sm pointer-events-none">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
            Bring Your Memories to Life <span role="img" aria-label="camera">🎥</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 max-w-2xl">
            Scan your artwork or photo to see it come alive with a video.
          </p>
          <div className="mt-8 pointer-events-auto">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD6D6] hover:bg-[#ffc9c9] text-gray-800 px-6 py-3 md:px-8 md:py-4 font-semibold shadow transition"
            >
              Start Scanning
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/0 to-white/30" />
    </section>
  )
}
