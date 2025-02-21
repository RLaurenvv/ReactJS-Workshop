import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const id = Math.floor(Math.random() * 10); // Random id for simplicity

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/todolist", {
        id: id.toString(),
        title,
        description,
        date,
      });

      navigate("/"); // Navigate back to the list page after adding
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[750px] bg-white shadow-lg rounded-lg">
        <CardHeader className="py-2"> {/* Reduced padding above the title */} 
          <CardTitle className="text-xl font-semibold">Add To Do</CardTitle>
          <CardDescription className="text-sm">Fill all fields to add a to do item</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col py-5 gap-y-5 w-full">
          <div className="gap-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>

          <div className="gap-y-2">
            <Label>To Do Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>

          <div className="gap-y-2">
            <Label>Date</Label>
            <Input
              type="date" // This turns the input into a date picker
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white text-lg"
          >
            Add To Do
          </Button>
        </CardContent>

        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default AddTodo;
