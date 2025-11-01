import React from "react";

const page = () => {

  const fileType=""; //will be vieo or audio

  return (

    //for mobile screens all the divs should be in a column layout with proper spacing and allignment
    // this div should be a grid layout with proper spacing and allignment where the larger screen banner  and smaller should be like a 80-20 ratio and the three banners should be in a row below it with proper spacing
    <div className="flex-1 flex flex-col min-h-[100vh] border-[1px] border-color-white p-1">
      <div className="w-full flex flex-col md:flex-row gap-1 min-h-[70vh]">
        {/* this div will be for displaying the current Hero Video or gif or image for large screen where we will have a kind od lowOpacity icon in the middle of the image /video onCLicking that we can change the banner to a newly selected */}
        <div className="flex-[0.75] border-[1px] border-color-white rounded-md">
          heroLarge
        </div>

        {/* this div will be for displaying the current Hero Video or gif or image for small screen where we will have a kind od lowOpacity icon in the middle of the image /video  onCLicking  that we can change the banner to a newly selected */}
        <div className="flex-[0.25] border-[1px] border-color-white rounded-md">
          heroSmall
        </div>
      </div>

      {/* here we will have three divs for displaying the current banners 1,2,3 with a low opacity icon in the middle on clicking which we can change the banner to a new one */}
      <div className="w-full flex flex-col md:flex-row gap-1 mt-1 min-h-full md:min-h-[28vh]">
        <div className="flex-1 border-[1px] border-color-white rounded-md">
          mini-banner1
        </div>
        <div className="flex-1 border-[1px] border-color-white rounded-md">
          mini-baner2
        </div>
        <div className="flex-1 border-[1px] border-color-white rounded-md">
          mini-banner3
        </div>
      </div>
      {/* here we need a button to chnage the whole appearence at once */}
      <div>
        {/* on click of this a modal will open where we can change all the banners and heros at once should be able to upload new ones and preview them before saving */}
        {/* <button>change all banners/heros</button> */}
      </div>
    </div>
  );
};

export default page;
