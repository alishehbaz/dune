'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState } from "react"


/* TODO:
- add multiselect
- add dynamic labels
- add reordering
- separate component keys for each component
*/


export default function CardDemo() {
  const [fields, setFields] = useState<JSX.Element>([])

  function addTextField() {
    setFields(prev => [
      ...prev,
      <Input
        key={prev.length}
        placeholder={`Text field ${prev.length + 1}`}
        className="my-2"
      />
    ])
  }

  function addCheckbox() {
    setFields(prev => [
      ...prev,
      <div key={prev.length} className="flex items-center space-x-2 my-2">
        <input type="checkbox" id={`checkbox-${prev.length}`} />
        <label htmlFor={`checkbox-${prev.length}`}>Checkbox {prev.length + 1}</label>
      </div>
    ])
  }

  function addSelect() {
    setFields(prev => [
      ...prev,
      <div key={prev.length} className="my-2">
        <label className="block mb-1">Select {prev.length + 1}</label>
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose an option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ])
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {/* Left card - element library */}
      <Card className="w-full max-w-sm flex mx-2">
        <CardHeader>
          <CardTitle>Element Library</CardTitle>
          <CardDescription>
            Select the components that you want in your form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            className="w-full my-1" 
            onClick={addTextField}
          >
            Text based input fields
          </Button>
          <Button 
            variant="outline" 
            className="w-full my-1" 
            onClick={addCheckbox}
          >
            Checkboxes
          </Button>
          <Button 
            variant="outline" 
            className="w-full my-1" 
            onClick={addSelect}
          >
            Multiselect
          </Button>
          <Button variant="outline" className="w-full my-1">
            Rating Fields
          </Button>
        </CardContent>
      </Card>

      {/* Right card - generated form */}
      <Card className="w-full max-w-sm flex">
        <CardHeader>
          <CardTitle>Your Form</CardTitle>
          <CardDescription>
            These are the elements in your current form
          </CardDescription>
        </CardHeader>
        <CardContent>
          {fields}
        </CardContent>
      </Card>
    </div>
  )
}
