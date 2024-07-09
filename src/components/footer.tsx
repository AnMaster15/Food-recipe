function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
          <p className="mb-4">
            Welcome to FoodMy, your ultimate destination for discovering delicious recipes and understanding the nutrients in your meals. Our mission is to make healthy eating easy and enjoyable by providing you with a wide range of recipes, from quick and simple dishes to gourmet meals, all with detailed nutritional information.
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li>
              <a href="/" className="hover:text-white transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-white transition-colors duration-300">
                Dashboard
              </a>
            </li>
            <li>
              <a href="/recipe" className="hover:text-white transition-colors duration-300">
                Make Your Own Recipe
              </a>
            </li>
            <li>
              <a href="/aboutus" className="hover:text-white transition-colors duration-300">
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/anchit-mehra" className="hover:text-white transition-colors duration-300">
              LinkedIn
            </a>
            <a href="https://www.github.com/Anmaster15" className="hover:text-white transition-colors duration-300">
              GitHub
            </a>
            <a href="https://www.instagram.com/anchit.mehra15" className="hover:text-white transition-colors duration-300">
              Instagram
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
          <p>Amritsar, India</p>
          <p>Amritsar 143001</p>
          <p>Email: food@FoodMy.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
      </div>
      <p className="text-center text-xs pt-8">© 2024 FoodMy. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
