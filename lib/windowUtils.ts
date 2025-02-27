import { toast } from "sonner"

const copyCurrentWindowUrl = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      toast.success("URL copied to clipboard!", {
        duration: 1500,
      })
    })
    .catch((err) => console.error("Failed to copy URL: ", err))
}

export { copyCurrentWindowUrl }