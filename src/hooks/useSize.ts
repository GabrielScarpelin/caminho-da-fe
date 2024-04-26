import { useState, useEffect } from 'react';

const useSize = () => {
    const [size, setSize] = useState({
        width: 1280,
        height: 720
    });
    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })
    return size;
}

export default useSize;