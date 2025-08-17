import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function CardDemo() {
  return (
    <div className="flex items-center justify-center h-screen">
    <Card className="w-full max-w-sm flex">
      <CardHeader>
        <CardTitle>Element Library</CardTitle>
        <CardDescription>
          Select the components that you want in your form
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full my-1">
          Text based input fields
        </Button>
        <Button variant="outline" className="w-full my-1">
          Checkboxes
        </Button>
        <Button variant="outline" className="w-full my-1">
          Multiselect
        </Button>
        <Button variant="outline" className="w-full my-1">
          Rating Fields
        </Button>
      </CardContent>
    </Card>
    </div>
  )
}
