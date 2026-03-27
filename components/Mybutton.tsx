export default function MyButton({ label }: { label: string }) {
  return (
    <button onClicked={(self) => console.log(self, "clicked")}>{label}</button>
  )
}
