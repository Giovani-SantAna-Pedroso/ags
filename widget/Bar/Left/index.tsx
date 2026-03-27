export default function BarLeft() {
  return (
    <box class={"bar-left"}>
      <button onClicked={() => console.log("button menu")} class={"menu-btn"}>
        [Menu]
      </button>
    </box>
  )
}
