import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css'
import React from 'react'

export default function Reloj1() {
    const [value, setValue] = useState(new Date());

    useEffect(() => {
      const interval = setInterval(() => setValue(new Date()), 1000);
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    return (
      <div >      
        <Clock value={value} className="reloj" />
      </div>
    );
}
