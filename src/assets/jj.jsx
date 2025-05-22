<header className="w-full border-b bg-white">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
    
    {/* Left: Logo */}
    <div className="flex items-center gap-2">
      <img src="/notion-logo.png" alt="Notion Logo" className="w-6 h-6" />
    </div>

    {/* Center: Nav Links */}
    <nav className="hidden md:flex gap-6 text-sm text-gray-700">
      <Link href="#" className="hover:text-black">Notion <span className="ml-1">▾</span></Link>
      <Link href="#" className="hover:text-black">Mail <span className="text-blue-500">New</span></Link>
      <Link href="#" className="hover:text-black">Calendar</Link>
      <Link href="#" className="hover:text-black">AI</Link>
      <Link href="#" className="hover:text-black">Enterprise</Link>
      <Link href="#" className="hover:text-black">Pricing</Link>
      <Link href="#" className="hover:text-black">Explore <span className="ml-1">▾</span></Link>
      <Link href="#" className="hover:text-black">Request a demo</Link>
    </nav>

    {/* Right: Auth Buttons */}
    <div className="flex gap-4 items-center text-sm">
      <Link href="#" className="text-gray-700 hover:text-black">Log in</Link>
      <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
        Get Notion free
      </button>
    </div>

  </div>
</header>
