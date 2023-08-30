import React from 'react'
import { useState } from 'react'
import {Link,useNavigate} from  'react-router-dom'
import {logo,sun} from '../assets';
import {navlinks} from '../constants'

const Icon = ({ styles, name, imgUrl, active, disabled, handleClick }) => (
  <div className={` relative flex items-center justify-center 
  h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
  bg-[#2cd2e1b6] text-orange-500
  hover:bg-[#2cd2e1b6] hover:text-white
  rounded-3xl hover:rounded-xl
  transition-all duration-300 ease-linear
  cursor-pointer; ${active && active === name && 'bg-[#2c2f32]'}  ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!active ? (
      <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
    ) : (
      <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${active !== name && 'grayscale'}`} />
    )}
  </div>
)


const Sidebar = () => {
  const navigate = useNavigate()
  const [active,setActive] = useState('dashboard');
  return (
    <div className="menu bg-[#2cd2e183] rounded-box">
    <Link to="/">
      <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
    </Link>

    <div className="flex-1 flex flex-col justify-between items-center bg-transparent rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              active={active}
              handleClick={() => {
                if(!link.disabled) {
                  setActive(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>
        
        <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
      </div>
    </div>
  )
}

export default Sidebar