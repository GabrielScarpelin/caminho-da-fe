"use client"
import Image from "next/image";
import styles from "./page.module.css";
import topPage from "../assets/top-header.png";
import pomba from "../assets/pomba.png";
import button from "../assets/playButton.png";
import pegadas from "../assets/pegadas.svg";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSize from "@/hooks/useSize";

export default function Home() {
  const windowSize = useSize();
  useEffect(() => {
    console.log(windowSize)
  }, [windowSize])
  return (
    <main className={styles.main}>
      <Image src={topPage} alt="Figura do topo da página" style={{position: 'absolute', top: -50, width: windowSize.width, height: "auto"}}/>
      <Image src={pomba} alt="Figura de uma pomba" width={windowSize.width/1440 * 350} style={{marginTop: 24, height: "auto"}} />
      <h1 className={`${styles.title}`} >CAMINHO DA FÉ</h1>
      <Link href={`/config`} className={styles.button}>
        <Image src={button} alt="Botão jogar" width={windowSize.width/1440 * 250} style={{height: "auto"}}/>
      </Link>
      <Image src={pegadas} alt="Figura de pegadas" width={windowSize.width} style={{position: 'absolute', bottom: 0, zIndex: -99}} />
    </main>
  );
}
