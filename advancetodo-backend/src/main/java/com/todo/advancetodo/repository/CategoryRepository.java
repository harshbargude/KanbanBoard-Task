package com.todo.advancetodo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.advancetodo.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{
    List<Category> findByIsDeletedFalse();
    boolean existsByName(String name);
    List<Category> findByName(String name);
    Long countByNameAndIsDeletedFalse(String category);
    Long findIdByName(String name);
}
