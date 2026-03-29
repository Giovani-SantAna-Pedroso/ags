import Separator from "../../../components/Separator"
import WorkspacesHyprland from "../Workspaces/Hyprland.tsx.bak"
import WorkspacesSway from "../Workspaces/Sway"

export default function BarLeft() {
  return (
    <box class={"bar-left"}>
      <button onClicked={() => console.log("button menu")} class={"menu-btn"}>
        [Super]
      </button>
      <WorkspacesSway />

      <Separator />

      {/* <Workspaces /> */}
    </box>
  )
}
