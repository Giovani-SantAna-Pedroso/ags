import { Gtk } from "ags/gtk4"
import AstalBattery from "gi://AstalBattery"
import { createPoll } from "ags/time"
import { createBinding } from "ags"
import GLib from "gi://GLib?version=2.0"
import Separator from "../../../components/Separator"

export default function BarRight({ format = "%H:%M" }) {
  const time = createPoll("", 1000, () => {
    return GLib.DateTime.new_now_local().format(format)!
  })
  const battery = AstalBattery.get_default()
  const percent = createBinding(
    battery,
    "percentage",
  )((p) => {
    return `${Math.floor(p * 100)}%`
  })

  const CPUUsage = createPoll(
    "0",
    5000,
    `bash -c "top -bn1 | grep 'Cpu(s)' | awk '{printf(\\"%d\\", 100 - $8)}'"`,
  )

  const ramUsage = createPoll(
    "0",
    5000,
    `bash -c "free | awk '/Mem/ {printf(\\"%d\\", $3/$2 * 100)}'"`,
  )

  const Temp = createPoll(
    "0",
    10000,
    `bash -c "sensors | awk '/Tctl/ {printf(\\"%d\\", $2)}'"`,
  )

  return (
    <box class={"bar-right"}>
      <Separator />
      <box class={"info-container"}>
        <label class={"info"} label={"CPU:"} />
        <label label={CPUUsage.as((v) => v.padStart(4, " "))} />%
      </box>{" "}
      <box class={"info-container"}>
        <label class={"info"} label={"TEMP:"} />
        <label label={Temp.as((v) => v.padStart(4, " "))} />°
      </box>{" "}
      <box class={"info-container"}>
        <label class={"info"} label={"RAM:"} />
        <label label={ramUsage.as((v) => v.padStart(4, " "))} />%
      </box>{" "}
      {battery !== 0 && (
        <box class={"info-container"}>
          <label class={"info"} label={"BAT:"} />
          <label label={percent.as((v) => v.padStart(4, " "))} />
        </box>
      )}{" "}
      <menubutton>
        <label label={time} />
        <popover>
          <Gtk.Calendar />
        </popover>
      </menubutton>
    </box>
  )
}
