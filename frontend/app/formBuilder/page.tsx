"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { useState } from "react";

/* TODO:
 - add reordering 
 - separate component keys for each component */

type Field = {
  id: string;
  type: "text" | "checkbox" | "select" | "rating";
  label: string;
};

export default function CardDemo() {
  const [fields, setFields] = useState<Field[]>([]);

  function addField(type: Field["type"]) {
    setFields((prev) => [
      ...prev,
      {
        id: `${type}-${prev.length + 1}`, // unique id
        type,
        label: `${capitalize(type)} ${prev.length + 1}`,
      },
    ]);
  }

  function renderField(field: Field) {
    switch (field.type) {
      case "text":
        return (
          <Input key={field.id} placeholder={field.label} className="my-2" />
        );
      case "checkbox":
        return (
          <Label
            key={field.id}
            htmlFor={field.id}
            className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3
                       has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50
                       dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
          >
            <Checkbox
              id={field.id}
              className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600
                         data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700
                         dark:data-[state=checked]:bg-blue-700"
            />
            <div className="grid gap-1.5 font-normal">
              <p className="text-sm leading-none font-medium">{field.label}</p>
              <p className="text-muted-foreground text-sm">
                Additional description can go here.
              </p>
            </div>
          </Label>
        );
      case "select":
        return (
          <div key={field.id} className="my-2">
            <label className="block mb-1">{field.label}</label>
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
        );
      case "rating":
        return (
          <div key={field.id} className="my-2">
            <label className="block mb-1">{field.label}</label>
            <Rating defaultValue={0}>
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton key={index} />
              ))}
            </Rating>
          </div>
        );
      default:
        return null;
    }
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
            onClick={() => addField("text")}
          >
            Text based input fields
          </Button>
          <Button
            variant="outline"
            className="w-full my-1"
            onClick={() => addField("checkbox")}
          >
            Checkboxes
          </Button>
          <Button
            variant="outline"
            className="w-full my-1"
            onClick={() => addField("select")}
          >
            Multiselect
          </Button>
          <Button
            variant="outline"
            className="w-full my-1"
            onClick={() => addField("rating")}
          >
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
        <CardContent>{fields.map(renderField)}</CardContent>
      </Card>
    </div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
