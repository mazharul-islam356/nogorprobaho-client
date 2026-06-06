"use client";

import { useLanguage } from "@/context/lagnguageContext";
import { Linkedin } from "lucide-react";
import {
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const { lang } = useLanguage();

  const t = {
    brandDesc: {
      en: "Latest news, analysis, politics, entertainment and international updates in one place.",
      bn: "বাংলাদেশের সর্বশেষ খবর, বিশ্লেষণ, রাজনীতি, বিনোদন ও আন্তর্জাতিক সংবাদ এক জায়গায়।",
    },
    categories: {
      en: "Categories",
      bn: "বিভাগসমূহ",
    },
    links: {
      en: "Important Links",
      bn: "গুরুত্বপূর্ণ লিংক",
    },
    contact: {
      en: "Contact",
      bn: "যোগাযোগ",
    },
    newsletter: {
      en: "Subscribe to newsletter",
      bn: "নিউজলেটার সাবস্ক্রাইব করুন",
    },
    emailPlaceholder: {
      en: "Your email",
      bn: "আপনার ইমেইল",
    },
    subscribe: {
      en: "Subscribe",
      bn: "সাবস্ক্রাইব",
    },
    location: {
      en: "Dhaka, Bangladesh",
      bn: "ঢাকা, বাংলাদেশ",
    },
    rights: {
      en: "All rights reserved.",
      bn: "সর্বস্বত্ব সংরক্ষিত।",
    },
    developedBy: {
      en: "Developed by",
      bn: "ডেভেলপ করেছে",
    },
  };

  const categories = {
    en: ["Politics", "Economy", "International", "Sports", "Entertainment"],
    bn: ["রাজনীতি", "অর্থনীতি", "আন্তর্জাতিক", "খেলা", "বিনোদন"],
  };

  const links = {
    en: ["About Us", "Contact", "Privacy Policy", "Terms"],
    bn: ["আমাদের সম্পর্কে", "যোগাযোগ", "গোপনীয়তা নীতি", "শর্তাবলী"],
  };

  return (
    <footer className="bg-[#e1ded8] border-t md:pt-2">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* BRAND */}
          <div>
            <Image
              src="/the_sylheti_black.png"
              width={400}
              height={400}
              alt="logo"
              className="object-cover w-40"
            />

            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {t.brandDesc[lang]}
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3 mt-4">
              <Social icon={<Facebook size={18} />} />
              <Social icon={<Twitter size={18} />} />
              <Social icon={<Linkedin size={18} />} />
              <Social icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t.categories[lang]}
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">
              {categories[lang].map((item, i) => (
                <li key={i} className="hover:text-[#BC8734] cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* LINKS */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t.links[lang]}
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">
              {links[lang].map((item, i) => (
                <li key={i} className="hover:text-[#BC8734] cursor-pointer">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {t.contact[lang]}
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {t.location[lang]}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> +880 1865478952
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} /> info@jonosrot.com
              </p>
            </div>

            {/* Newsletter */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">{t.newsletter[lang]}</p>

              <div className="flex">
                <input
                  type="email"
                  placeholder={t.emailPlaceholder[lang]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-l-sm focus:outline-none focus:border-[#BC8734] text-sm"
                />
                <button className="bg-[#BC8734] text-white px-4 rounded-r-xs hover:bg-[#a87728] transition">
                  {t.subscribe[lang]}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
          <p>
            © {new Date().getFullYear()} Nirvoybarta. {t.rights[lang]}
          </p>

          <p>
            {t.developedBy[lang]}{" "}
            <span className="text-teal-800 font-medium">Mazharul Islam</span>
          </p>
        </div> */}
      </div>
    </footer>
  );
}

/* SOCIAL ICON */
function Social({ icon }) {
  return (
    <div className="w-9 h-9 flex items-center justify-center border border-gray-300 rounded-full text-gray-600 hover:bg-teal-800 hover:text-white hover:border-teal-800 transition cursor-pointer">
      {icon}
    </div>
  );
}
