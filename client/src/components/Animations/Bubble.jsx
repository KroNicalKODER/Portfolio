import React, { useEffect, useState } from 'react';

// Loads the floating-bubbles overlay (public/static/bubbles) once.
const Bubble = () => {
  const [htmlContent, setHtmlContent] = useState('');
  useEffect(() => {
    let cancelled = false;
    fetch('/static/bubbles/index.html')
      .then((response) => response.text())
      .then((data) => !cancelled && setHtmlContent(data))
      .catch((error) => console.error('Error: ', error));
    return () => {
      cancelled = true;
    };
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default Bubble;
