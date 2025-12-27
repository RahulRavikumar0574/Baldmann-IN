// import React from "react";
// import './MLmodel.css';
// import Lottie from "lottie-react";
// import mlAnimation from './ml_animation.json';

// const MLmodel = () => {
//     return(
//         <>
//         <p className="title-main">Upcoming</p>
//         <div className="model-main">
//             <div className="model-div">
//                 <p className="model-title">Machine Learning Models</p>
//                 <Lottie animationData={mlAnimation} className='ml-animation'/>
//             </div>
//         </div>
//         </>
//     );
// };

// export default MLmodel;


import secretMeme from './ishaan_easter.jpg'; 
import React, { useState, useEffect } from "react";
import './MLmodel.css';
import Lottie from "lottie-react";
import mlAnimation from './ml_animation.json';

const MLmodel = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [showImage, setShowImage] = useState(false);

    // Detect mobile screen
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Toggle image visibility
    const handleTap = () => {
        if (isMobile) {
            setShowImage(prev => !prev);
        }
    };
};

export default MLmodel;

