import { createBinding, createState, For, This } from "ags"
import style from "./style.scss"
import app from "ags/gtk4/app"
import Bar from "./widget/Bar/"
import Menu from "./widget/Bar/Menu"
import { toggleIntegratedAppLauncher } from "./widget/AppLauncher"

app.start({
  css: style,
  requestHandler(argv: string[], response: (response: string) => void) {
    const [cmd, arg, ...rest] = argv
    if (cmd == "say") {
      return response("hello")
    } else if (cmd == "appLauncher") {
      console.log("toggle app launcher")
      toggleIntegratedAppLauncher()
      return response("appLauncher")
    }
    response("unknown command")
  },

  main(...args: Array<string>) {
    const monitors = createBinding(app, "monitors")
    const [isMenuOpen, setIsMenuOpen] = createState(true)

    return (
      <For each={monitors}>
        {(monitor) => (
          <This this={app}>
            <Bar handleIsMenuOpen={setIsMenuOpen} gdkmonitor={monitor} />
            <Menu isMenuOpen={isMenuOpen} />
          </This>
        )}
      </For>
    )
  },
})
