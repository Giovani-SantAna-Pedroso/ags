import app from "ags/gtk4/app"
import { Astal, Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import MyButton from "./components/Mybutton"
import Counter from "./stateExample"

function Bar(monitor = 0) {
  const date = createPoll("", 1000, `bash -c "date +%H:%M"`)
  return (
    <window visible class="Bar" monitor={monitor}>
      <box
        orientation={Gtk.Orientation.VERTICAL}
        css="display:flex; flex-direction:column"
      >
        Content of the widget
        <MyButton label={"button for the monitor " + monitor} />
        <Counter />
        <label label={date} />
      </box>
    </window>
  )
}

app.start({
  main() {
    Bar(0)
    Bar(1)
  },
})
