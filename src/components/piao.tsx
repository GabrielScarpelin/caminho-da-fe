import { squares } from "@/config/squares";
import { useEffect, useState } from "react";
import styles from './piao.module.css';
import { useRouter } from "next/navigation";
type PiaoProps = {
    boardPosition: number;
    color: string;
    pad: number;
    setPlayers: (players: {
        name: string;
        color: string;
        position: number;
        inConfession: boolean;
        inCommunion: boolean;
        verified: boolean;
    }[]) => void;
    players: {
        name: string;
        color: string;
        position: number;
        inConfession: boolean;
        inCommunion: boolean;
        verified: boolean;
    }[];
    playerNumber: number;
    turn: number;
    isLocked: boolean;
    setIsLocked: (isLocked: boolean) => void;
    openQuestionCard: (playerNumber: number) => void;
    openDoubtFaithCard: (playerNumber: number) => void;
}

export default function Piao({ boardPosition, color, pad, players, setPlayers, playerNumber, setIsLocked, openQuestionCard, openDoubtFaithCard }: PiaoProps){
    const router = useRouter();
    const [isAnimating, setIsAnimating] = useState(false);
    const [position, setPosition] = useState(0);
    const padding = 8;
    useEffect( () => {
        console.log(position, boardPosition, isAnimating)
        // if (turn !== playerNumber) return;
        if (position === boardPosition) {
            const effect = squares[boardPosition].effect
            console.log(`Player ${playerNumber} andou`)
            if (effect === "temptation") {
                if (players[playerNumber].verified) return;
                if (players[playerNumber].inCommunion){
                    const playersUpdated = players.map((player, index) => {
                        if (index === playerNumber){
                            player.inCommunion = false;
                            player.verified = true;
                        }
                        return player;
                    })
                    setPlayers(playersUpdated)
                    alert("Você caiu na casa da tentação, mas a graça da eucaristia te protegeu")
                    return;
                }
                const playersUpdated = players.map((player, index) => {
                    if (index === playerNumber){
                        player.position = 15;
                        player.inConfession = true;
                    }
                    return player;
                })
                setPlayers(playersUpdated)
                alert("Você caiu na tentação! Volte para a confissão\nVocê só pode sair da confissão se tirar 6 no dado ou ficar 1 rodada sem tirar 6")
            }
            if (effect === "heresy") {
                console.log("Heresia")
                const playersUpdated = players.map((player, index) => {
                    if (index === playerNumber){
                        player.position -= 3;
                    }
                    return player;
                })
                setPlayers(playersUpdated)
                alert("Você caiu em heresia! Volte 3 casas")
            }
            if (effect === "mortalSin") {
                console.log("Pecado mortal")
                const playersUpdated = players.map((player, index) => {
                    if (index === playerNumber){
                        player.position = 15;
                        player.inConfession = true;
                    }
                    return player;
                })
                setPlayers(playersUpdated)
                alert("Você caiu em pecado mortal! Volte para a confissão\nVocê só pode sair da confissão se tirar 6 no dado ou ficar 1 rodada sem tirar 6")
            }
            if (effect === "eucharist" && !players[playerNumber].inCommunion) {
                console.log("Eucaristia")
                const playersUpdated = players.map((player, index) => {
                    if (index === playerNumber){
                        player.position = player.position
                        player.inCommunion = true;
                    }
                    return player;
                })
                setPlayers(playersUpdated)
                alert("Você caiu na eucaristia! Caso chegue na tentação, a graça da eucaristia te protegerá")
            }
            if (effect === "question" && !players[playerNumber].verified){
                const playersUpdated = players.map((player, index) => {
                    if (index === playerNumber){
                        player.position = player.position
                        player.verified = true;
                    }
                    return player;
                })
                setPlayers(playersUpdated)
                setIsLocked(true);
                console.log("Pergunta")
                openQuestionCard(playerNumber);
            }
            if (effect === "doubtFaith" && !players[playerNumber].verified){
                const playersUpdated = players.map((player, index) => {
                    if (index === playerNumber){
                        player.position = player.position
                        player.verified = true;
                    }
                    return player;
                })
                setPlayers(playersUpdated)
                setIsLocked(true);
                console.log("Dúvida de fé")
                openDoubtFaithCard(playerNumber);
            }
            if (effect === "endGame"){
                const sortPlayers = players.sort((a, b) => b.position - a.position);
                const length = sortPlayers.length;
                router.push(`/ranking?winner=${sortPlayers[length - 1].name ? sortPlayers[length - 1].name : ""}&second=${sortPlayers[length - 2].name ? sortPlayers[length - 2].name : ""}&third=${sortPlayers[length - 3].name ? sortPlayers[length - 3].name : ""}`)
            }
            return;
        };
        setIsAnimating(true);
        const interval = setTimeout(() => {
            if (position === boardPosition){
                clearInterval(interval);
                setIsAnimating(false);
            }
            position < boardPosition ? setPosition(position + 1) : setPosition(position - 1)
        }, 250);
    
    }, [boardPosition, position, isAnimating, players, setPlayers, playerNumber, setIsLocked, openQuestionCard])
    return (
        <div style={{position: 'absolute', zIndex: 99, top: squares[position].y - padding, right: squares[position].x + padding + pad}} className={`${styles.animation}`}>
            <svg width="27" height="49" viewBox="0 0 27 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_37_4)">
                    <path d="M0.5 41.2416L9.48333 16.3333H16.425L25 41.2416C25 41.2416 22.9583 49 12.3417 48.5916C1.725 48.1833 0.5 41.2416 0.5 41.2416Z" fill={color}/>
                </g>
                <g filter="url(#filter1_di_37_4)">
                    <circle cx="13.1584" cy="8.98333" r="8.98333" fill={color}/>
                </g>
                <defs>
                    <filter id="filter0_i_37_4" x="0.5" y="16.3333" width="24.5" height="36.2739" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_37_4"/>
                    </filter>
                    <filter id="filter1_di_37_4" x="0.175049" y="0" width="25.9666" height="25.9667" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_37_4"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_37_4" result="shape"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="shape" result="effect2_innerShadow_37_4"/>
                    </filter>
                </defs>
            </svg>

        </div>
    )
}