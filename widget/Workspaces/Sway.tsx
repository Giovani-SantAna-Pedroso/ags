import Separator from "../../components/Separator"
import { createSubprocess, execAsync, exec, subprocess } from "ags/process"
import { createState, For, With } from "ags"

type Workspace = {
  name: string
  output: string
  visible: boolean
}

function getWorkspaces(): Workspace[] {
  const workspacesRaw = JSON.parse(
    exec(["swaymsg", "-t", "get_workspaces", "-r"]),
  )
  const workspaces: Workspace[] = []

  for (const i of workspacesRaw) {
    workspaces.push({ name: i.name, output: i.output, visible: i.visible })
  }

  return workspaces
}

function getMonitors(): string[] {
  const out = JSON.parse(exec(["swaymsg", "-t", "get_outputs", "-r"]))
  return out.map((monitor: { name: string }) => monitor.name)
}

const workspaces = createSubprocess<Workspace[]>(
  getWorkspaces(),
  ["swaymsg", "-m", "-r", "-t", "subscribe", '["workspace"]'],
  (stdout, prev: Workspace[]) => {
    return getWorkspaces()
  },
)

const monitors = createSubprocess<string[]>(
  getMonitors(),
  ["swaymsg", "-m", "-r", "-t", "subscribe", '["output"]'],
  (stdout, prev: string[]) => {
    return getMonitors()
  },
)

export default function Workspaces() {
  console.log(workspaces)
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
