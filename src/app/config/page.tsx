"use client"
import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { Nerko_One } from "next/font/google";
import leftArrow from "../../assets/leftArrow.svg";
import rightArrow from "../../assets/rightArrow.svg";
import Image from 'next/image';
import button from "../../assets/playButton.png";

const nerkoOne = Nerko_One({ subsets: ["latin"], weight: '400'});
export default function ConfigPage(){
    const maxPlayers = 6;
    const [ quantityPlayers, setQuantityPlayers ] = useState(2);
    const [ availableColors, setAvailableColors ] = useState<string[]>(["#FF0000", "#0000FF", "#1FFF10", "#FFDF00", "#FF00FF", "#00FFFF", "#FFFF00", "#000000", "#FFFFFF", "#808080", "#800000", "#808000", "#008000", "#008080", "#000080", "#800080", "#C0C0C0", "#808080", "#FFA07A", "#FF7F50", "#FF4500", "#FF6347"]);
    const [ selectedIndexColors, setSelectedIndexColors ] = useState<number[]>([0, 1, 2, 3, 4, 5]);
    const [players, setPlayers] = useState<{
        name: string | null;
        color: string | null;
        position: number;
        inConfession: boolean;
        inCommunion: boolean;
        verified: boolean;
    }[]>(new Array(maxPlayers).fill({name: null, color: null, position: 0, inConfession: false, inCommunion: false, verified: false}));
    const [dimensions, setDimensions] = useState({ 
        height: window.innerHeight,
        width: window.innerWidth
      });
      useEffect(()=>{
        setDimensions({
          height: window.innerHeight,
          width: window.innerWidth
        })
        
      }, [])
    return (
        <>
            <header style={{marginTop: 48}}>
                <div className={styles.coverTitle}>
                    <h1 className={styles.title}>MENU</h1>
                </div>
            </header>
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gridTemplateColumns: "1fr 1fr 1fr", gap: 32}}>
                {new Array(quantityPlayers).fill(0).map((_, index) => {
                    return (
                        <div key={index} style={{ marginLeft: 16}}>
                            <h2 className={styles.selectTitle}>nome do grupo</h2>
                            <div>
                                <input type="text" name="" id="" onChange={(e) => {
                                    setPlayers(players.map((player, i) => {
                                        const newPlayer = {...player};
                                        if (i === index){
                                            newPlayer.name = e.target.value;
                                            newPlayer.color = availableColors[selectedIndexColors[index]];
                                        }
                                        return newPlayer;
                                    }))
                                }} style={{ color: "white", backgroundColor: "#BB2525", border: "none", padding: 8, fontSize: 18}}/>
                                <button onClick={() => quantityPlayers < 6 ? setQuantityPlayers(quantityPlayers + 1) : null} style={{ color: "#BB2525", backgroundColor: "transparent", border: "none", fontSize: 36, marginLeft: 8}} className={nerkoOne.className}>+</button>
                            </div>
                            <h2 className={styles.selectTitle}>cor do peão</h2>
                            <div style={{ display: "flex" }}>
                                <button className={styles.buttonArea} onClick={() => {
                                    let i = selectedIndexColors[index];
                                    while (true){
                                        i = i === 0 ? availableColors.length - 1 : i - 1;
                                        if (!selectedIndexColors.includes(i)){
                                            setSelectedIndexColors(selectedIndexColors.map((selected, j) => {
                                                if (j === index){
                                                    return i;
                                                }
                                                return selected;
                                            }))
                                            break;
                                        }
                                    }
                                    setPlayers(players.map((player, i) => {
                                        const newPlayer = {...player};
                                        if (i === index){
                                            newPlayer.color = availableColors[selectedIndexColors[index]];
                                        }
                                        return newPlayer;
                                    }))
                                }}><Image src={leftArrow} alt=''/></button>
                                <div style={{width: 80, height: 80, backgroundColor: "#D9D9D9", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", marginInline: 16}}>
                                    <div style={{ width: 70, height: 70, borderRadius: "50%", backgroundColor: availableColors[selectedIndexColors[index]]}}></div>
                                </div>
                                <button className={styles.buttonArea} onClick={() => {
                                    let i = selectedIndexColors[index];
                                    while (true){
                                        i = i === availableColors.length - 1 ? 0 : i + 1;
                                        if (!selectedIndexColors.includes(i)){
                                            setSelectedIndexColors(selectedIndexColors.map((selected, j) => {
                                                if (j === index){
                                                    return i;
                                                }
                                                return selected;
                                            }))
                                            break;
                                        }
                                    }
                                    setPlayers(players.map((player, i) => {
                                        const newPlayer = {...player};
                                        if (i === index){
                                            newPlayer.color = availableColors[selectedIndexColors[index]];
                                        }
                                        return newPlayer;
                                    }))
                                }}><Image src={rightArrow} alt=''/></button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 32}}>
                <button style={{ border: "none", backgroundColor: "transparent"}} onClick={() => {
                    localStorage.setItem("players", JSON.stringify(players));
                    window.location.href = "/game";
                }} className={styles.button}>
                    <Image src={button} alt="" width={ 1440 / dimensions.width * 332} />
                </button>
            </div>
        </>
    )
}