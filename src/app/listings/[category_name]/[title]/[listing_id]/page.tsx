import React, { useState } from 'react'
import { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import Footer from '@/app/footer';
import ListingReservation from '@/app/helper/listingreservation';
const initialDateRange : any = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};
async function getAlllistings(listing_id: number) {
  const response = await fetch(
    `${process.env.baseurl}/alllistings?listing_id=${listing_id}`,
    { cache: "no-cache" }
  );
  const data = await response.json();

  return data[0];
}





export default async function Listings({
params
}: {
  params: { listing_id: number, category_name: string, title: string };
}) 

{
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const product = await getAlllistings(Number(params.listing_id));
  const [isLoading, setIsLoading] = useState(false);


const headersList = headers();
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
        <a href="/home/" className="breadcrumbs__link">
        {product.category_name}
        </a>
        <span className="breadcrumbs__separator"></span>
        <span className="breadcrumbs__item">{product.title}</span>
      </div>

      {/* <h1 className="article__title title _prlx-item">{params.title}</h1> */}

      <article className="article__area">
   <h1
    className="article__title title _prlx-item"
    style={{ transform: "translateY(0px)" }}
  >
{product.title}
  </h1> 
  <div
    data-prlx={5}
    className="article__info _prlx-item"
    style={{ transform: "translateY(0px)" }}
  >
    <div className="article__tags tags">
      <div className="tags__label">Tags</div>
      <div className="tags__items">
        <a className="tags__item">{product.category_name}</a>
      
      
      </div>
    </div>
    <div className="article__date _icon-date" />
  </div>
  <div className="article__image">
 



 
  </div>
  <div className="article__body">
   
    <div className="article__content">
     {product.description}

     <ListingReservation
                price={12}
                totalPrice={33}
                onChangeDate={(value: any) => setDateRange(value)}
                dateRange={initialDateRange}
                onSubmit={()=>{}}
                disabled={isLoading}
                // disabledDates={disabledDates}
              />
    </div>
  </div>
  
</article>

    </div>
    <Footer />
  </main>
    
  )
}
