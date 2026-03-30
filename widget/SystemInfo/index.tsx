import { createBinding } from "ags"
import AstalBattery from "gi://AstalBattery"
import { createPoll } from "ags/time"

export default function SystemInfo() {
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
    <box>
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
    </box>
  )
}
