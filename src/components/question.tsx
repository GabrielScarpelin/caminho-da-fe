import { squareSize } from "@/config/squares";

type QuestionProps = {
    question: string;
    setQuestion: (question: string) => void;
    setAnswered: (answered: boolean) => void;
    setCorrectAnswer: (correctAnswer: number) => void;
    setWrongAnswer: (wrongAnswer: number) => void;
    setPlayers: (players: {
        color: string;
        position: number;
        inConfession: boolean;
        inCommunion: boolean;
        verified: boolean;
    }[]) => void;
    players: {
        color: string;
        position: number;
        inConfession: boolean;
        inCommunion: boolean;
        verified: boolean;
    }[];
    turn: number;
    setTurn: (turn: number) => void;
    setRolling: (rolling: boolean) => void;
    setDiceState: (diceState: number) => void;
    setBoard: (board: number[]) => void;
    board: number[];
    setAnsweredCorrectly: (answeredCorrectly: number) => void;
    setAnsweredWrongly: (answeredWrongly: number) => void;
    answeredCorrectly: number;
    answeredWrongly: number;
}

export default function Question({ question, setQuestion, setAnswered, setCorrectAnswer, setWrongAnswer, setPlayers, players, turn, setTurn, setRolling, setDiceState, setBoard, board, setAnsweredCorrectly, setAnsweredWrongly, answeredCorrectly, answeredWrongly }: QuestionProps){
    const padding = 48;
    const width = squareSize.width * 8 - padding;
    const height = squareSize.height * 3;
    return (
        <div style={{position: "absolute", width, height, top: squareSize.height + (padding / 2), right: squareSize.width + (padding / 2) , backgroundColor: "#FF00FF", borderRadius: 8, zIndex: 99}}>
            <h2>Aa</h2>
        </div>
    )
}