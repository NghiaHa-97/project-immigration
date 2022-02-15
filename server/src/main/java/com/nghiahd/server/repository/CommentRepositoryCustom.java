package com.nghiahd.server.repository;

import com.nghiahd.server.model.CommentDTO;

import java.util.List;
import java.util.UUID;

public interface CommentRepositoryCustom {
    CommentDTO getDetailCommentByProfileIDAndEmployeeID(UUID employeeID, UUID profileID);
    List<CommentDTO> getAllCommentByProfileID(UUID profileID);
    CommentDTO getDetailCommentByID(UUID id);
}
