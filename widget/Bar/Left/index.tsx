import Separator from "../../../components/Separator"
import Mpris from "../Mpris"
import WorkspacesHyprland from "../../Workspaces/Hyprland.tsx.bak"
import WorkspacesSway from "../../Workspaces/Sway"

export default function BarLeft({
  handleIsMenuOpen,
}: {
  handleIsMenuOpen: any
}) {
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

      {/* <Mpris></Mpris> */}

      <WorkspacesSway />

      <Separator />
    </box>
  )
}
