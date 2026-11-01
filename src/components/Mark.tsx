import { Player } from "@/constants/game";
import { View } from "react-native";

type MarkProps = {
  player: Player;
  size: number;
};

export default function Mark({ player, size }: MarkProps) {
  if (player === "O") {
    const hole = size * 0.33;
    const border = Math.max(2, size * 0.04);

    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: "#1b2a52",
          borderWidth: border,
          borderColor: "#3f67c4",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: hole,
            height: hole,
            borderRadius: hole / 2,
            backgroundColor: "#ffca28",
            borderWidth: border,
            borderColor: "#3f67c4",
          }}
        />
      </View>
    );
  }

  const thickness = size * 0.3;
  const border = Math.max(2, size * 0.045);
  const length = size * Math.SQRT2 - thickness - border * 4;

  const bar = (
    key: string,
    barLength: number,
    barThickness: number,
    color: string,
    degrees: number,
    radius: number,
  ) => (
    <View
      key={key}
      style={{
        position: "absolute",
        left: (size - barLength) / 2,
        top: (size - barThickness) / 2,
        width: barLength,
        height: barThickness,
        borderRadius: radius,
        backgroundColor: color,
        transform: [{ rotate: `${degrees}deg` }],
      }}
    />
  );

  return (
    <View style={{ width: size, height: size }}>
      {bar(
        "outline1",
        length + border * 2,
        thickness + border * 2,
        "#1b2a52",
        45,
        thickness * 0.4 + border,
      )}
      {bar(
        "outline2",
        length + border * 2,
        thickness + border * 2,
        "#1b2a52",
        -45,
        thickness * 0.4 + border,
      )}
      {bar("fill1", length, thickness, "#f4f4f6", 45, thickness * 0.4)}
      {bar("fill2", length, thickness, "#f4f4f6", -45, thickness * 0.4)}
    </View>
  );
}