"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/logo/logo.webp";
import localFont from '@next/font/local';

const iconsfont = localFont({
  src: [
    {
      path: "../../public/fonts/icons/icons.woff",
      weight: "400",
    },
  ],

  variable: "--font-icons",
  display: "swap"
});

export default function Header() {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            // Clean up the event listener when the component is unmounted
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);
  return (
    <header className={`header header_black ${scrolled ? '_scroll' : ''}`}>
    <div className="header__container _container">
      <div className="header__body">
        <div className="header__logo">
          <Link href="/" as="/">
            <Image
              src={Logo}
              alt="offroadmotto logo"
              width={196}
              height={180}
              priority
            />
          </Link>
        </div>

        <div className="header__menu menu">
          <nav className="menu__body">
            <ul id="menu-header-menu" className="menu__list">
              <li
                id="menu-item-32"
                className="menu__link menu-item menu-item-type-custom menu-item-object-custom menu-item-32 menu__link"
              >
                <a target="_blank" rel="noopener" href="/about-us/">
                Search
                </a>
              </li>
              <li
                id="menu-item-33"
                className="menu__link menu-item menu-item-type-custom menu-item-object-custom menu-item-33 menu__link"
              >
                <a target="_blank" rel="noopener" href="/fleet/">
                  Book
                </a>
              </li>
              <li
                id="menu-item-994"
                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-994 menu__link"
              >
                <a href="/equipment-clothing/">View Classes</a>
              </li>
              <li
                id="menu-item-35"
                className="menu__link menu-item menu-item-type-custom menu-item-object-custom menu-item-35 menu__link"
              >
                <a target="_blank" rel="noopener" href="/faq/">
                  Add Classes
                </a>
              </li>
              <li
                id="menu-item-769"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-769 menu__link"
              >
                <a
                  target="_blank"
                  rel="noopener privacy-policy"
                  href="https://offroadadventure.co.ke/privacy-policy/"
                >
                  Add Student
                </a>
              </li>
             
            </ul>{" "}
          </nav>
        </div>
        <div className="header__actions actions-header">
          <a
            href="tel:+254 781 958 548"
            className={`actions-header__phone`}
          >
            <span className={`_icon-phone ${iconsfont.className}`}></span>
            {/* <FontAwesomeIcon icon={faMobileAndroidAlt as IconProp} /> */}

            <span>+254 781 958 548</span>
          </a>

          <div className="icon-menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}
