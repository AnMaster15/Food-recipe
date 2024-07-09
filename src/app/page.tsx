// app/page.tsx

import AppNavbar from '../components/navbar';
import FoodRecipes from '../components/foodrecepies';
import { ImagesSliderDemo } from "../components/imagestart";
import Footer from '../components/footer';
import {VortexDemo} from '../components/infobox'
import BentoGridDemo from '../components/types'
// import Nutrients from '../components/Nutrients';

export default function Home() {
  return (
    <div>
       <AppNavbar />
      <div className="max-w-7xl mx-auto p-4">
       
        <ImagesSliderDemo />
        <div >
          <FoodRecipes />
         
          <BentoGridDemo />
          <VortexDemo />

        </div>
        {/* <div>
          <Nutrients />
        </div> */}
      </div>
      <Footer />
    </div>
  );
}
