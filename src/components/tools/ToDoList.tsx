"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ListTodo, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { trackToolUsage } from "@/lib/stats";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export function ToDoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo = { id: Date.now().toString(), text: input, completed: false };
    setTodos([...todos, newTodo]);
    setInput("");
    trackToolUsage("todo-list");
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border shadow-none bg-background">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-secondary" />
                Quick Tasks
              </CardTitle>
              <CardDescription>Simple, session-based task tracker.</CardDescription>
            </div>
            {todos.length > 0 && (
              <div className="text-xs font-bold bg-secondary/10 text-secondary px-3 py-1 rounded-full">
                {completedCount} / {todos.length} Done
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-2">
            <Input 
              placeholder="What needs to be done?" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              className="h-12 bg-background"
            />
            <Button onClick={addTodo} className="h-12 w-12" size="icon">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-2">
            {todos.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-2xl text-muted-foreground opacity-50">
                <ListTodo className="w-12 h-12 mx-auto mb-2" />
                <p>Your task list is empty</p>
              </div>
            ) : (
              todos.map(todo => (
                <div key={todo.id} className="flex items-center gap-3 p-4 bg-muted/30 rounded-xl border group">
                  <Checkbox 
                    checked={todo.completed} 
                    onCheckedChange={() => toggleTodo(todo.id)} 
                  />
                  <span className={`flex-1 text-sm font-medium ${todo.completed ? 'line-through text-muted-foreground' : 'text-primary'}`}>
                    {todo.text}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}