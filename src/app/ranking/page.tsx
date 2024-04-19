"use client"
import Image from "next/image";
import rankingImage from "../../assets/rankingImage.png";
import podioImage from "../../assets/podio.png";
import styles from "./page.module.css";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
export default function Ranking(){
    const searchParams = useSearchParams()
    return (
        <Suspense >
            <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "space-between" }}>
                <Image src={rankingImage} alt="Imagem da pomba na tela de ranking"/>
                <div style={{ marginRight: 108, display: "flex", flexDirection: "column", position: "relative"}}>
                    <h1 className={styles.title}>Ranking</h1>
                    <Image src={podioImage} alt="Imagem do pódio"/>
                    <h2 style={{ bottom: "35%"}} className={styles.podioText}>{searchParams.get("second")}</h2>
                    <h2 style={{ bottom: "55%", left: "50%", translate: "-50%"}} className={styles.podioText}>{searchParams.get("winner")}</h2>
                    <h2 style={{ bottom: "35%", right: 0}} className={styles.podioText}>{searchParams.get("third")}</h2>
                </div>
            </div>
        </ Suspense>
    )
}