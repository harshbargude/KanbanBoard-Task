package com.todo.advancetodo.controller;

import java.util.List;
import java.util.Locale.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.advancetodo.DTO.CategoryDTOs.CategoryRequestDTO;
import com.todo.advancetodo.DTO.CategoryDTOs.CategoryResponseDTO;
import com.todo.advancetodo.service.CategoryService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/category")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/create")
    public CategoryResponseDTO createCategory(@RequestBody CategoryRequestDTO category){
        return categoryService.createCategory(category);
    }


    @GetMapping("/get-all")
    public List<CategoryResponseDTO>getAllCategories() {
        return categoryService.getAllCategories();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategory(@PathVariable long id){
        categoryService.deleteCategory(id);
    }
}
