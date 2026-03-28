package com.todo.advancetodo.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.todo.advancetodo.entity.Todo;
import com.todo.advancetodo.values.ToDoStatus;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    List<Todo> findByIsDeletedFalseOrderByPositionAsc();

    List<Todo> findByStatusAndIsDeletedFalseOrderByPositionAsc(ToDoStatus status);

    List<Todo> findByCategoryIdAndIsDeletedFalse(Long categoryId);

    List<Todo> findByDueDateBeforeAndIsDeletedFalse(LocalDateTime date);

    List<Todo> findByIsDeletedTrue();

    List<Todo> findByIsDeletedFalse();

    Long countByCategoryId(Long id);

    Long countByCategoryName(String categoryName);

    // 1. Make space in the target column by shifting tasks at/after the new
    // position UP
    @Modifying
    @Query("UPDATE Todo t SET t.position = t.position + 1 " +
            "WHERE t.status = :status AND t.position >= :position AND t.isDeleted = false")
    void incrementPositions(@Param("status") ToDoStatus status, @Param("position") Long position);

    // 2. Close the gap in the source column by shifting tasks after the old
    // position DOWN
    @Modifying
    @Query("UPDATE Todo t SET t.position = t.position - 1 " +
            "WHERE t.status = :status AND t.position > :position AND t.isDeleted = false")
    void decrementPositions(@Param("status") ToDoStatus status, @Param("position") Long position);

    // 3. Special case: Shifting a range within the SAME column (Moving DOWN)
    @Modifying
    @Query("UPDATE Todo t SET t.position = t.position - 1 " +
            "WHERE t.status = :status AND t.position > :oldPos AND t.position <= :newPos")
    void shiftRangeDown(@Param("status") ToDoStatus status, @Param("oldPos") Long oldPos, @Param("newPos") Long newPos);

    // 4. Special case: Shifting a range within the SAME column (Moving UP)
    @Modifying
    @Query("UPDATE Todo t SET t.position = t.position + 1 " +
            "WHERE t.status = :status AND t.position >= :newPos AND t.position < :oldPos")
    void shiftRangeUp(@Param("status") ToDoStatus status, @Param("oldPos") Long oldPos, @Param("newPos") Long newPos);

    Long countByStatus(ToDoStatus status);
}
