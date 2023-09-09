import React, { ReactNode, createContext, useContext, useState } from "react";
export const addCommas = (num: any) =>
  num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
type MyListingsData = {
  start_limit: number;
  setstart_limit: React.Dispatch<React.SetStateAction<number>>;
  paginationsize: number;
  setPaginationsize: React.Dispatch<React.SetStateAction<number>>;
  newMinOrder: any[];
  setNewMinOrder: React.Dispatch<React.SetStateAction<any[]>>;
  cachedTable: any[];
  setCachedTable: React.Dispatch<React.SetStateAction<any[]>>;
  search_item: string;
  setSearch_item: React.Dispatch<React.SetStateAction<string>>;
  itemto_order: string;
  setItemto_order: React.Dispatch<React.SetStateAction<string>>;
  desorasc: string;
  setDesorasc: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  isScrolled: boolean;
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
  datatrue: boolean;
  setDatatrue: React.Dispatch<React.SetStateAction<boolean>>;
  selectedOption: string;
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
};

type MyListingsProviderProps = {
  children: ReactNode;
};

const MyListingContext = createContext<MyListingsData | undefined>(undefined);

export const useMyListingsData = (): MyListingsData => {
  const context = useContext(MyListingContext);

  if (!context) {
    throw new Error(
      "MyListingsData must be used within a MyListingsProvider"
    );
  }

  return context;
};

export const MyListingsProvider: React.FC<MyListingsProviderProps> = ({
  children,
}) => {
  const [newMinOrder, setNewMinOrder] = useState<any[]>([]);
  const [cachedTable, setCachedTable] = useState<any[]>([]);
  const [search_item, setSearch_item] = useState<string>("%");
  const [itemto_order, setItemto_order] = useState<string>("listing_id");
  const [desorasc, setDesorasc] = useState<string>("ASC");
  const [ids_toupdate, setIds_toupdate] = useState<number[]>([]);
  const [start_limit, setstart_limit] = useState<number>(0);
  const [paginationsize, setPaginationsize] = useState<number>(12);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [datatrue, setDatatrue ] = useState<boolean>(true)
  const [selectedOption, setSelectedOption] = useState<string>("All");

  const contextValue: MyListingsData = {
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
    isScrolled,
    setIsScrolled,
    datatrue,
    setDatatrue,
    selectedOption, 
    setSelectedOption
  };

  return (
    <MyListingContext.Provider value={contextValue}>
      {children}
    </MyListingContext.Provider>
  );
};
