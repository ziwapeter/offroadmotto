"use client";
import { addCommas, useMyListingsData } from "@/app/helper/listingcontext";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  QueryClient, useQuery,
} from "react-query";
import axios, { AxiosResponse } from "axios";
import ReactPaginate from "react-paginate";
import qs from "qs";
import React from "react";
import styles from "../listings.module.css";
import Image from "next/image";
import Link from "next/link";
import motorcross from "../../../public/classes/Motocross-Kids-scaled-1.jpg"
const slugify = require('slugify')
const truncate = require("truncate");
export interface QueryParams {
  start_limit: number;
  paginationsize: number;
  itemto_order: string;
  desorasc: string;
  search_item: string;

}
type CategoryType = {
  category: string;
  title: string;
  category2: string;
}
export interface Listings {
  listing_id: number,
  title: string,
  description: string,
  price: number,
  available_from: string,
  available_to: string,
  images: string,
  maximum_riders: number,
  location: string,
  min_riders: number,
  category_id_listed: number,
  status: string,
  owner_id: number,
  listing_created_at: string,
  listing_updated_at: string,
  map_link: string,
  category_name: string
}

interface ListingResponse {
  alllistings: Listings[];
  alllistingslength: number;
}

interface AllproductsProps {
  dehydratedState?: unknown;
}

export const queryClientlistings = new QueryClient();
export default function Alllistings() {
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

  //hydrate(queryClientlistings, dehydratedState);

  return (
    <ListingsList
      searchParams={{
        start_limit,
        paginationsize,
        itemto_order,
        desorasc,
        search_item
      }}
    />
  );
}

function ListingsList({ searchParams }: { searchParams: QueryParams }) {
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
    datatrue,
    setDatatrue,
  } = useMyListingsData();
  const storageData: any =
    typeof window !== "undefined"
      ? sessionStorage.getItem("newTabledata")
      : null;
  const storagefavourite: any =
    typeof window !== "undefined"
      ? sessionStorage.getItem("favouriteSelections")
      : null;
  const parsedStorageData: any = storageData ? JSON.parse(storageData) : null;
  const parsedFavouriteData: any = storagefavourite
    ? JSON.parse(storagefavourite)
    : null;

  const previousDataKey = useMemo(
    () => [
      "products",
      currentPage * paginationsize,
      paginationsize,
      search_item,
      itemto_order,
      desorasc
    ],
    [
      currentPage,
      paginationsize,
      search_item,
      itemto_order,
      desorasc
    ]
  );
  const nextDataKey = useMemo(
    () => [
      "products",
      (currentPage + 1) * paginationsize,
      paginationsize,
      search_item,
      itemto_order,
      desorasc
    ],
    [
      currentPage,
      paginationsize,
      search_item,
      itemto_order,
      desorasc
    ]
  );
  const [changingpopularitems, setChangingpopularitem] = useState<any>([]);
  const storageDataReturned: any = useMemo(
    () => parsedStorageData ?? [],
    [parsedStorageData]
  );
  const favouriteDataReturned: any = useMemo(
    () => parsedFavouriteData ?? [],
    [parsedFavouriteData]
  );
  const { data, error, isRefetching, isSuccess } = useQuery<
    ListingResponse,
    Error
  >(previousDataKey, () => fetchProducts(searchParams), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const [pageCount, setPageCount] = useState<number>(0);

  const tablelength = useMemo(() => {
    if (data) {
      return data.alllistingslength;
    }
    return 0;
  }, [data]);

  const tabledata = useMemo(() => {
    if (data) {
      return data.alllistings;
    }

    return [];
  }, [data]);

  useEffect(() => {
    if (data && tablelength > 0) {
      setPageCount(Math.ceil(tablelength / paginationsize));
    } else {
      setPageCount(0);
    }
    setDatatrue(true);
  }, [tablelength, data, paginationsize, setDatatrue]);

  // State for the current page

  useEffect(() => {
    if (datatrue && tabledata) {

      setCachedTable(tabledata)
      setChangingpopularitem(favouriteDataReturned);
      setDatatrue(false);
    }
  }, [
    tabledata,
    setCachedTable,
    setDatatrue,
    setNewMinOrder,
    datatrue,
    storageDataReturned,
    favouriteDataReturned,
  ]);

  useEffect(() => {
    if (data) {
      if ((currentPage + 1) * paginationsize < tablelength) {
        if (
          queryClientlistings.getQueryData(previousDataKey) &&
          !queryClientlistings.getQueryData(nextDataKey)
        ) {
          queryClientlistings.prefetchQuery(
            nextDataKey,
            () =>
              fetchProducts({
                ...searchParams,
                start_limit: (currentPage + 1) * paginationsize,
              }),
            {
              staleTime: Infinity,
              cacheTime: Infinity,
            }
          );
        }
      }
    }
  }, [
    data,
    currentPage,
    nextDataKey,
    paginationsize,
    previousDataKey,
    searchParams,
    tablelength,
  ]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * paginationsize) % tablelength;

    setCurrentPage(event.selected);
    setstart_limit(newOffset);
  };





  const ref = useRef<HTMLDivElement>(null);

  const Productswithimage: React.FC<Listings> = ({
    listing_id,
    title,
    description,
    price,
    available_from,
    available_to,
    images,
    maximum_riders,
    location,
    min_riders,
    category_id_listed,
    status,
    owner_id,
    listing_created_at,
    listing_updated_at,
    map_link
  }) => (
    <>

      <div className=" relative rounded overflow-hidden shadow-sm m-auto border border-1 border-grey-100">


      </div>

    </>
  );

  return (
    <>

      <>
        {error && (
          <div className={`${styles.textcrimson} font-medium m-20`}>
            An error has occurred: {error.message}
          </div>
        )}


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {cachedTable.map((tabledatanow: any, i: any) => (
            <div key={i} className="rounded-[20px] overflow-hidden shadow-sm">
              <Link href={`/listings/${slugify(tabledatanow.category_name, { lower: true, remove: /[*+~.()'"!:@]/g })}/${slugify(tabledatanow.title, { lower: true, remove: /[*+~.()'"!:@]/g })}/${tabledatanow.listing_id}`}
                   className="more-photos__title">
              <Image
                src={`/classes/${tabledatanow.images}`}
                alt="motorcross"
                width={1200}
                height={630}
                priority
              />
              </Link>
              <div className="more-photos__body more-photos__body_c">
               
                  <Link href={`/listings/${slugify(tabledatanow.category_name, { lower: true, remove: /[*+~.()'"!:@]/g })}/${slugify(tabledatanow.title, { lower: true, remove: /[*+~.()'"!:@]/g })}/${tabledatanow.listing_id}`}
                   className="more-photos__title">
                  <span className="line-clamp-1">
                 {tabledatanow.title}
                 </span>
                 </Link>
              
                <div className="more-photos__text">
                  <span className="line-clamp-4">
                {tabledatanow.description}
                </span>
                </div>
              </div>
            </div>

          ))}
        </div>
      </>

      {data ? (
        <>
          <div className="pagination-container flex justify-center mt-10">
            <div className="sm:hidden md:hidden lg:hidden">
              <ReactPaginate
                previousLabel={<span>&lt;</span>}
                nextLabel={<span>&gt;</span>}
                breakLabel="..."
                breakClassName="flex items-center justify-center px-4 py-2 mx-1 text-lg font-medium text-gray-500 bg-white border border-gray-200 shadow-sm rounded-md hover:bg-gray-200"
                pageCount={pageCount}
                marginPagesDisplayed={0}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                forcePage={pageCount > 0 ? currentPage : -1} // Prop to control the current page
                containerClassName="flex items-center"
                activeClassName={`${styles.backgroundorange} hover:${styles.backgroundorange} px-4 py-2 mx-1`}
                pageClassName="flex items-center justify-center px-4 py-2 mx-1 text-lg font-medium text-gray-500 bg-white border border-gray-200 shadow-sm rounded-md hover:bg-gray-200"
                pageLinkClassName="text-gray-500"
                previousClassName="flex items-center justify-center px-4 py-2 mx-1 text-lg font-medium text-gray-500 bg-white border border-gray-200 shadow-sm rounded-md"
                nextClassName="flex items-center justify-center px-4 py-2 mx-1 text-lg font-medium text-gray-500 bg-white border border-gray-200 shadow-sm rounded-md"
                previousLinkClassName="text-gray-500"
                nextLinkClassName="text-gray-500"
                activeLinkClassName={`${styles.textwhitenow}`} // Apply the white text color to the active page link
                disabledLinkClassName={`${styles.textcolornow} pointer-events-none`}
              />
            </div>
            <div className="hidden sm:block md:block lg:block">
              <ReactPaginate
                previousLabel={<span>&lt;</span>}
                nextLabel={<span>&gt;</span>}
                breakLabel="..."
                breakClassName="flex items-center justify-center px-4 py-2 mx-1 text-lg font-medium text-gray-500 bg-white border border-gray-200 shadow-sm rounded-md hover:bg-gray-200"
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                forcePage={pageCount > 0 ? currentPage : -1} // Prop to control the current page
                containerClassName="flex items-center"
                activeClassName={`${styles.backgroundorange} hover:${styles.backgroundorange} px-4 py-2 mx-1`}
                pageClassName="flex items-center justify-center px-4 py-2 mx-1 text-lg font-medium text-gray-500 bg-white border border-gray-200 shadow-sm rounded-md hover:bg-gray-200"
                pageLinkClassName="text-gray-500"
                previousClassName="flex items-center justify-center px-4 py-2 mx-1 text-lg font-medium text-gray-500 bg-white border border-gray-200 shadow-sm rounded-md"
                nextClassName="flex items-center justify-center px-4 py-2 mx-1 text-lg font-medium text-gray-500 bg-white border border-gray-200 shadow-sm rounded-md"
                previousLinkClassName="text-gray-500"
                nextLinkClassName="text-gray-500"
                activeLinkClassName={`${styles.textwhitenow}`} // Apply the white text color to the active page link
                disabledLinkClassName={`${styles.textcolornow} pointer-events-none`}
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

export const fetchProducts = async (
  queryParams: QueryParams
): Promise<ListingResponse> => {
  try {
    const { ...otherParams } = queryParams;
    const serializedParams = {
      ...otherParams
    };

    const res: AxiosResponse<ListingResponse> = await axios.get(
      `${process.env.baseurl}/listings`,
      {
        params: serializedParams,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "brackets" });
        },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error("Fetching listings failed");
  }
};
