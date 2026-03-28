package com.todo.advancetodo.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

public class CategoryDTOs {

    @Data
    @Getter
    @Setter
    public static class CategoryRequestDTO {
        private String name;
        private String color;
        private String description;
    }

    @Data
    public static class CategoryResponseDTO {
        private Long id;
        private String name;
        private String color;
        private String description;
    }

}
