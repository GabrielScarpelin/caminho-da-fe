import { squares } from "@/config/squares";
import styles from "./dice.module.css";
type DiceProps = {
    rolling: boolean;
    setRolling: (rolling: boolean) => void;
    diceState: number;
    setDiceState: (diceState: number) => void;
    turn: number;
    setTurn: (turn: number) => void;
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
    isLocked: boolean;
}
const dice = [diceOne, diceTwo, diceThree, diceFour, diceFive, diceSix];
export default function Dice({ rolling, setRolling, diceState, setDiceState, turn, setTurn, setPlayers, players, isLocked}: DiceProps){
    const rollDice = () => {
        if (rolling || isLocked) return;
        setRolling(true);
        setTimeout(()=>{
            const newDiceValue = Math.floor(Math.random() * 6) + 1;
            setDiceState(newDiceValue);
            setRolling(false);
            if (players[turn].inConfession && newDiceValue !== 6){
                const playersUpdated = players.map((player, index) => {
                    if (index === turn){
                        player.inConfession = false;
                    }
                    return player;
                })
                setPlayers(playersUpdated);
                turn === players.length - 1 ? setTurn(0) : setTurn(turn + 1)
                return;
            }
            if (players[turn].inConfession && newDiceValue === 6){
                const playersUpdated = players.map((player, index) => {
                    if (index === turn){
                        player.inConfession = false;
                    }
                    return player;
                })
                setPlayers(playersUpdated);
                return;
            }
            const playersUpdated = players.map((player, index) => {
                if (index === turn){
                    player.position + newDiceValue > squares.length - 1 ? player.position = squares.length - 1 : player.position += newDiceValue;
                    player.verified = false;
                }
                return player;
            })
            turn === players.length - 1? setTurn(0) : setTurn(turn + 1)
            setPlayers(playersUpdated);
        }, 1000);
    }
    return (
        <>
            <div className={styles.dice} onClick={rollDice}>
                {rolling ? diceEmptyRoll() : dice[diceState - 1]()}
            </div>
        </>
    )
}
function diceOne(){
    return (
        <div className={`${styles.square} ${styles.one}`}>
            <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
        </div>
    )
}
function diceTwo(){
    return (
        <div className={`${styles.square} ${styles.two}`}>
            <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%", alignSelf: 'flex-start'}}></div>
            <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%", alignSelf: "flex-end"}}></div>
        </div>
    )
}
function diceThree(){
    return (
        <div className={`${styles.square} ${styles.three}`}>
            <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%", alignSelf: 'flex-start'}}></div>
            <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%", alignSelf: "center"}}></div>
            <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%", alignSelf: "flex-end"}}></div>
        </div>
    )
}
function diceFour(){
    return (
        <div className={`${styles.square} ${styles.four}`}>
            <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
            </div>
            <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
            </div>
        </div>
    )
}
function diceFive(){
    return (
        <div className={`${styles.square} ${styles.five}`}>
            <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
            </div>
            <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%", alignSelf: "center"}}></div>
            <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
            </div>
        </div>
    )
}
function diceSix(){
    return (
        <div className={`${styles.square} ${styles.six}`}>
            <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
            </div>
            <div style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}}>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
                <div style={{ width: "1rem", height: "1rem", backgroundColor: "#000000", borderRadius: "50%"}}></div>
            </div>
        </div>
    )
}
function diceEmptyRoll(){
    return (
        <div className={`${styles.square} ${styles.animDice}`}></div>
    )
}