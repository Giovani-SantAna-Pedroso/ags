import { Gtk } from "ags/gtk4"
import { createState } from "gnim"
import { execAsync } from "ags/process"

const actions = [
  "[L]og Out",
  "[S]creen Off",
  "L[o]ck",
  "S[l]eep",
  "[R]eboot",
  "[T]urn Off",
]

export default function () {
  const columns = 2
  const [option, setOption] = createState("")

  const notify = (msg: string) => {
    execAsync(["notify-send", msg])
  }

  return (
    <box
      class={"container-categories"}
      orientation={Gtk.Orientation.VERTICAL}
      spacing={8}
    >
      <button halign={Gtk.Align.START} class={"btn-cat"}>
        [S]ystem
      </button>

      {/* ✅ Confirmation UI */}
      {option() != "" && (
        <box orientation={Gtk.Orientation.VERTICAL} spacing={6}>
          <label label={"ARE YOU SURE?"} />
          <label label={option} />

          <box spacing={6}>
            <button
              onClicked={() => {
                notify(`Confirmed: ${option()}`)
                setOption("") // reset
              }}
            >
              YES
            </button>

            <button
              onClicked={() => {
                setOption("") // cancel
              }}
            >
              NO
            </button>
          </box>
        </box>
      )}

      {/* ✅ Actions grid (hidden when option selected) */}
      {option() === "" &&
        Array.from(
          { length: Math.ceil(actions.length / columns) },
          (_, rowIndex) => (
            <box
              orientation={Gtk.Orientation.HORIZONTAL}
              spacing={8}
              homogeneous
            >
              {actions
                .slice(rowIndex * columns, (rowIndex + 1) * columns)
                .map((label) => (
                  <button
                    class={"btn-system"}
                    hexpand
                    onClicked={() => {
                      console.log(label, "pressed")
                      setOption(label) // 🔥 trigger confirmation
                      console.log(option(), "pressed")
                    }}
                  >
                    {label}
                  </button>
                ))}
            </box>
          ),
        )}
    </box>
  )
}
