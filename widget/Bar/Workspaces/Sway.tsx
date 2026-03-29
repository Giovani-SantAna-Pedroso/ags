import { createState, For, Accessor } from "ags"
import { execAsync, subprocess } from "ags/process"
import Separator from "../../../components/Separator"

const [workspaces, setWorkspaces] = createState<
  { name: string; output: string; visible: boolean }[]
>([])
const [monitors, setMonitors] = createState<string[]>([])

async function update() {
  const out = await execAsync(["swaymsg", "-t", "get_workspaces", "-r"])

  const x = getWorkspaces(out)

  // console.log(x)
  setWorkspaces(x.workspaces)
  setMonitors(x.monitors)
  subprocess(["swaymsg", "-t", "subscribe", '["workspace"]'], () => update())
}

update()

function getWorkspaces(wsString: string) {
  const wsJson = JSON.parse(wsString)
  const map = []
  const monitors = new Set()

  for (const ws of wsJson) {
    map.push({ name: ws.name, output: ws.output, visible: ws.visible })
    if (ws.output) monitors.add(ws.output)
  }

  return {
    monitors: [...monitors],
    workspaces: map,
  }
}

// component
export default function WorkspacesSway() {
  return (
    <box class={"workspaces-container"}>
      <For each={monitors}>
        {(monitor, index) => (
          <box class={""}>
            <Separator />
            <For each={workspaces}>
              {(workspace: {
                name: string
                output: string
                visible: boolean
              }) => {
                if (workspace.output === monitor) {
                  return (
                    <button
                      class={"btn-workspace"}
                      css={`
                        margin: 0px 8px;
                        ${!workspace.visible && "color:#4a4A4A;"}
                      `}
                      onClicked={() =>
                        execAsync(["swaymsg", "workspace", workspace.name])
                      }
                    >{`${workspace.name}`}</button>
                  )
                }
                // return { workspace.output === monitors && <label label={workspaces}/> }
                return <label label={""} />
              }}
            </For>
          </box>
        )}
      </For>
    </box>
  )
}
