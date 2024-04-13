"use client"
import Board from "@/components/board";
import Dice from "@/components/dice";
import Piao from "@/components/piao";
import Image from "next/image";
import pomba from "../../assets/pomba.png";
import doubtCard from "../../assets/doubtCard.svg";
import questionCard from "../../assets/questionCard.svg";
import { useEffect, useState } from "react";
import { squareSize } from "@/config/squares";
import Question from "@/components/question";


export default function Game() {
    const [turn, setTurn] = useState(0);
    const [diceState, setDiceState] = useState(1);
    const [rolling, setRolling] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [openQuestion, setOpenQuestion] = useState(false);
    const [players, setPlayers] = useState([
        {
            color: "#FF0000",
            position: 0,
            inConfession: false,
            inCommunion: false,
            verified: false
        },
        {
            color: "#0000FF",
            position: 0,
            inConfession: false,
            inCommunion: false,
            verified: false
        },
        {
            color: "#1FFF10",
            position: 0,
            inConfession: false,
            inCommunion: false,
            verified: false
        },
        {
            color: "#FFDF00",
            position: 0,
            inConfession: false,
            inCommunion: false,
            verified: false
        }
    ]);
    
    return (
        <div style={{ height: "100%"}}>
            <header style={{ display: "flex", padding: 32, justifyContent: "space-between"}}>
                <h1 style={{color: "#000"}}>Vez do grupo {turn + 1}</h1>
                <Dice diceState={diceState} setDiceState={setDiceState} turn={turn} setTurn={setTurn} rolling={rolling} setRolling={setRolling} players={players} setPlayers={setPlayers} isLocked={isLocked}/>
            </header>
            <div style={{position: "relative", width: "75%"}}>
                <Board />
                {players.map((player, index) => (
                    <Piao boardPosition={player.position} color={player.color} key={`player-${index}`} pad={10 * index} players={players} setPlayers={setPlayers} playerNumber={index} turn={turn} />
                ))}
                { openQuestion ? <Question question="Qual é a resposta para a vida, o universo e tudo mais?" setQuestion={() => {}} setAnswered={() => {}} setCorrectAnswer={() => {}} setWrongAnswer={() => {}} setPlayers={setPlayers} players={players} turn={turn} setTurn={setTurn} setRolling={setRolling} setDiceState={setDiceState} setBoard={() => {}} board={[]} setAnsweredCorrectly={() => {}} setAnsweredWrongly={() => {}} answeredCorrectly={0} answeredWrongly={0}/> : null}
                <Image src={pomba} alt="Figura de uma pomba" width={400} style={{position: "absolute", top: squareSize.height * 3.5 - 250, right: squareSize.width * 5 - 200, opacity: .75}}/>
                <Image src={doubtCard} alt="Carta de dúvida" width={225} style={{position: "absolute", top: squareSize.height * 5 - 50, right: squareSize.width * 1 + 25}}/>
                <Image src={questionCard} alt="Carta de pergunta" width={225} style={{position: "absolute", top: squareSize.height * 5 - 50, right: squareSize.width * 9 - 25 - 225}}/>
            </div>
        </div>
    )
}