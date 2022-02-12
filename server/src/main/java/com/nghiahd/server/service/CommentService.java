package com.nghiahd.server.service;

import com.nghiahd.server.domain.Comment;
import com.nghiahd.server.model.CommentDTO;

import java.util.List;
import java.util.UUID;

public interface CommentService {
    CommentDTO save(Comment cm);
    CommentDTO getDetailCommentByProfileIDAndEmployeeID(UUID employeeID, UUID profileID);
    List<CommentDTO> getAllCommentByProfileID(UUID profileID);
    CommentDTO getDetailCommentByID(UUID id);
}
