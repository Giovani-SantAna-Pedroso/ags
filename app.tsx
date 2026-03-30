import { createBinding, createState, For, This } from "ags"
import style from "./style.scss"
import app from "ags/gtk4/app"
import Bar from "./widget/Bar/"
import Menu from "./widget/Bar/Menu"

app.start({
  css: style,

  main() {
    const monitors = createBinding(app, "monitors")
    const [isMenuOpen, setIsMenuOpen] = createState(true)

    return (
      <For each={monitors}>
        {(monitor) => (
          <This this={app}>
            <Bar handleIsMenuOpen={setIsMenuOpen} gdkmonitor={monitor} />
            {/* {isMenuOpen && <Menu />} */}
          </This>
        )}
      </For>
    )
  },
})
