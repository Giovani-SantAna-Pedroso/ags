//
import Separator from "../../components/Separator"
import { createSubprocess, execAsync, subprocess } from "ags/process"
import { createState, For, With } from "ags"
// import Separator from "../../components/Separator"

type Workspace = {
  name: string
  output: string
  visible: boolean
}

const workspaces = createSubprocess<Workspace[]>(
  [],
  ["swaymsg", "-m", "-r", "-t", "subscribe", '["workspace"]'],
  async (stdout, prev: Workspace[]) => {
    const ws = await getWorkspaces()
    console.log(ws)
    return ws
  },
)
//
// const monitors = createSubprocess<string[]>(
//   [],
//   ["swaymsg", "-m", "-r", "-t", "subscribe", '["workspace"]'],
//   (stdout, prev: Workspace[]) => {
//     const wsJson = JSON.parse(stdout)
//     console.log(wsJson)
//
//     const map = []
//
//     for (const ws of wsJson) {
//       map.push({ name: ws.name, output: ws.output, visible: ws.visible })
//       if (ws.output) monitors.add(ws.output)
//     }
//
//     console.log("--monitors--:", monitors)
//     return [...monitors]
//   },
// )
//
// // component
// export default function WorkspacesSway() {
//   return (
//     <box class="workspaces-container">
//       <For each={monitors}>
//         {(monitor) => (
//           <box>
//             <For each={workspaces}>
//               {({ output, name, visible }) =>
//                 output === monitor ? (
//                   <button
//                     class="btn-workspace"
//                     css={`
//                       margin: 0px 8px;
//                       ${visible ? "color:#4a4A4A;" : ""}
//                     `}
//                     onClicked={() => execAsync(["swaymsg", "workspace", name])}
//                   >
//                     {name}
//                   </button>
//                 ) : (
//                   <label />
//                 )
//               }
//             </For>
//           </box>
//         )}
//       </For>
//     </box>
//   )
// }

async function getWorkspaces(): Promise<Workspace[]> {
  const workspacesRaw = JSON.parse(
    await execAsync(["swaymsg", "-t", "get_workspaces", "-r"]),
  )
  const workspaces: Workspace[] = []

  for (const i of workspacesRaw) {
    workspaces.push({ name: i.name, output: i.output, visible: i.visible })
  }

  return workspaces
}

async function getMonitors(): Promise<string[]> {
  const out = JSON.parse(
    await execAsync(["swaymsg", "-t", "get_outputs", "-r"]),
  )
  return out.map((monitor: { name: string }) => monitor.name)
}

const [monitors, setMonitors] = createState<string[]>(await getMonitors())
// const [workspaces, setWorkspaces] = createState<
//   { name: string; output: string; visible: boolean }[]
// >(await getWorkspaces())

// component
export default function Workspaces() {
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
