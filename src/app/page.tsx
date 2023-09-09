
import Footer from "./footer";
import Listingswitcher from "./helper/listingswitcher";
import Alllistings from "./lib/alllistings";

export default function Home() {
  
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

         <Listingswitcher />
        <Alllistings />
      </div>
      <Footer />
    </main>
  );
}
