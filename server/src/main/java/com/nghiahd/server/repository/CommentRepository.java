package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID>, CommentRepositoryCustom {
    @Query(value = "select count(1) " +
            "    from Comment c " +
            "    inner join Employee e on e.ID = c.EmployeeID " +
            "    inner join Profile p on p.ID = c.ProfileID and p.ID = ?1" +
            "    inner join WorkUnit wu on e.WorkUnitID = wu.ID and wu.id = ?2 ", nativeQuery = true)
    int checkExistCommentWithWorkUnitAndProfileID(UUID profileID ,int workUnitID);
}
