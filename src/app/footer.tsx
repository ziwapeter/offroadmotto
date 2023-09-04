import React from 'react'
import Image from "next/image";
import helmet from "../../public/footer/helmet.webp";
import getintouch from "../../public/icons/get_in_touch.webp";
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

export default function Footer() {
  return (
    <footer className="footer page__screen _scr-sector _scr-sector_active _scr-sector_current">
        <form action="" className="footer__form form">
          <div className="form__title title _prlx-item transform translate-y-[0.222222px]">
            Get in touch with us!
          </div>
          <div className="form__body">
            <div className="form__line">
              <div className="form__input">
                <input
                  type="text"
                  name="email"
                  required
                  placeholder="Your e-mail"
                  className="input _req _email"
                />
              </div>
            </div>
            <div className="form__line">
              <div className="form__input">
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone number"
                  className="input _req _digital"
                />
              </div>
            </div>
            <div className="form__line">
              <div className="form__input">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="input _req _name"
                />
              </div>
            </div>
            <div className="form__line">
              <div className="form__input">
                <input
                  type="text"
                  name="message"
                  required
                  placeholder="Message"
                  className="input"
                />
              </div>
            </div>
          </div>
          <div className="form__button">
            <button type="submit" className="form__btn btn btn_orange _fw">
              Submit
            </button>
          </div>
        </form>
        <div className="footer__body body-footer">
          <div className="body-footer__content">
            <div className="body-footer__section _prlx-item transform translate-y-[0.222222px]">
              <div className="body-footer__label">Find us</div>
              <div className="body-footer__address">
                Bogani East Rd., Karen, P.O BOX 2981–00502, Nairobi, Kenya
              </div>
            </div>
            <div
              data-prlx="5"
              className="body-footer__section _prlx-item"
              style={{ transform: "translateY(0.133333px)" }}
            >
              <div className="body-footer__label">Follow us</div>
              <div className="body-footer__social social">
                <a
                  href="https://www.instagram.com/offroadadventureea/?hl=en"
                  target="_blank"
                  className={`social__item _icon-insta ${iconsfont.className}`}
                ></a>
                <a
                  href="https://www.youtube.com/channel/UC3WvqUSr_ygHSvaOqQ8f0Xw"
                  target="_blank"
                  className={`social__item _icon-triangle ${iconsfont.className}`}
                ></a>
                <a
                  href="../login-1.php?src=sp&amp;u=http%3A%2F%2Frhinoridersmt.com%2F&amp;title=Offroad%20Adventure%20East%20Africa&amp;utm_source=share2"
                  target="_blank"
                  className={`social__item _icon-facebook ${iconsfont.className}`}
                ></a>
              </div>
            </div>
            <div
              data-prlx="7"
              className="body-footer__section _prlx-item"
              style={{ transform: "translateY(0.0952381px)" }}
            >
              <div className="body-footer__label">Call us</div>
              <a href="tel:+254 781 958 548" className="body-footer__phone">
                +254 781 958 548
              </a>
            </div>
          </div>
          <div className="body-footer__footer">
            <div className="body-footer__copy">
              <p>© All rights reserved. </p>
              <p>Rhino Motorcycles Riders Ltd 2018</p>
            </div>
            <div className="body-footer__dev">
              Website by{" "}
              <a href="https://insky.digital" target="_blank">
                Insky.digital
              </a>
            </div>
          </div>
          <div className="body-footer__helmet">
            <Image
              src={helmet}
              alt="helmet"
              width={367}
              height={358}
              priority
            />
          </div>
          <div
            className={`footer__circle circle _icon-arrow ${iconsfont.className}`}
          >
            <div className="circle__image">
              <Image
                src={getintouch}
                alt="get in touch"
                width={114}
                height={114}
                priority
              />
            </div>
          </div>
        </div>
      </footer>
  )
}
