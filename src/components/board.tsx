import { squares, squareSize } from '@/config/squares';
import Image from 'next/image';


export default function Board(){
    
    return (
        <>
            {squares.map((square, index) => (
                <Image key={index} src={square.image} alt="Square" width={squareSize.width} height={squareSize.height} style={{position: 'absolute', top: square.y, right: square.x}}/>
            ))}
        </>
    )
}