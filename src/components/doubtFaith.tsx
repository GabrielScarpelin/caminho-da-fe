import { squareSize } from "@/config/squares";
import { useEffect, useState } from "react";
import headerQuestion from "../assets/headerQuestion.svg";
import { Saira_Stencil_One } from "next/font/google";
import Image from "next/image";
import rightMark from "../assets/round-right-mark.png";
import wrongMark from "../assets/round-wrong-mark.png";

const sairaStencilOne = Saira_Stencil_One({ subsets: ["latin"], weight: '400'});
type QuestionProps = {
    question: string;
    players: {
        name: string;
        color: string;
        position: number;
        inConfession: boolean;
        inCommunion: boolean;
        verified: boolean;
    }[];
    setPlayers: (players: {
        name: string;
        color: string;
        position: number;
        inConfession: boolean;
        inCommunion: boolean;
        verified: boolean;
    }[]) => void;
    playerNumber: number;
    setIsLocked: (isLocked: boolean) => void;
    setOpenDoubtQuestion: (openQuestion: {open: boolean; playerNumber: number}) => void;
}

export default function DoubtFaith({ question, players, setPlayers, playerNumber, setIsLocked, setOpenDoubtQuestion }: QuestionProps){
    const [ myTimeout, setMyTimeout ] = useState<NodeJS.Timeout | null>(null);
    const [ secondsToAnswer, setSecondsToAnswer ] = useState(60);
    const correctAnswer = () => {
        setIsLocked(false);
        setOpenDoubtQuestion({open: false, playerNumber: NaN});
    }
    const wrongAnswer = () => {
        const playersUpdated = players.map((player, index) => {
            if (index === playerNumber){
                player.position - 3 < 0 ? player.position = 0 : player.position -= 3;
                player.inConfession = false;
                player.inCommunion = false;
                player.verified = false;
            }
            return player;
        })
        setPlayers(playersUpdated);
        setIsLocked(false);
        setOpenDoubtQuestion({open: false, playerNumber: NaN});
    }
    useEffect(() => {
        setMyTimeout(setTimeout(() => {
            if (secondsToAnswer === 0){
                clearInterval(myTimeout!);
                return;
            }
            setSecondsToAnswer(secondsToAnswer - 1);
        }, 1000))
    }, [secondsToAnswer])
    return (
        <div style={{width: squareSize.width * (squareSize.columns - 2) - 36, height: squareSize.height * 3, right: squareSize.width + 18, backgroundColor: "#F3583A", zIndex: 99, position: "absolute", top: squareSize.height + 18, borderRadius: 50, display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Image src={headerQuestion} alt="headerQuestion" width={squareSize.width * (squareSize.columns - 2) - 36} />
            <h1 style={{ color: "#000", marginInline: 24}} >{question}</h1>
            <div style={{ display: "flex", gap: 64, marginTop: 32}}>
                <button onClick={wrongAnswer} style={{ backgroundColor: "transparent", border: "none"}}><Image src={wrongMark} alt="" width={48}/></button>
                <button onClick={correctAnswer} style={{ backgroundColor: "transparent", border: "none"}}><Image src={rightMark} alt="" width={48}/></button>
            </div>
            <h2 style={{ color: "#141E46", fontSize: 40, display: "inline-block", marginTop: 12}} className={sairaStencilOne.className}>00:{secondsToAnswer}</h2>
        </div>
    )
}