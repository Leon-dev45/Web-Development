export default function Footer() {
  // Contact Us

  // Address: [Your Address Here]
  // Phone: [Your Phone Number Here]
  // Email: [Your Email Address Here]
  // Follow Us

  // [Social Media Icons/Links Here]
  // Quick Links

  // About Us
  // Our Products
  // Recipes
  // FAQ
  // Blog
  return (
    <footer className="bg-black px-[2.7%] w-full">
      <div className="font-sans grid grid-cols-6 justify-items-center font-semibold text-[color:rgba(255,255,255,0.55)] py-10">
        <div className="inline-grid grid-cols-1 gap-1 ">
          <div className="text-white mb-2 text-lg">Contact Us</div>
          <a href="/" className="hover:text-white">
            Address
          </a>
          <a href="/" className="hover:text-white">
            Phone
          </a>
          <a href="/" className="hover:text-white">
            Email
          </a>
          {/* <a href="/" className="hover:text-white">
            Follow Us
          </a>
          <a href="/" className="hover:text-white">
            OPPO F23 5G
          </a>
          <a href="/" className="hover:text-white">
            OPPO F21s Pro 5G
          </a>
          <a href="/" className="hover:text-white">
            OPPO F21s Pro
          </a>
          <a href="/" className="hover:text-white">
            See All Smartphones
          </a> */}
        </div>
        <div className="inline-grid grid-cols-1 gap-1">
          <div className="text-white mb-2 text-lg">Follow Us</div>
          <a href="/" className="hover:text-white">
            Instagram
          </a>
          <a href="/" className="hover:text-white">
            Telegram
          </a>
          <a href="/" className="hover:text-white">
            Facebook
          </a>
          {/* <a href="/" className="hover:text-white">
            OPPO Enco X2
          </a>
          <a href="/" className="hover:text-white">
            OPPO Enco Air2 Pro
          </a>
          <a href="/" className="hover:text-white">
            OPPO Enco Air2
          </a>
          <a href="/" className="hover:text-white">
            OPPO Watch Free
          </a>
          <a href="/" className="hover:text-white">
            OPPO Band Style
          </a> */}
        </div>
        {/* About Us
// Our Products
// Recipes
// FAQ
// Blog */}
        <div className="inline-grid grid-cols-1 gap-1 auto-rows-min">
          <div className="text-white mb-2 text-lg">About Us</div>
          <a href="/" className="hover:text-white">
            Our Products
          </a>
          <a href="/" className="hover:text-white">
            Recipes
          </a>
        </div>
        <div className="inline-grid grid-cols-1 gap-1">
          <div className="text-white mb-2 text-lg">Support</div>
          <a href="/" className="hover:text-white">
            Contact Us
          </a>
          <a href="/" className="hover:text-white">
            FAQ
          </a>
          <a href="/" className="hover:text-white">
            Blog
          </a>
          <a href="/" className="hover:text-white">
            Terms and Conditions
          </a>
          {/* <a href="/" className="hover:text-white">
            E-waste Management
          </a>
          <a href="/" className="hover:text-white">
            Security Response Center
          </a>
          <a href="/" className="hover:text-white">
            Warranty Policy
          </a>
          <a href="/" className="hover:text-white">
            Investor
          </a> */}
        </div>
        {/* <div className="inline-grid grid-cols-1 gap-1 auto-rows-min">
          <div className="text-white mb-2 text-lg">About OPPO</div>
          <a href="/" className="hover:text-white">
            Our Story
          </a>
          <a href="/" className="hover:text-white">
            Technology
          </a>
          <a href="/" className="hover:text-white">
            Newsroom
          </a>
          <a href="/" className="hover:text-white">
            Campaign
          </a>
          <a href="/" className="hover:text-white">
            Career
          </a>
          <a href="/" className="hover:text-white">
            ColorOS
          </a>
          <a href="/" className="hover:text-white">
            Store Locator
          </a>
        </div>
        <div className="inline-grid grid-cols-1 gap-1 auto-rows-min">
          <div className="text-white mb-2 text-lg">OPPO Community</div>
          <a href="/" className="hover:text-white">
            OPPO Community
          </a>
        </div> */}
      </div>
      <hr className="w-[95%] m-auto border-[color:rgba(255,255,255,0.55)]" />
      <div className="flex py-8 px-8 justify-between items-center hover:text-white">
        <a href="/" className="flex items-center space-x-4">
          <span className="text-white text-xl h-fit">Get Support From Us</span>
        </a>
        <div className="space-x-4 flex items-center">
          <div className="space-x-2">
            <a href="/">
              <i className="fab fa-facebook text-[25px] text-[color:rgba(255,255,255,0.55)] bg-black hover:text-white"></i>
            </a>
            <a href="/">
              <i className="fab fa-instagram text-[25px] text-[color:rgba(255,255,255,0.55)] bg-black hover:text-white"></i>
            </a>
            <a href="/">
              <i className="fab fa-twitter text-[25px] text-[color:rgba(255,255,255,0.55)] bg-black hover:text-white"></i>
            </a>
            <a href="/" className="">
              <i className="fab fa-youtube text-[25px] text-[color:rgba(255,255,255,0.55)] bg-black hover:text-white"></i>
            </a>
          </div>
          <a href="/" className="text-white underline underline-offset-1">
            India (English)
          </a>
        </div>
      </div>
      <hr className="w-[95%] m-auto border-[color:rgba(255,255,255,0.55)]" />
      <div className="flex text-[color:rgba(255,255,255,0.55)] text-xs font-semibold px-8 py-10 items-center justify-between">
        <div className="space-x-8">
          <a href="/" className="hover:text-white">
            Privacy
          </a>
          <a href="/" className="hover:text-white">
            Terms of Use
          </a>
          <a href="/" className="hover:text-white">
            Terms of Sales
          </a>
          <a href="/" className="hover:text-white">
            Cookies
          </a>
          <a href="/" className="hover:text-white">
            Legal & Compliance
          </a>
          <a>Copyright © 2004-2023 OPPO. All rights reserved.</a>
        </div>
        <a href="#" className="text-base hover:text-white">
          Back To Top
        </a>
      </div>
    </footer>
  );
}
