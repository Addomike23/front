import React from 'react'
import { menuImages } from '../../../assets/Assets'

const ShopCategory = ({category, setCategory}) => {
    // set menu 
    
    
    
    
    

    return (
        <div className='w-full '>
            <h1 className='text-1xl bg-gray-200 px-10 py-7 text-left text-gray-950 '> SHOP BY CATEGORY</h1>

            <div className="w-full flex justify-center items-center p-4">
                <div className="flex overflow-x-auto md:grid md:grid-cols-6 gap-1 md:gap-2 pl-20 snap-x scrollbar-hide justify-center">
                    {menuImages.map((menuImage, index) => (
                        <div onClick={()=> setCategory(prev => prev === menuImage.category? "All" : menuImage.category)}
                            key={index}
                            className="flex flex-col items-center justify-center min-w-[25%] sm:min-w-[20%] md:w-auto snap-start"
                        >
                            <img
                                src={menuImage.img}
                                alt={menuImage.category}
                                
                                className={`${category === menuImage.category? "border-4 border-orange-400": ""} w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-2 border-gray-300`}
                            />
                            <p className="text-center text-gray-950 text-sm md:text-base mt-2">
                                {menuImage.category}
                            </p>
                        </div>
                    ))}
                </div>
            </div>



        </div>
    )
}

export default ShopCategory