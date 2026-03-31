import { Astal } from "ags/gtk4"
import { Accessor } from "gnim"

export default function Menu({
  isMenuOpen,
}: {
  isMenuOpen: Accessor<boolean>
}) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor

  return (
    <window name="menu" visible={isMenuOpen} anchor={TOP | LEFT | BOTTOM}>
      <scrolledwindow maxContentHeight={500}>
        <box>
          <label label={"menu"} />
        </box>
      </scrolledwindow>
    </window>
  )
}
