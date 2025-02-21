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
import { Input } from "@/components/ui/input";
import TodoCard from "@/components/TodoCard";
import axios from "axios";

const Todos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axios.get("http://localhost:3000/todolist");
        setData(response.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchTodo();
  }, []);

  return (
    <div>
      <Card className="w-[750px] bg-gradient-to-r from-blue-500 to-indigo-600">
        <CardHeader>
          <CardTitle>To do's </CardTitle>
          <CardDescription className="text-black">Here are the of you to do's</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-5 items-center">
            {data.map((todo, index) => (
              <TodoCard key={index} data={todo} />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>
    </div>
  );
};

export default Todos;