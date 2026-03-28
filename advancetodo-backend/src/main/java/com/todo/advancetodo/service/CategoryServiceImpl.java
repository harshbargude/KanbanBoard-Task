package com.todo.advancetodo.service;

import com.todo.advancetodo.exception.GlobalExceptionHandler;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.advancetodo.DTO.CategoryDTOs.CategoryRequestDTO;
import com.todo.advancetodo.DTO.CategoryDTOs.CategoryResponseDTO;
import com.todo.advancetodo.entity.Category;
import com.todo.advancetodo.exception.ResourceAlreadyExistsException;
import com.todo.advancetodo.repository.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final GlobalExceptionHandler globalExceptionHandler;
    @Autowired
    private CategoryRepository categoryRepository;

    CategoryServiceImpl(GlobalExceptionHandler globalExceptionHandler) {
        this.globalExceptionHandler = globalExceptionHandler;
    }

    @Override
    public CategoryResponseDTO createCategory(CategoryRequestDTO category) {
        Boolean existingCategory = categoryRepository.existsByName(category.getName());

        if (existingCategory) {
            throw new ResourceAlreadyExistsException("Category Exists");
        } else {
            Category newCategory = new Category();

            newCategory.setName(category.getName().toLowerCase());
            newCategory.setDescription(category.getDescription());
            newCategory.setColor(category.getColor());
            newCategory.setIsDeleted(false);
            newCategory.setCreatedAt(LocalDateTime.now());
            newCategory.setUpdatedAt(LocalDateTime.now());

            categoryRepository.save(newCategory);

            CategoryResponseDTO res = new CategoryResponseDTO();

            res.setName(category.getName());
            res.setColor(category.getColor());
            
            res.setDescription(category.getDescription());
            Long id = getCategoryId(category.getName());
            res.setId(id);

            return res;
        }
    }

    private Long getCategoryId(String category) {
        List<Category> cat = categoryRepository.findByName(category);
        Category one = cat.getFirst();
        Long id = one.getId();
        return id;
    }

    @Override
    public List<CategoryResponseDTO> getAllCategories() {

        List<Category> list = categoryRepository.findByIsDeletedFalse();

        return list.stream().map(category ->{
            CategoryResponseDTO dto = new CategoryResponseDTO();
            dto.setId(category.getId());
            dto.setColor(category.getColor());
            dto.setDescription(category.getDescription());
            dto.setName(category.getName());
            return dto;
        }).toList();
    }

    @Override
    public void deleteCategory(Long id) {
        Optional<Category> cat = categoryRepository.findById(id);
        
        if(cat.isPresent()){
            categoryRepository.delete(cat.get());
        }

    }

}
