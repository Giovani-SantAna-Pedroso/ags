import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import { createBinding } from "ags"
import GLib from "gi://GLib?version=2.0"
import Separator from "../../../components/Separator"
import Tray from "../../Tray"
import SystemInfo from "../../SystemInfo"

export default function BarRight({ format = "%H:%M" }) {
  const time = createPoll("", 1000, () => {
    return GLib.DateTime.new_now_local().format(format)!
  })

  return (
    <box class={"bar-right"}>
      <Tray />
      <Separator />
      <SystemInfo />
      <menubutton>
        <label label={time} />
        <popover>
          <Gtk.Calendar />
        </popover>
      </menubutton>
    </box>
  )
}
