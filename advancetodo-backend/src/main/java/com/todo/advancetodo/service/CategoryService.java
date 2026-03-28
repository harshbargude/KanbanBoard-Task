package com.todo.advancetodo.service;

import java.util.List;

import com.todo.advancetodo.DTO.CategoryDTOs.CategoryRequestDTO;
import com.todo.advancetodo.DTO.CategoryDTOs.CategoryResponseDTO;

public interface CategoryService {
    CategoryResponseDTO createCategory(CategoryRequestDTO category);
    List<CategoryResponseDTO> getAllCategories(); 
    void deleteCategory(Long id);
}
