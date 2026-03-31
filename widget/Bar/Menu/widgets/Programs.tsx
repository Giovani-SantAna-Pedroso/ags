import { Gtk } from "ags/gtk4"
import Apps from "gi://AstalApps"
import { createState } from "ags"

export default function () {
  const apps = new Apps.Apps()

  for (const app of apps.fuzzy_query("firefox")) {
    print(app.name)
  }
  const [programName, setProgramName] = createState("")
  return (
    <box
      halign={Gtk.Align.FILL}
      class={"programs"}
      hexpand
      orientation={Gtk.Orientation.VERTICAL}
      // class={"container-categories"}
    >
      <button
        halign={Gtk.Align.START}
        onClicked={() => console.log("Programs pressed")}
        class="btn-cat"
      >
        [P]rograms
      </button>
      <entry
        placeholderText="Program name..."
        text={programName}
        onNotifyText={({ text }) => setProgramName(text)}
      />
      <box orientation={Gtk.Orientation.VERTICAL}>
        <button class={"button-program"} halign={Gtk.Align.FILL}>
          <label halign={Gtk.Align.START} label={"[1] Firefox"}></label>
        </button>
        <button class={"button-program"} halign={Gtk.Align.FILL}>
          <label halign={Gtk.Align.START} label={"[1] Firefox"}></label>
        </button>
        <button class={"button-program"} halign={Gtk.Align.FILL}>
          <label halign={Gtk.Align.START} label={"[1] Firefox"}></label>
        </button>
        <button class={"button-program"} halign={Gtk.Align.FILL}>
          <label halign={Gtk.Align.START} label={"[1] Firefox"}></label>
        </button>
      </box>
      <centerbox orientation={Gtk.Orientation.HORIZONTAL}>
        <box $type="start">[9]Previous page</box>
        <box $type="end">[0]Next page</box>
      </centerbox>
    </box>
  )
}
