import React from 'react'

const HomeMain = () => {
  return (
    <div className='pt-0 p-4'>
      <div
        className='home_page relative flex items-center justify-center p-10'
        style={{
            //https://c0.wallpaperflare.com/preview/685/877/292/boutique-close-up-clothes-clothes-hanger.jpg
          backgroundImage: `url("https://i.pinimg.com/originals/c1/f5/fa/c1f5fa74c2d3cdfa71294197978a66ae.jpg")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '90vh',
        }}
        id='home'
      >
        <div className="">
          <button className='px-6 py-3 rounded-xl shadow-3xl border-[1px] border-black hover:bg-[#1b1b1b] bg-white shadow-inner shadow-2xl hover:text-white'>
            Shop Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeMain
