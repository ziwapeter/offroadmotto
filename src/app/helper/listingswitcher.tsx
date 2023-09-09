"use client"
import React, { useEffect, useRef, useState } from 'react'
import { addCommas, useMyListingsData } from "@/app/helper/listingcontext";

export default function Listingswitcher() {

    const {
        newMinOrder,
        setNewMinOrder,
        cachedTable,
        setCachedTable,
        search_item,
        setSearch_item,
        itemto_order,
        setItemto_order,
        desorasc,
        setDesorasc,
        start_limit,
        setstart_limit,
        paginationsize,
        setPaginationsize,
        currentPage,
        setCurrentPage,
      } = useMyListingsData();

    const elSwitchRef = useRef<HTMLSpanElement>(null);
    const switcherRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [positionIndex, setPositionIndex] = useState<number>(0);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [switcherWidth, setSwitcherWidth] = useState<number | null>(null);
    const optionTexts = ['ALL', 'KIDS', 'ADULTS'];
    const [dropdownLeftOffset, setDropdownLeftOffset] = useState<number | null>(null);

    const toggleSwitch = (buttonIndex: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setPositionIndex(buttonIndex);
        setShowDropdown(buttonIndex !== 0);
        if(buttonIndex === 0){
            setShowDropdown(false)
            setSearch_item(`%`)
            setCurrentPage(0)
        }
       
        if(buttonIndex === 1 || buttonIndex === 2){
         
            renderDropdown()
        }
        
        const buttonElement = event.currentTarget;
        const rect = buttonElement.getBoundingClientRect();
        
     
        setDropdownLeftOffset(rect.left);
      };
  

      useEffect(() => {
        if (switcherRef.current) {
          setSwitcherWidth(switcherRef.current.getBoundingClientRect().width);
        }
      }, []);
      
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleOptionClick = (option: string) => {
        
        setSearch_item(`%${option}%`)
        setCurrentPage(0)
        
      };

    
    const renderDropdown = () => {
        let options: string[] = [];
        if (positionIndex === 1) {
          options = ['KID INTERMEDIATE', 'KID BEGINNER', 'KID ADVANCED'];
        } else if (positionIndex === 2) {
          options = ['ADULT INTERMEDIATE', 'ADULT ADVANCED', 'ADULT BEGINNER'];
        }
      
        return (
           
          <ul ref={dropdownRef} 
          className="left-0 text-[#000] bg-white border border-gray-300 rounded shadow-lg w-full list-none z-10">
            {options.map((option, index) => (
              <li key={index} className="cursor-pointer hover:bg-[#ff6600] p-4 hover:text-[#FFF]"
              onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
         
        );
      };
      
      const handletopButton = (option: number) => {
        if (option === 0) {
          setShowDropdown(false);
          setSearch_item(`%`);
          setCurrentPage(0)
        } else {
          setShowDropdown(!showDropdown);
         
        }
      
        if (option === 1 || option === 2) {
          renderDropdown();
        }
      };
      
  
    const positions = ['16.67%', '50%', '83.33%'];
    const leftPosition = positions[positionIndex];
  return (
    <div className="flex flex-row justify-center switcher_font">
          <div className="flex relative items-center w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-0 md:mx-2 lg:mx-4 xl:mx-8 border border-solid border-[#ff6600] h-14 mb-[2.5em]" ref={switcherRef} >

            <div className="flex flex-row w-full m-4">

            <div className="w-1/3">
          <button onClick={(e) => toggleSwitch(0, e)} className="switcher_font_inside text-[#ff6600] w-full h-full flex items-center justify-center">
            ALL
          </button>
        </div>
        <div className="w-1/3">
          <button onClick={(e) => toggleSwitch(1, e)} className="switcher_font_inside text-[#ff6600] w-full h-full flex items-center justify-center">
            KIDS
          </button>
        </div>
        <div className="w-1/3">
          <button onClick={(e) => toggleSwitch(2, e)} className="switcher_font_inside text-[#ff6600] w-full h-full flex items-center justify-center">
            ADULTS
          </button>
        </div>
            </div>
            <span
              ref={elSwitchRef}
              style={{
                left: `${leftPosition}`,
                transform: "translateX(-50%)",
                width: `calc(33.33% - 0.5rem)` 
              }}
              className="elSwitch cursor-pointer bg-[#ff6600] shadow-sm text-[#ffffff] flex items-center justify-center w-1/4  h-12 transition-all absolute"
              onClick={() => handletopButton(positionIndex)}
            >
              {optionTexts[positionIndex]}
            </span>

            {showDropdown && (
          <div className="mt-2 rounded shadow-lg border-[1px] border-solid border-gray-200 z-20"
          style={{
            
            width: `${switcherWidth}px`,
            left: '0', 
            top: '100%',
            position: 'absolute'
          }}
           >
            {renderDropdown()}
          </div>
        )}
          </div>
          
        </div>
  )
}
