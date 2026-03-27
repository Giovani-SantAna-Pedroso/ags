import app from "ags/gtk4/app"
import { Astal } from "ags/gtk4"
import { createPoll } from "ags/time"

function Bar(monitor = 0) {
  return (
    <window visible class="Bar" monitor={monitor}>
      <box>Content of the widget</box>
    </window>
  )
}

app.start({
  main() {
    Bar(0)
    Bar(1) // instantiate for each monitor
  },
})
