import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Twitter, Linkedin, Github, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'How it Works', href: '/how-it-works' },
        { name: 'Templates', href: '/templates' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'Refund Policy', href: '/refunds' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Startup Guide', href: '/guide' },
        { name: 'Success Stories', href: '/success-stories' },
        { name: 'Help Center', href: '/help' },
        { name: 'API Documentation', href: '/api-docs' },
      ],
    },
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/startupLaunch' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/startupLaunch' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/startupLaunch' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@startupLaunch.com' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 group mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                StartupLaunch
              </span>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Empowering entrepreneurs with AI-powered startup ideas and professional templates to launch successful businesses faster than ever.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors duration-200 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-400">
                © {currentYear} StartupLaunch. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">Made with ❤️ for entrepreneurs</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-400">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};