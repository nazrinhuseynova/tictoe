import Mark from "@/components/Mark";
import { Cell } from "@/constants/game";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type BoardProps = {
  board: Cell[];
  size: number;
  winLine: number[] | null;
  disabled: boolean;
  onCellPress: (index: number) => void;
};

const PADDING = 4;
const MARGIN = 3;

export default function Board({
  board,
  size,
  winLine,
  disabled,
  onCellPress,
}: BoardProps) {
  const cellSize = (size - PADDING * 2 - MARGIN * 6) / 3 - 0.5;

  return (
    <View style={[styles.board, { width: size, height: size }]}>
      {board.map((value, index) => {
        const isWinCell = winLine !== null && winLine.includes(index);
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            disabled={disabled || value !== null}
            onPress={() => onCellPress(index)}
            style={[
              styles.cell,
              { width: cellSize, height: cellSize },
              isWinCell && styles.winCell,
            ]}
          >
            {value && <Mark player={value} size={cellSize * 0.78} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    justifyContent: "center",
    padding: PADDING,
    backgroundColor: "#f3f0f7",
    borderRadius: 16,
  },
  cell: {
    margin: MARGIN,
    backgroundColor: "#ffca28",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  winCell: {
    backgroundColor: "#fff1a8",
    borderWidth: 3,
    borderColor: "#1b2a52",
  },
});