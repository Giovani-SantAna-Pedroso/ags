import { Gtk } from "ags/gtk4"

export default function () {
  return (
    <box class={"container-categories"} orientation={Gtk.Orientation.VERTICAL}>
      <button halign={Gtk.Align.START} class="btn-cat">
        [T]ools
      </button>
      <button
        halign={Gtk.Align.START}
        class={`btn-sub-cat ${false ? "" : "cat-not-selected-color"}`}
      >
        [A]udio
      </button>
      <button
        halign={Gtk.Align.START}
        class={`btn-sub-cat ${false ? "" : "cat-not-selected-color"}`}
      >
        [B]luetooth
      </button>
      <button
        halign={Gtk.Align.START}
        class={`btn-sub-cat ${false ? "" : "cat-not-selected-color"}`}
      >
        [C]ameras
      </button>
      <button
        halign={Gtk.Align.START}
        class={`btn-sub-cat ${false ? "" : "cat-not-selected-color"}`}
      >
        [M]onitors
      </button>
      <button
        halign={Gtk.Align.START}
        class={`btn-sub-cat ${false ? "" : "cat-not-selected-color"}`}
      >
        [N]etwork
      </button>
    </box>
  )
}
