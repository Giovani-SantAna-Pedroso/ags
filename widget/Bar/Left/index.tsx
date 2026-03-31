import Separator from "../../../components/Separator"
import WorkspacesHyprland from "../../Workspaces/Hyprland"
import Mpris from "../Mpris"
// import WorkspacesHyprland from "../../Workspaces/Hyprland.tsx.bak"
import { exec } from "ags/process"
import GLib from "gi://GLib?version=2.0"
// import WorkspacesSway from "../../Workspaces/Sway"

export default function BarLeft({
  handleIsMenuOpen,
}: {
  handleIsMenuOpen: any
}) {
  const wn = GLib.getenv("XDG_CURRENT_DESKTOP")
  console.log(wn)
  return (
    <box class={"bar-left"}>
      <button
        onClicked={() => {
          console.log("toggle menu")
          handleIsMenuOpen((prev: boolean) => !prev)
        }}
        class={"menu-btn"}
      >
        [Super]
      </button>

      {wn == "Hyprland" && <WorkspacesHyprland />}
      {/* {wn == "Sway" && <WorkspacesSway />} */}

      {/* <Mpris></Mpris> */}

      {/* <WorkspacesSway /> */}

      <Separator />
    </box>
  )
}
