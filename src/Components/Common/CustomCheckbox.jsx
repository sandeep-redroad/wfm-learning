import React,{useState} from 'react'
import { Checkbox } from "@/components/ui/checkbox"

const CustomCheckbox = () => {
    const [rone,setRone]=useState(false);
    const changeOne=()=>{
        setRone(!rone);
    }
  return (
    <div>
     <Checkbox   value={rone}/>
     </div>
  )
}

export default CustomCheckbox