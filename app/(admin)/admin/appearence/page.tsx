import React from "react";

const page = () => {

  const fileType=""; //will be vieo or audio

  return (

    //for mobile screens all the divs should be in a column layout with proper spacing and allignment
    // this div should be a grid layout with proper spacing and allignment where the larger screen banner  and smaller should be like a 80-20 ratio and the three banners should be in a row below it with proper spacing
    <div>
      <div>
        {/* this div will be for displaying the current Hero Video or gif or image for large screen where we will have a kind od lowOpacity icon in the middle of the image /video onCLicking that we can change the banner to a newly selected */}
        <div></div>

        {/* this div will be for displaying the current Hero Video or gif or image for small screen where we will have a kind od lowOpacity icon in the middle of the image /video  onCLicking  that we can change the banner to a newly selected */}
        <div></div>
      </div>

      {/* here we will have three divs for displaying the current banners 1,2,3 with a low opacity icon in the middle on clicking which we can change the banner to a new one */}
      <div></div>
      {/* here we need a button to chnage the whole appearence at once */}
      <div>
        {/* on click of this a modal will open where we can change all the banners and heros at once should be able to upload new ones and preview them before saving */}
        <button>change all banners/heros</button>
      </div>

      {/* finally here we will have a apply changes button which will only appear when we have made some changes to any of the banners or heros individually or all at once */}
      <div>
        <button>apply changes</button>
      </div>
    </div>
  );
};

export default page;
