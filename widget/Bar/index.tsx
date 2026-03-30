import app from "ags/gtk4/app"

import { For, With, createBinding, onCleanup } from "ags"
import { Astal, Gdk } from "ags/gtk4"
import BarLeft from "./Left"
import BarRight from "./Right"
import BarCenter from "./Center"

export default function Bar({
  gdkmonitor,
  handleIsMenuOpen,
}: {
  gdkmonitor: Gdk.Monitor
  handleIsMenuOpen: any
}) {
  let win: Astal.Window
  const { TOP, LEFT, RIGHT, BOTTOM } = Astal.WindowAnchor

  onCleanup(() => {
    // Root components (windows) are not automatically destroyed.
    // When the monitor is disconnected from the system, this callback
    // is run from the parent <For> which allows us to destroy the window
    win.destroy()
  })

  return (
    <window
      $={(self) => (win = self)}
      visible
      class={"bar"}
      namespace="my-bar"
      name={`bar-${gdkmonitor.connector}`}
      gdkmonitor={gdkmonitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={BOTTOM | LEFT | RIGHT}
      application={app}
    >
      <centerbox>
        <box $type="start">
          <BarLeft handleIsMenuOpen={handleIsMenuOpen} />
        </box>
        <box $type="center">
          <BarCenter />
        </box>
        <box $type="end">
          <BarRight />
        </box>
      </centerbox>
    </window>
  )
}
