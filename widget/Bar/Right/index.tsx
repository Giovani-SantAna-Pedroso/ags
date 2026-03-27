import { Gtk } from "ags/gtk4"
import AstalBattery from "gi://AstalBattery"
import { createPoll } from "ags/time"
import { createBinding } from "ags"
import GLib from "gi://GLib?version=2.0"

export default function BarRight({ format = "%H:%M" }) {
  const time = createPoll("", 1000, () => {
    return GLib.DateTime.new_now_local().format(format)!
  })
  const battery = AstalBattery.get_default()
  console.log(AstalBattery.State)
  console.log("battery", AstalBattery.battery)
  const percent = createBinding(
    battery,
    "percentage",
  )((p) => {
    console.log(p)
    return `${Math.floor(p * 100)}%`
  })

  console.log(battery)

  return (
    <box class={"bar-left"}>
      <label label={percent} />
      {battery === undefined && (
        <>
          <label label={"BAT: "} />
          <label label={percent} />
        </>
      )}{" "}
      -{" "}
      <menubutton>
        <label label={time} />
        <popover>
          <Gtk.Calendar />
        </popover>
      </menubutton>
    </box>
  )
}
