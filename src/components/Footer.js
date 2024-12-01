import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import "../css/footer.css";  // Import the CSS file


const companyLinks = [
  { href: "#about", text: "About Us" },
  { href: "#careers", text: "Careers" },
  { href: "#press", text: "Press" },
];

const resourceLinks = [
  { href: "#blog", text: "Blog" },
  { href: "#help", text: "Help Center" },
  { href: "#community", text: "Community" },
];

const socialLinks = [
  { href: "#facebook", icon: Facebook },
  { href: "#twitter", icon: Twitter },
  { href: "#instagram", icon: Instagram },
  { href: "#linkedin", icon: Linkedin },
];

const Footer = () => (
  <footer className="footer-wrapper">
    <div className="footer-container container mx-auto px-4">
      <div className="footer-grid grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info Section */}
        <div className="footer-company-info">
          <h3 className="footer-company-title font-bold mb-4">PlaceHolder</h3>
          <p className="footer-company-description text-sm">Simplify your schedule and boost productivity.</p>
        </div>

        {/* Company Links Section */}
        <div className="footer-company-links">
          <h4 className="footer-company-links-title font-semibold mb-4">Company</h4>
          <ul className="footer-company-links-list space-y-2 text-sm">
            {companyLinks.map((link, index) => (
              <li key={index} className="footer-company-links-item">
                <a href={link.href} className="footer-company-link hover:underline">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Links Section */}
        <div className="footer-resource-links">
          <h4 className="footer-resource-links-title font-semibold mb-4">Resources</h4>
          <ul className="footer-resource-links-list space-y-2 text-sm">
            {resourceLinks.map((link, index) => (
              <li key={index} className="footer-resource-links-item">
                <a href={link.href} className="footer-resource-link hover:underline">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Links Section */}
        <div className="footer-social-links">
          <h4 className="footer-social-links-title font-semibold mb-4">Connect</h4>
          <div className="footer-social-links-container flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="footer-social-link text-gray-500 hover:text-gray-600"
                aria-label={link.href.slice(1)}
              >
                <link.icon className="footer-social-icon w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom mt-8 pt-8 border-t border-gray-200 text-sm text-center">
        © {new Date().getFullYear()} PlaceHolder. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
