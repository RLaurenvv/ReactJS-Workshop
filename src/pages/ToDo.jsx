import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Todo = () => {
  const [todo, setTodo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: "",
    description: "",
    date: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch the todo item on component mount
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/todolist/${id}`
        );
        setTodo(response.data);
        setUpdatedTodo(response.data); // Set initial data for updating
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodo();
  }, [id]);

  // Handle the delete operation
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/todolist/${id}`);
      navigate("/"); // Navigate back to the todo list after deletion
    } catch (error) {
      console.log(error);
    }
  };

  // Handle form field change for updating
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTodo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the update operation
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/todolist/${id}`, updatedTodo);
      setIsEditing(false); // Exit editing mode after updating
      setTodo(updatedTodo); // Update the todo state with the updated data
    } catch (error) {
      console.log(error);
    }
  };

  if (!todo) return <div>Loading...</div>; // Show loading state if todo is not yet loaded

  return (
    <div className="flex justify-center items-center mt-10">
      <Card className="w-[750px] bg-white shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="flex justify-between">
            <h1>{todo.title}</h1>
            <div className="flex gap-x-3">
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              <Button
                onClick={handleDelete}
                variant="destructive"
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Delete
              </Button>
            </div>
          </CardTitle>
          <CardDescription>{todo.date}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center py-10">
          {isEditing ? (
            <form onSubmit={handleUpdate} className="w-full space-y-4">
              <div>
                <label className="block text-sm">Title</label>
                <input
                  type="text"
                  name="title"
                  value={updatedTodo.title}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm">Description</label>
                <textarea
                  name="description"
                  value={updatedTodo.description}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm">Date</label>
                <input
                  type="date"
                  name="date"
                  value={updatedTodo.date}
                  onChange={handleChange}
                  className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <Button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white w-full"
              >
                Update Todo
              </Button>
            </form>
          ) : (
            <p>{todo.description}</p>
          )}
        </CardContent>

        {/* <CardFooter className="flex justify-between bg-gray-100 p-4 rounded-b-lg">
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default Todo;
