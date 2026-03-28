package com.todo.advancetodo.DTO;

import java.time.LocalDateTime;
import java.util.List;

import com.todo.advancetodo.values.ToDoStatus;

import lombok.Data;

public class TodoDTOs {

    @Data
    public static class TodoRequestDTO {
        private String title;
        private String description;
        private ToDoStatus status;
        private LocalDateTime dueDate;
        private String categoryName;
    }

    @Data
    public static class TodoResponseDTO {
        private Long id;
        private String title;
        private String description;
        private LocalDateTime dueDate;
        private ToDoStatus status;
        private Long position;
        private Boolean isDeleted;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private String categoryName;
        private String categoryColor;
    }

    @Data
    public static class TodoMoveDTO {
        private ToDoStatus status;
        private Long position;
    }

    @Data
    public static class TodoReorderDTO {
        private List<Long> listOfIds;
    }
}
