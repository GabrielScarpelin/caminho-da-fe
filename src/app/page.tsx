"use client"
import Image from "next/image";
import styles from "./page.module.css";
import topPage from "../assets/top-header.png";
import pomba from "../assets/pomba.png";
import button from "../assets/playButton.png";
import { Nerko_One } from "next/font/google";
import pegadas from "../assets/pegadas.svg";
import { useEffect, useState } from "react";
import Link from "next/link";

const nerkoOne = Nerko_One({ subsets: ["latin"], weight: '400'});
export default function Home() {
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
    <main className={styles.main}>
      <Image src={topPage} alt="Figura do topo da página" style={{position: 'absolute', top: -50, width: 1440}}/>
      <Image src={pomba} alt="Figura de uma pomba" width={275} style={{marginTop: 24}}/>
      <h1 className={`${nerkoOne.className} ${styles.title}`} >CAMINHO DA FÉ</h1>
      <Link href={`/game`} className={styles.button}>
        <Image src={button} alt="Botão jogar" width={175}/>
      </Link>
      <Image src={pegadas} alt="Figura de pegadas" width={dimensions.width} style={{position: 'absolute', bottom: 0, zIndex: -99}} />
    </main>
  );
}
