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
import { questions, doubtFaith } from "@/config/questions";
import Question from "@/components/question";
import DoubtFaith from "@/components/doubtFaith";
import eucaristia from "../../assets/eucaristia.png";


export default function Game() {
    const [turn, setTurn] = useState(0);
    const [diceState, setDiceState] = useState(1);
    const [rolling, setRolling] = useState(false);
    const [isLocked, setIsLocked] = useState(true);
    const [openQuestion, setOpenQuestion] = useState<{open: boolean; playerNumber: number}>({open: false, playerNumber: NaN});
    const [sortedQuestions, setSortedQuestions] = useState<number[]>([]);
    const [ openDoubtQuestion, setOpenDoubtQuestion ] = useState<{open: boolean; playerNumber: number}>({open: false, playerNumber: NaN})
    const [ sortedDoubtFaith, setSortedDoubtFaith ] = useState<number[]>([]);
    const [actualQuestion, setActualQuestion] = useState<string>("")
    const [players, setPlayers] = useState([
        {
            name: "Grupo 1",
            color: "#FF0000",
            position: 0,
            inConfession: false,
            inCommunion: false,
            verified: false
        },
        {
            name: "Grupo 2",
            color: "#0000FF",
            position: 0,
            inConfession: false,
            inCommunion: false,
            verified: false
        },
        {
            name: "Grupo 3",
            color: "#1FFF10",
            position: 0,
            inConfession: false,
            inCommunion: false,
            verified: false
        },
        {
            name: "Grupo 4",
            color: "#FFDF00",
            position: 0,
            inConfession: false,
            inCommunion: false,
            verified: false
        }
    ]);
    useEffect(() => {
        const localStoragePlayers = JSON.parse(localStorage.getItem("players") || '""').filter((player: any) => player.name !== null);
        localStoragePlayers ? setPlayers(localStoragePlayers) : null;
        setIsLocked(false);
    }, [])
    const openQuestionCard = (playerNumber: number) => {
        let randomIndex = Math.floor(Math.random() * questions.length);
        while (sortedQuestions.includes(randomIndex)){
            if (sortedQuestions.length === questions.length){
                setSortedQuestions([]);
            }
            randomIndex = Math.floor(Math.random() * questions.length);
        }
        setSortedQuestions([...sortedQuestions, randomIndex]);
        setActualQuestion(questions[randomIndex]);
        setOpenQuestion({
            open: true,
            playerNumber: playerNumber
        });
    }
    const openDoubtFaithCard = (playerNumber: number) => {
        let randomIndex = Math.floor(Math.random() * doubtFaith.length);
        while (sortedDoubtFaith.includes(randomIndex)){
            if (sortedDoubtFaith.length === doubtFaith.length){
                setSortedDoubtFaith([]);
            }
            randomIndex = Math.floor(Math.random() * doubtFaith.length);
        }
        setSortedDoubtFaith([...sortedDoubtFaith, randomIndex]);
        setActualQuestion(doubtFaith[randomIndex]);
        setOpenQuestion({
            open: true,
            playerNumber: playerNumber
        });
    }
    useEffect(() => {document.ondragstart = () => false;}, [])
    return (
        <div style={{ height: "100%"}}>
            <header style={{ display: "flex", padding: 32, justifyContent: "space-between"}}>
                <div style={{ display: "flex", alignItems: "center", gap: 32}}>
                    <h1 style={{color: "#000", fontSize: 48}}>Vez do grupo {players[turn].name}</h1>
                    <div style={{ backgroundColor: players[turn].color, width: 32, height: 32, borderRadius: "50%", outline: "6px #aaaa solid"}}></div>
                    { players[turn].inCommunion ? <Image src={eucaristia} alt="Figura de uma hóstia, significando que o grupo está em comunhão" width={64} /> : null}
                </div>
                <Dice diceState={diceState} setDiceState={setDiceState} turn={turn} setTurn={setTurn} rolling={rolling} setRolling={setRolling} players={players} setPlayers={setPlayers} isLocked={isLocked}/>
            </header>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{position: "relative", width: squareSize.width * squareSize.columns, height: squareSize.height * squareSize.rows}}>
                    <Board />
                    {players.map((player, index) => (
                        <Piao boardPosition={player.position} color={player.color} key={`player-${index}`} pad={10 * index} players={players} setPlayers={setPlayers} playerNumber={index} turn={turn} isLocked={isLocked} setIsLocked={setIsLocked} openQuestionCard={openQuestionCard} openDoubtFaithCard={openDoubtFaithCard}/>
                    ))}
                    { openQuestion.open ? <Question question={actualQuestion} players={players} setPlayers={setPlayers} playerNumber={openQuestion.playerNumber} setIsLocked={setIsLocked} setOpenQuestion={setOpenQuestion}/> : null}
                    { openDoubtQuestion.open ? <DoubtFaith question={actualQuestion} players={players} setPlayers={setPlayers} playerNumber={openDoubtQuestion.playerNumber} setIsLocked={setIsLocked} setOpenDoubtQuestion={setOpenDoubtQuestion}/> : null}
                    <Image src={pomba} alt="Figura de uma pomba" width={400} style={{position: "absolute", top: squareSize.height * 3.5 - 250, right: squareSize.width * 5 - 200, opacity: .75}}/>
                    <Image src={doubtCard} alt="Carta de dúvida" width={225} style={{position: "absolute", top: squareSize.height * 5 - 50, right: squareSize.width * 1 + 25}}/>
                    <Image src={questionCard} alt="Carta de pergunta" width={225} style={{position: "absolute", top: squareSize.height * 5 - 50, right: squareSize.width * 9 - 25 - 225}}/>
                </div>
            </div>
        </div>
    )
}