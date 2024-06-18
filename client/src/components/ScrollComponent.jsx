import React, { useEffect, useState } from 'react';
const ScrollComponent = ({ currScreenCount }) => {
    const [displayText, setDisplayText] = useState([]);

    useEffect(() => {
        const contents = [
            'Overview',
            'Profile',
            'Skills',
            'Projects',
            'Academics',
            'Achievements',
        ];
        contents.splice(currScreenCount, 0, "")
        setDisplayText(contents);
    }, [currScreenCount]);

    return (
        <div>
            <div className='absolute flex mt-56 w-full pr-4 items-center justify-end'>
                <div className='flex flex-col text-right text-white text-xs font-bold'>
                    <span className='self-center mb-5 text-green-400'>Up/W</span>
                    {
                        displayText.map((item, index) => (
                            index === currScreenCount ? (
                                <div
                                    className='bg-purple-400 self-end  shadow-4xl shadow-white w-[2px] h-[40px] rounded-full'
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                />
                            )
                            :
                            index == currScreenCount - 1 ? (
                                <div
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                    className='text-purple-400 font-bold'
                                ></div>
                            )
                            :
                            (
                                <div
                                    key={index}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                ></div>
                            )
                        ))
                    }
                    
                    <div className=' self-center mt-5 flex flex-col text-green-500'>
                        <span>Down/S</span>
                    </div>

                </div>
            </div>
            
        </div>
    );
};

export default ScrollComponent;
