import { Astal, Gtk } from "ags/gtk4"
import { Accessor } from "gnim"
import Programs from "./widgets/Programs"
import Tools from "./widgets/Tools"
import System from "./widgets/System"

export default function Menu({
  isMenuOpen,
}: {
  isMenuOpen: Accessor<boolean>
}) {
  const { TOP, LEFT, BOTTOM } = Astal.WindowAnchor

  return (
    <window class="menu" visible={isMenuOpen} anchor={TOP | LEFT | BOTTOM}>
      <box orientation={Gtk.Orientation.VERTICAL}>
        <Programs />
        <Tools />
        <System />
      </box>
    </window>
  )
}
