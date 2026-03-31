import { Gtk } from "ags/gtk4"

export default function () {
  return (
    <box halign={Gtk.Align.START} class={"container-categories"}>
      <button class="btn-cat">[P]rograms</button>
    </box>
  )
}
