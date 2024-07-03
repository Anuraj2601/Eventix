import {Swiper, SwiperSlide} from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

import { FreeMode, Pagination } from 'swiper/modules'

import { RxArrowTopRight } from 'react-icons/rx'
import { Carousel } from './constants'

export function ClubEvent() {
  return (
    <div className='bg-white'>
      <Swiper 
        breakpoints={{
          340: {
            slidesPerView: 1,
            spaceBetween: 15
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15
          }
        }}
        
        freeMode={true}
        pagination={{
          clickable: true
        }}
        modules={[FreeMode, Pagination]}
        className='max-w-[90%] lg:max-w-[80%]'
        >
         {Carousel.map((item) =>(
          <SwiperSlide key={item.title}>
            <div className=' gap-6 group relative shadow-lg text-white rounded-xl px-6 py-8'>
              <div className="absolute inset-0 bg-hover bg-center"
               style={{backgroundImage: `url(${item.backgroundImage})`}} />

              <div className='absolute inset-0 opacity-10 group-hover:opacity-50'/>
            </div>
          </SwiperSlide>
         ))}
      </Swiper>

    </div>
  )
}

