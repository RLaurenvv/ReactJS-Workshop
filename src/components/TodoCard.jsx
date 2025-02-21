import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const TodoCard = ({ data }) => {
  return (
    <div>
      <Card className="w-[700px] p-2">
        {" "}
        {/* Reduced padding on the entire card */}
        <CardHeader className="p-1">
          {" "}
          {/* Reduced padding in CardHeader */}
          <CardTitle className="text-xl font-semibold font-sans">
            <Link to={`todo/${data.id}`}>{data.title}</Link>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-between p-1">
          <div className="flex flex-row gap-2 items-center">
            <span className="text-m text-gray-500 font-thin">{data.date}</span>{" "}
            <p className="text-m text-gray-500 font-thin">{data.description}</p>{" "}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TodoCard;
