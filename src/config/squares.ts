import firstSquare from '../assets/firstSquare.svg';
import questionSquare from '../assets/questionSquare.svg';
import mortalSinSquare from '../assets/mortalSinSquare.svg';
import heresySquare from '../assets/heresySquare.svg';
import eucharistSquare from '../assets/eucharistSquare.svg';
import doubtFaith from "../assets/doubtFaith.svg"
import commonSquare from "../assets/commonSquare.svg"
import confessionSquare from "../assets/confessionSquare.svg"
import temptationSquare from "../assets/temptationSquare.svg"

const squareSize = {
    width: 100,
    height: 100
}
const squares = [
    {
        x: 0,
        y: 0,
        image: firstSquare,
        effect: "none"
    },
    {
        x: squareSize.width * 1,
        y: 0,
        image: commonSquare,
        effect: "none"
    },
    {
        x: squareSize.width * 2,
        y: 0,
        image: questionSquare,
        effect: "question"
    },
    {
        x: squareSize.width * 3,
        y: 0,
        image: commonSquare,
        effect: "none"
    },
    {
        x: squareSize.width * 4,
        y: 0,
        image: questionSquare,
        effect: "question"
    },
    {
        x: squareSize.width * 5,
        y: 0,
        image: heresySquare,
        effect: "heresy"
    },
    {
        x: squareSize.width * 6,
        y: 0,
        image: commonSquare,
        effect: "none"
    },
    {
        x: squareSize.width * 7,
        y: 0,
        image: questionSquare,
        effect: "question"
    },
    {
        x: squareSize.width * 8,
        y: 0,
        image: questionSquare,
        effect: "question"
    },
    {
        x: squareSize.width * 9,
        y: 0,
        image: doubtFaith,
        effect: "doubtFaith"
    },
    {
        x: squareSize.width * 9,
        y: squareSize.height * 1,
        image: commonSquare,
        effect: "none"
    },
    {
        x: squareSize.width * 9,
        y: squareSize.height * 2,
        image: heresySquare,
        effect: "heresy"
    },
    {
        x: squareSize.width * 9,
        y: squareSize.height * 3,
        image: commonSquare,
        effect: "none"
    },
    {
        x: squareSize.width * 9,
        y: squareSize.height * 4,
        image: eucharistSquare,
        effect: "eucharist"
    },
    {
        x: squareSize.width * 9,
        y: squareSize.height * 5,
        image: questionSquare,
        effect: "question"
    },
    {
        x: squareSize.width * 9,
        y: squareSize.height * 6,
        image: confessionSquare,
        effect: "confession"
    },
    {
        x: squareSize.width * 8,
        y: squareSize.height * 6,
        image: doubtFaith,
        effect: "doubtFaith"
    },
    {
        x: squareSize.width * 7,
        y: squareSize.height * 6,
        image: questionSquare,
        effect: "question"
    },
    {
        x: squareSize.width * 6,
        y: squareSize.height * 6,
        image: temptationSquare,
        effect: "temptation"
    },
    {
        x: squareSize.width * 5,
        y: squareSize.height * 6,
        image: eucharistSquare,
        effect: "eucharist"
    },
    {
        x: squareSize.width * 4,
        y: squareSize.height * 6,
        image: questionSquare,
        effect: "question"
    },
    {
        x: squareSize.width * 3,
        y: squareSize.height * 6,
        image: mortalSinSquare,
        effect: "mortalSin"
    },
    {
        x: squareSize.width * 2,
        y: squareSize.height * 6,
        image: questionSquare,
        effect: "question"
    },
    {
        x: squareSize.width * 1,
        y: squareSize.height * 6,
        image: temptationSquare,
        effect: "temptation"
    },
    {
        x: squareSize.width * 0,
        y: squareSize.height * 6,
        image: doubtFaith,
        effect: "doubtFaith"
    },
    {
        x: squareSize.width * 0,
        y: squareSize.height * 5,
        image: commonSquare,
    },
    {
        x: squareSize.width * 0,
        y: squareSize.height * 4,
        image: mortalSinSquare,
        effect: "mortalSin"
    },
    {
        x: squareSize.width * 0,
        y: squareSize.height * 3,
        image: questionSquare,
    },
    {
        x: squareSize.width * 0,
        y: squareSize.height * 2,
        image: heresySquare,
    },
    {
        x: squareSize.width * 0,
        y: squareSize.height * 1,
        image: commonSquare,
    },
    {
        x: squareSize.width * 0,
        y: squareSize.height * 0,
        image: firstSquare,
    }
]
export {
    squares,
    squareSize
}