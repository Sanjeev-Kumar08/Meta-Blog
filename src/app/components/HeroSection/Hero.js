import Image from "next/image";
import React from "react";

function Hero() {

  return (
    <div className="flex justify-center items-center p-2 font-worksans">
      <div className="w-[1216px] relative
        lg:h-[664px] 
        md:h-[500px] 
        sm:h-[450px]
        sm500:h-[350px]
        sm375:h-[300px]
        h-[240px]
      ">
        <div className="sm426:h-[600px] rounded-xl max-h-fit">
          <Image src="/Image.svg" alt="title card" height={600} width={1216}/>
          {/* <img src="/Image.svg" alt="title card" /> */}
        </div>

        <div className="
          gap-[24px] bg-white absolute shadow-md rounded-xl 
          lg:h-[304px] lg:w-[598px] 
          md:h-fit md:w-[500px] 
          sm:h-fit sm:w-[400px] 
          sm500:h-fit sm500:w-[400px] 
          sm375:h-fit sm375:w-[250px]
          h-fit w-[200px]

          xl:top-[360px] xl:left-[64px] 
          lg:top-[300px] lg:left-[34px] 
          md:top-[260px] md:left-[25px] 
          sm:top-[240px] sm:left-[18px] 
          sm500:top-[150px] sm500:left-[18px] 
          sm375:top-[70px] sm375:left-[18px] 
          top-[50px] left-[18px] 

          xl:p-[40px] 
          md:p-[30px] 
          sm:p-[22px] 
          p-[15px] 
        ">
          <div className="flex flex-col justify-center gap-[16px]">
          <div className="border-boldTextcolor flex flex-col gap-3 sm:w-full justify-center">
            <p className="bg-blue text-white rounded-md w-[fit-content] px-[10px] py-1 sm:text-[14px] text-[10px] font-medium">
              Technology
            </p>
            <p className="text-boldTextcolor dark:text-boldTextcolor font-semibold lg:text-[36px] md:text-[22px] sm375:text-[15px] leading-tight text-left text-[9px]">
              The Impact of Technology on the Workplace: How Technology is
              Changing
            </p>
          </div>
          <div className="text-grey dark:text-grey sm:text-[16px] text-[11px] flex justify-center items-center w-fit gap-[20px]">
            <div className="flex justify-center items-center gap-[12px]">
              <img alt="user image" src="/userIcon.svg" className="h-[36px] w-[36px]" />
              <p className="font-medium">Tracey Wilson</p>
            </div>
            <p className="font-normal">August 20, 2022</p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
