function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 text-neutral-300 py-16 border-t border-neutral-700/50">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/50 to-neutral-900"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        {/* About Us Section */}
        <div className="group">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4 group-hover:scale-105 transition-transform duration-300">
            About Us
          </h2>
          <p className="mb-4 text-neutral-300 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
            Welcome to FoodMy, your ultimate destination for discovering delicious recipes and understanding the nutrients in your meals. Our mission is to make healthy eating easy and enjoyable by providing you with a wide range of recipes, from quick and simple dishes to gourmet meals, all with detailed nutritional information.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="group">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4 group-hover:scale-105 transition-transform duration-300">
            Quick Links
          </h2>
          <ul className="space-y-3">
            <li>
              <a href="/" className="inline-flex items-center gap-2 hover:text-neutral-100 transition-all duration-300 text-neutral-300 hover:translate-x-1 group/link">
                <span className="text-pink-400 group-hover/link:text-pink-300 transition-colors">🏠</span>
                <span>Home</span>
              </a>
            </li>
            <li>
              <a href="/dashboards" className="inline-flex items-center gap-2 hover:text-neutral-100 transition-all duration-300 text-neutral-300 hover:translate-x-1 group/link">
                <span className="text-purple-400 group-hover/link:text-purple-300 transition-colors">📊</span>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/makerecepie" className="inline-flex items-center gap-2 hover:text-neutral-100 transition-all duration-300 text-neutral-300 hover:translate-x-1 group/link">
                <span className="text-blue-400 group-hover/link:text-blue-300 transition-colors">👨‍🍳</span>
                <span>Make Your Own Recipe</span>
              </a>
            </li>
            <li>
              <a href="/aboutus" className="inline-flex items-center gap-2 hover:text-neutral-100 transition-all duration-300 text-neutral-300 hover:translate-x-1 group/link">
                <span className="text-green-400 group-hover/link:text-green-300 transition-colors">ℹ️</span>
                <span>About Us</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div className="group">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4 group-hover:scale-105 transition-transform duration-300">
            Follow Us
          </h2>
          <div className="flex flex-col space-y-3">
            <a 
              href="https://www.linkedin.com/in/anchit-mehra" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/70 border border-neutral-600 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <span className="text-blue-400">💼</span>
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://www.github.com/Anmaster15" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/70 border border-neutral-600 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <span className="text-purple-400">🐙</span>
              <span>GitHub</span>
            </a>
            <a 
              href="https://www.instagram.com/anchit.mehra15" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/70 border border-neutral-600 hover:border-neutral-500 text-neutral-300 hover:text-neutral-100 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
            >
              <span className="text-pink-400">📸</span>
              <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="group">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4 group-hover:scale-105 transition-transform duration-300">
            Contact Us
          </h2>
          <div className="space-y-2">
            <p className="flex items-center gap-2 text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
              <span className="text-green-400">📍</span>
              <span>Amritsar, India</span>
            </p>
            <p className="flex items-center gap-2 text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
              <span className="text-blue-400">🏢</span>
              <span>Amritsar 143001</span>
            </p>
            <p className="flex items-center gap-2 text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
              <span className="text-purple-400">✉️</span>
              <span>food@FoodMy.com</span>
            </p>
            <p className="flex items-center gap-2 text-neutral-300 group-hover:text-neutral-200 transition-colors duration-300">
              <span className="text-pink-400">📞</span>
              <span>(123) 456-7890</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom section with enhanced styling */}
      <div className="relative z-10 border-t border-neutral-700/50 mt-12 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-400 text-center sm:text-left">
              © 2024 FoodMy. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-neutral-400">
              <span className="text-2xl">🍳</span>
              <span className="text-sm font-medium">Made with ❤️ for food lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;