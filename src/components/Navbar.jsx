export default function Navbar() {
  return (
    <header className="w-full py-4">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-[#FFD6D6] flex items-center justify-center text-gray-800 font-black">AR</div>
          <span className="font-semibold text-gray-800">Memory AR</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-gray-600">
          <a href="#how" className="hover:text-gray-900">How it works</a>
          <a href="#examples" className="hover:text-gray-900">Examples</a>
          <a href="/test" className="hover:text-gray-900">Status</a>
        </nav>
      </div>
    </header>
  )
}
