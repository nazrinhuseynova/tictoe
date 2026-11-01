import Board from "@/components/Board";
import Mark from "@/components/Mark";
import { Cell, calculateWinner, Player, Scores } from "@/constants/game";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const emptyBoard = (): Cell[] => Array(9).fill(null);

export default function App() {
  const [board, setBoard] = useState<Cell[]>(emptyBoard());
  const [current, setCurrent] = useState<Player>("X");
  const [scores, setScores] = useState<Scores>({ X: 0, O: 0, draw: 0 });

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const boardSize = isLandscape
    ? Math.min(height - 48, width * 0.5)
    : Math.min(width - 40, height * 0.5);

  const result = calculateWinner(board);
  const isDraw = !result && board.every((cell) => cell !== null);
  const gameOver = result !== null || isDraw;

  const statusText = result
    ? `${result.player} qazandı! 🎉`
    : isDraw
      ? "Bərabərlik!"
      : `Növbə: ${current}`;

  const handleCellPress = (index: number) => {
    if (board[index] || gameOver) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = current;
    setBoard(newBoard);

    const newResult = calculateWinner(newBoard);

    if (newResult) {
      setScores({
        ...scores,
        [newResult.player]: scores[newResult.player] + 1,
      });
    } else if (newBoard.every((cell) => cell !== null)) {
      setScores({ ...scores, draw: scores.draw + 1 });
    } else {
      setCurrent(current === "X" ? "O" : "X");
    }
  };

  const handleNewGame = () => {
    setBoard(emptyBoard());
    setCurrent("X");
  };

  const handleResetScores = () => {
    setScores({ X: 0, O: 0, draw: 0 });
    handleNewGame();
  };

  const info = (
    <View style={styles.info}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Text style={styles.status}>{statusText}</Text>
      <View style={styles.scoreRow}>
        <View style={styles.scoreBox}>
          <Mark player="X" size={26} />
          <Text style={styles.scoreText}>{scores.X}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Text style={styles.drawLabel}>Bərabər</Text>
          <Text style={styles.scoreText}>{scores.draw}</Text>
        </View>
        <View style={styles.scoreBox}>
          <Mark player="O" size={26} />
          <Text style={styles.scoreText}>{scores.O}</Text>
        </View>
      </View>
    </View>
  );

  const boardView = (
    <Board
      board={board}
      size={boardSize}
      winLine={result ? result.line : null}
      disabled={gameOver}
      onCellPress={handleCellPress}
    />
  );

  const actions = (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.primaryBtn} onPress={handleNewGame}>
        <Text style={styles.primaryText}>Yenidən başla</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryBtn} onPress={handleResetScores}>
        <Text style={styles.secondaryText}>Xalları sıfırla</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLandscape ? (
        <View style={styles.landscape}>
          {boardView}
          <View style={styles.side}>
            {info}
            {actions}
          </View>
        </View>
      ) : (
        <View style={styles.portrait}>
          {info}
          {boardView}
          {actions}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffba08",
  },
  portrait: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  landscape: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 16,
  },
  side: {
    flex: 1,
    maxWidth: 320,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  info: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1b2a52",
  },
  status: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1b2a52",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 4,
  },
  scoreBox: {
    minWidth: 84,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1b2a52",
  },
  drawLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1b2a52",
  },
  actions: {
    alignItems: "center",
    gap: 10,
  },
  primaryBtn: {
    backgroundColor: "#1b2a52",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  secondaryText: {
    color: "#1b2a52",
    fontSize: 14,
    fontWeight: "600",
  },
});