package com.todo.advancetodo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.todo.advancetodo.DTO.TodoDTOs.TodoMoveDTO;
import com.todo.advancetodo.DTO.TodoDTOs.TodoRequestDTO;
import com.todo.advancetodo.DTO.TodoDTOs.TodoResponseDTO;
import com.todo.advancetodo.entity.Todo;
import com.todo.advancetodo.service.TodoService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @PostMapping
    public Todo addTodo(@RequestBody TodoRequestDTO todo){
        System.err.println(todo.toString());
        return todoService.addTodo(todo);
    }

    @GetMapping
    public List<TodoResponseDTO> getAllTodos(){
        return todoService.getAllTodos();
    }

    @GetMapping("/get-all-deleted-todos")
    public List<TodoResponseDTO> getAllSoftDeletedTodos(){
        return todoService.getAllSoftDeletedTodos();
    }

    @DeleteMapping("/delete")
    public void softDeleteTask(@RequestParam long id){
        todoService.softDelete(id);
    }

    @PatchMapping("/restore/{id}")
    public void restoreTodo(@PathVariable long id){
        todoService.TodoRestore(id);
    }

    @DeleteMapping("/hard-delete")
    public void hardDeleteTask(@RequestParam long id){
        todoService.softDelete(id);
    }

    @PatchMapping("/update")
    public TodoResponseDTO editTodo(@RequestBody Todo todo){
        return todoService.updateTodo(todo);
    }

    @PutMapping("/{id}/move")
    public void moveTask(@PathVariable long id, @RequestBody TodoMoveDTO dto) {
        todoService.moveTask(id, dto.getStatus(), dto.getPosition());
    }

    @PatchMapping("/patch/{id}")
    public void restoreTask(@PathVariable Long id){
        todoService.TodoRestore(id);
    }
}
