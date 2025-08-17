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
          <div key={field.id} className="flex items-center space-x-2 my-2">
            <input type="checkbox" id={field.id} />
            <label htmlFor={field.id}>{field.label}</label>
          </div>
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
