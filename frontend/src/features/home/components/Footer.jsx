import {
  FaInstagram,
  FaXTwitter,
  FaFacebookF,
  FaYoutube,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="mt-10 border-t border-gray-200 text-sm text-black">
      <div className="mx-auto grid grid-cols-2 gap-8 py-10 md:grid-cols-6">
        {/* CONTACT US */}
        <div>
          <h4 className="mb-4 font-medium">CONTACT US</h4>
          <ul className="space-y-2 text-gray-800">
            <li className="flex items-center gap-2">
              <FaPhone /> Call us 1 888 320 9162
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp /> Contact via WhatsApp
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> Email us
            </li>
          </ul>
        </div>

        {/* CLIENT SERVICES */}
        <div>
          <h4 className="mb-4 font-medium">CLIENT SERVICES</h4>
          <ul className="space-y-2 text-gray-800">
            <li>All services</li>
            <li>FAQS</li>
            <li>Order management</li>
            <li>Shopping & product advice</li>
            <li>Boutique services</li>
          </ul>
        </div>

        {/* CORPORATE */}
        <div>
          <h4 className="mb-4 font-medium">CORPORATE</h4>
          <ul className="space-y-2 text-gray-800">
            <li>Investor relations</li>
            <li>Governance</li>
            <li>Sustainability</li>
            <li>Careers</li>
            <li>Moncler Materials</li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h4 className="mb-4 font-medium">LEGAL</h4>
          <ul className="space-y-2 text-gray-800">
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
            <li>Cookie Settings</li>
            <li>Legal Area</li>
          </ul>
        </div>

        {/* DOWNLOAD */}
        <div>
          <h4 className="mb-4 font-medium">DOWNLOAD OUR APP</h4>
          <ul className="space-y-2 text-gray-800">
            <li>iOS users</li>
            <li>Android users</li>
            <li>Discover more</li>
          </ul>
        </div>

        {/* COUNTRY / REGION */}
        <div>
          <h4 className="mb-4 font-medium">COUNTRY / REGION</h4>
          <p className="mb-4 text-gray-500">United States</p>
          <h4 className="mb-2 font-medium">LANGUAGE</h4>
          <p className="mb-4 text-gray-500">English</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 py-6 text-xs text-gray-600">
        <div className="mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Socials */}
          <div className="flex gap-4 text-base text-black">
            <FaInstagram />
            <FaXTwitter />
            <FaFacebookF />
            <FaYoutube />
          </div>
          {/* Copyright */}
          <div className="text-center md:text-left">
            Copyright ©2025 Wearvio by Prabess
            <a href="#" className="underline"></a>
          </div>
          {/* Version info */}
          <div className="text-right text-gray-400">1.0</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
