import React from "react";

import {
  footerStyles,
  footerBackgroundStyles,
  footerCustomStyles,
  iconColors,
  contactIconGradients,
} from "../assets/dummyStyles";

import {
  socialIcons,
  quickLinks,
  supportLinks,
  contactInfo,
} from "../assets/dummyFooter";

import logo from "../assets/logo.png";

import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Shield,
  HandHelping,
} from "lucide-react";


// ✅ SOCIAL ICONS (UNCHANGED)
const Twitter = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2H21l-6.563 7.5L22 22h-6.828l-5.35-6.874L3.9 22H1.14l7.02-8.018L2 2h6.828l4.84 6.23L18.244 2z"/>
  </svg>
);

const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm5.25-.88a1.12 1.12 0 110 2.24 1.12 1.12 0 010-2.24z"/>
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.94 6.5A2.44 2.44 0 114.5 4.06 2.44 2.44 0 016.94 6.5zM4.75 8.75h4.38V20H4.75zm7.13 0h4.2v1.54h.06a4.6 4.6 0 014.14-2.28c4.43 0 5.24 2.91 5.24 6.7V20h-4.38v-5.44c0-1.3 0-2.98-1.82-2.98s-2.1 1.42-2.1 2.88V20h-4.38z"/>
  </svg>
);


// ✅ ICON MAP
const iconMap = {
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Shield,
  HandHelping,
};

const Footer = () => {
  return (
    <footer className={`${footerStyles.footer} relative overflow-hidden`}>

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={footerBackgroundStyles.floatingOrb1}></div>
        <div className={footerBackgroundStyles.floatingOrb2}></div>
        <div className={footerBackgroundStyles.floatingOrb3}></div>
        <div className={footerBackgroundStyles.floatingOrb4}></div>

        <div className={footerBackgroundStyles.gridOverlay}>
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* MAIN */}
      <div className={`${footerStyles.container} relative z-10`}>
        <div className={footerStyles.grid}>

          {/* BRAND */}
          <div className={footerStyles.brandSection}>
            <div className={footerStyles.brandTransform}>
              <div className={footerStyles.brandContainer}>
                <div className={footerStyles.brandGradient}></div>

                <div className="relative z-20 font-serif flex items-center gap-3">
                  <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    SkillForge
                  </h3>
                </div>
              </div>

              <p className={footerStyles.brandDescription}>
                Transform your learning journey with interactive courses.
              </p>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className={`${footerStyles.sectionHeader} ${iconColors.cyan}`}>
              <ArrowRight className={footerStyles.sectionIcon} />
              Quick Links
            </h4>

            <ul className={footerStyles.linksList}>
              {quickLinks.map((link, index) => {
                const Icon = iconMap[link.iconKey] || ArrowRight;

                return (
                  <li key={link.name}>
                    <a href={link.href} className={`${footerStyles.linkItem} ${iconColors.cyan}`}>
                      <Icon className={`${footerStyles.linkIcon} ${iconColors.cyan}`} />
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className={`${footerStyles.sectionHeader} ${iconColors.purple}`}>
              <HandHelping className={footerStyles.sectionIcon} />
              Support
            </h4>

            <ul className={footerStyles.linksList}>
              {supportLinks.map((link) => {
                const Icon = iconMap[link.iconKey] || HelpCircle;

                return (
                  <li key={link.name}>
                    <a href={link.href} className={`${footerStyles.linkItem} ${iconColors.purple}`}>
                      <Icon className={`${footerStyles.linkIcon} ${iconColors.purple}`} />
                      {link.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className={`${footerStyles.sectionHeader} ${iconColors.emerald}`}>
              <Phone className={footerStyles.sectionIcon}/>
              Contact Us
            </h4>

            <p>{contactInfo.email}</p>
          </div>

        </div>

        {/* SOCIAL + DESIGN CREDIT */}
        <div className={footerStyles.socialSection}>
          <div className={footerStyles.socialContainer}>

            {/* SOCIAL ICONS */}
            <div className={footerStyles.socialIconsContainer}>
              {socialIcons.map((social) => {
                const IconComponent = iconMap[social.iconKey] || Twitter;

                return (
                  <a key={social.name} href={social.url}>
                    <IconComponent className={footerStyles.socialIcon} />
                  </a>
                );
              })}
            </div>

            {/* ✅ FIXED DESIGN CREDIT */}
            <div className={`${footerStyles.designCredit} relative z-20`}>
              <div className={`${footerStyles.designCreditContainer} bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl`}>
                <p className={`${footerStyles.designCreditText} text-slate-700 font-medium`}>
                  Designed by{" "}
                  <a
                    href={contactInfo.website}
                    target="_blank"
                    className="text-indigo-600 font-semibold hover:underline"
                  >
                    {contactInfo.designBy}
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{footerCustomStyles}</style>
    </footer>
  );
};

export default Footer;