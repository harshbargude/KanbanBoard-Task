package com.todo.advancetodo.service;

import java.util.List;

import com.todo.advancetodo.DTO.TodoDTOs.TodoRequestDTO;
import com.todo.advancetodo.DTO.TodoDTOs.TodoResponseDTO;
import com.todo.advancetodo.entity.Todo;
import com.todo.advancetodo.values.ToDoStatus;

public interface TodoService {
    Todo addTodo(TodoRequestDTO todo);
    TodoResponseDTO updateTodo(Todo todo);
    void softDelete(Long todoId);
    void hardDelete(Long todoId);
    Todo TodoRestore(Long todoId);
    void moveTask(Long TodoId, ToDoStatus targetStatus, Long targetPosition);
    List<TodoResponseDTO> getAllTodos();
    List<TodoResponseDTO> getAllSoftDeletedTodos();
}
