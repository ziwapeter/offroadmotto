"use client";
import Image from "next/image";

import { useRef, useState } from "react";
import Footer from "./footer";
import Alllistings from "./lib/alllistings";




export default function Home() {
  const elSwitchRef = useRef<HTMLSpanElement>(null);
  const [positionIndex, setPositionIndex] = useState<any>(0);
  const optionTexts = ["ALL", "KIDS", "ADULTS"];
  const toggleSwitch = (buttonIndex: number) => {
    setPositionIndex(buttonIndex);
  };

  const positions = ["16.67%", "50%", "83.33%"];

  const leftPosition = positions[positionIndex];
  return (
    <main className={`page`}>
      <div className="page__screen school _container _scr-sector _black">
        <div
          data-prlx="8"
          className="school__breadcrumbs breadcrumbs _prlx-item"
        >
          <a href="/home/" className="breadcrumbs__link">
            Main
          </a>
          <span className="breadcrumbs__separator"></span>
          <span className="breadcrumbs__item">Home</span>
        </div>

        {/* <h1 className="article__title title _prlx-item">All Offroad Classes</h1> */}

        <div className="flex flex-row justify-center switcher_font">
          <div className="flex relative items-center w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-0 md:mx-2 lg:mx-4 xl:mx-8 border border-solid border-[#ff6600] h-14 mb-[2.5em]">

            <div className="flex flex-row w-full m-4">

              <div className="w-1/3 flex justify-center">
                <button
                  onClick={() => toggleSwitch(0)}
                  className="switcher_font_inside text-[#ff6600]"
                >
                  ALL
                </button>
              </div>
              <div className="w-1/3 flex justify-center">
                <button
                  onClick={() => toggleSwitch(1)}
                  className="switcher_font_inside text-[#ff6600]"
                >
                  KIDS
                </button>
              </div>
              <div className="w-1/3 flex justify-center">
                <button
                  onClick={() => toggleSwitch(2)}
                  className="switcher_font_inside text-[#ff6600]"
                >
                  ADULTS
                </button>
              </div>
            </div>
            <span
              ref={elSwitchRef}
              style={{
                left: `${leftPosition}`,
                transform: "translateX(-50%)",
                width: `calc(33.33% - 0.5rem)`  // 1/3 width minus 0.5rem
              }}
              className="elSwitch bg-[#ff6600] shadow-sm text-[#ffffff] flex items-center justify-center w-1/4  h-12 transition-all  absolute"
            >
              {optionTexts[positionIndex]}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          

         
          <Alllistings />
         
   

        </div>
      </div>

      <Footer />
    </main>
  );
}
