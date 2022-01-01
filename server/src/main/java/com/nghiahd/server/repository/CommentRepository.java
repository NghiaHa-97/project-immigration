package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID>, CommentRepositoryCustom {
}
