import React, { useEffect, useState } from 'react'

const Bubble = () => {
    const [htmlContent,setHtmlContent] = useState('')
    useEffect(()=>{
        fetch('./src/components/Animations/bubbles/index.html')
        .then(response=>response.text())
        .then(data => setHtmlContent(data))
        .catch(error => console.error('Error: ',error))
        return(()=>console.log("unmonted bubble"))
    })
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  )
}

export default Bubble