package com.todo.advancetodo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.apache.commons.logging.LogFactoryService;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.advancetodo.DTO.TodoDTOs.TodoRequestDTO;
import com.todo.advancetodo.DTO.TodoDTOs.TodoResponseDTO;
import com.todo.advancetodo.entity.Category;
import com.todo.advancetodo.entity.Todo;
import com.todo.advancetodo.repository.CategoryRepository;
import com.todo.advancetodo.repository.TodoRepository;
import com.todo.advancetodo.values.ToDoStatus;

import jakarta.transaction.Transactional;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoRepository theTodoRepository;
    @Autowired
    private CategoryRepository theCategoryRepository;

    @Override
    public Todo addTodo(TodoRequestDTO todo) {
        Todo newTodo = new Todo();
        newTodo.setTitle(todo.getTitle());
        newTodo.setDescription(todo.getDescription());
        newTodo.setDueDate(todo.getDueDate());
        newTodo.setStatus(ToDoStatus.TODO);
        newTodo.setPosition(getCountOfTodosInCategory(todo.getCategoryName().toLowerCase()));
        newTodo.setIsDeleted(false);
        newTodo.setCreatedAt(LocalDateTime.now());
        newTodo.setUpdatedAt(LocalDateTime.now());
        List<Category> category = theCategoryRepository.findByName(todo.getCategoryName().toLowerCase());
        Category theCat = category.getFirst();
        if (category != null)
            newTodo.setCategory(theCat);
        return theTodoRepository.save(newTodo);
    }

    @Override
    public TodoResponseDTO updateTodo(Todo todo) {

        Optional<Todo> thetodo = theTodoRepository.findById(todo.getId());
        if (thetodo.isPresent()) {
            Todo upTD = thetodo.get();
            upTD.setTitle(todo.getTitle());
            upTD.setDescription(todo.getDescription());
            upTD.setStatus(todo.getStatus());
            upTD.setUpdatedAt(LocalDateTime.now());
            upTD.setDueDate(todo.getDueDate());

            Todo savedTodo = theTodoRepository.save(upTD);

            TodoResponseDTO dto = new TodoResponseDTO();
            dto.setId(savedTodo.getId());
            dto.setTitle(savedTodo.getTitle());
            dto.setDescription(savedTodo.getDescription());
            dto.setStatus(savedTodo.getStatus());
            dto.setUpdatedAt(savedTodo.getUpdatedAt());
            dto.setDueDate(savedTodo.getDueDate());
            if (savedTodo.getCategory() != null) {
                dto.setCategoryName(savedTodo.getCategory().getName());
                dto.setCategoryColor(savedTodo.getCategory().getColor());
            }
            return dto;
        }

        throw new RuntimeException("Todo not found with id: " + todo.getId());
    }

    @Override
    public void softDelete(Long todoId) {

        Optional<Todo> todo = theTodoRepository.findById(todoId);
        Todo theTodo = todo.get();
        if (theTodo != null) {
            theTodo.setIsDeleted(true);
        }
        theTodoRepository.save(theTodo);
    }

    @Override
    public Todo TodoRestore(Long todoId) {
        Optional<Todo> todo = theTodoRepository.findById(todoId);
        Todo theTodo = todo.get();
        if (theTodo != null) {
            theTodo.setIsDeleted(false);
        }
        return theTodoRepository.save(theTodo);
    }

    @Override
    public List<TodoResponseDTO> getAllTodos() {
        List<Todo> allTodos = theTodoRepository.findByIsDeletedFalse();

        return allTodos.stream().map(todo -> {
            TodoResponseDTO dto = new TodoResponseDTO();
            dto.setId(todo.getId());
            dto.setTitle(todo.getTitle());
            dto.setDescription(todo.getDescription());
            dto.setDueDate(todo.getDueDate());
            dto.setCreatedAt(todo.getCreatedAt());
            dto.setIsDeleted(todo.getIsDeleted());
            dto.setPosition(todo.getPosition());
            dto.setStatus(todo.getStatus());
            dto.setUpdatedAt(todo.getUpdatedAt());
            if (todo.getCategory() != null) {
                dto.setCategoryName(todo.getCategory().getName());
                dto.setCategoryColor(todo.getCategory().getColor());
            }

            return dto;
        }).toList();
    }

    public Long getCountOfTodosInCategory(String category) {
        return theTodoRepository.countByCategoryName(category);
    }

    @Transactional
    @Override
    public void moveTask(Long TodoId, ToDoStatus targetStatus, Long targetPosition) {
        Todo task = theTodoRepository.findById(TodoId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        ToDoStatus sourceStatus = task.getStatus();
        Long sourcePosition = task.getPosition();

        if (sourceStatus == targetStatus) {
            // CASE A: Moving within the same column
            if (sourcePosition < targetPosition) {
                theTodoRepository.shiftRangeDown(sourceStatus, sourcePosition, targetPosition);
            } else if (sourcePosition > targetPosition) {
                theTodoRepository.shiftRangeUp(sourceStatus, sourcePosition, targetPosition);
            }
        } else {
            // CASE B: Moving to a different column
            // 1. Close the gap in the old column
            theTodoRepository.decrementPositions(sourceStatus, sourcePosition);

            // 2. Make room in the new column
            theTodoRepository.incrementPositions(targetStatus, targetPosition);
        }

        // 3. Update the task itself
        task.setStatus(targetStatus);
        task.setPosition(targetPosition);
        task.setUpdatedAt(LocalDateTime.now());
        theTodoRepository.save(task);
    }

    @Override
    public List<TodoResponseDTO> getAllSoftDeletedTodos() {
        List<Todo> SDtodo = theTodoRepository.findByIsDeletedTrue();
        // System.out.println("Harshh" + SDtodo);
        return SDtodo.stream().map(todo -> {
            TodoResponseDTO dto = new TodoResponseDTO();

            dto.setId(todo.getId());
            dto.setTitle(todo.getTitle());
            dto.setDescription(todo.getDescription());
            dto.setDueDate(todo.getDueDate());
            dto.setCreatedAt(todo.getCreatedAt());
            dto.setIsDeleted(todo.getIsDeleted());
            dto.setPosition(todo.getPosition());
            dto.setStatus(todo.getStatus());
            dto.setUpdatedAt(todo.getUpdatedAt());
            if (todo.getCategory() != null) {
                dto.setCategoryName(todo.getCategory().getName());
                dto.setCategoryColor(todo.getCategory().getColor());
            }

            return dto;
        }).toList();
    }

    @Override
    public void hardDelete(Long todoId) {
        Optional<Todo> todo = theTodoRepository.findById(todoId);

        if(todo.isPresent()){
            theTodoRepository.delete(todo.get());
        }

    }

}
