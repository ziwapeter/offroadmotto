"use client";
import { QueryClientProvider } from "react-query";
import { MyListingsProvider } from "./helper/listingcontext";
import { queryClientlistings } from "./lib/alllistings";
import { FC, ReactNode } from "react";


interface Props {
    children: ReactNode;
    dehydratedState?: unknown;
  }
export const MainContent: FC<Props> = ({ children, dehydratedState}) => {


    return (
        <>
          <MyListingsProvider>
          <QueryClientProvider client={queryClientlistings} contextSharing={true}>
              {children}
        </QueryClientProvider>
          </MyListingsProvider>
        </>
      );
    };
    