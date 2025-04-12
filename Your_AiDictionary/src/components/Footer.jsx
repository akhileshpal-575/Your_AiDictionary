import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1F2937] text-gray-300 py-4 px-6 border-t border-[#374151] w-full">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Lexonary<span className="text-purple-600">AI</span></h3>
          <p className="text-xs">Your friendly AI-powered dictionary.</p>
        </div>

        <div className="flex gap-5 text-gray-400">
          <a href="mailto:palgie572@email.com" className="hover:text-purple-500 transition">
            <Mail size={18} />
          </a>
          <a href="https://github.com/akhileshpal-575" target="_blank" className="hover:text-purple-500 transition">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com/in/akhileshpal068" target="_blank" className="hover:text-purple-500 transition">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
