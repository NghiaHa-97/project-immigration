package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.AuthenticationCommon;
import com.nghiahd.server.common.ExceptionApiCustom;
import com.nghiahd.server.domain.Comment;
import com.nghiahd.server.model.CommentDTO;
import com.nghiahd.server.model.UserLogin;
import com.nghiahd.server.repository.CommentRepository;
import com.nghiahd.server.service.CommentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public CommentDTO save(Comment cm) throws ExceptionApiCustom {
        UserLogin userLogin = AuthenticationCommon.getUserLoginContext();
        if (userLogin.getWorkUnitID() == null) {
            throw new ExceptionApiCustom(ApiResponseCode.WORK_UNIT_NULL);
        }
        int count = this.commentRepository.checkExistCommentWithWorkUnitAndProfileID(cm.getProfileID(), userLogin.getWorkUnitID());
        if (count > 0) {
            throw new ExceptionApiCustom(ApiResponseCode.COMMENT_EXIST);
        }
        cm.setId(UUID.randomUUID());
        cm.setEmployeeID(userLogin.getEmployeeID());
        Comment comment = this.commentRepository.saveAndFlush(cm);
        return this.commentRepository.getDetailCommentByID(comment.getId());
    }

    @Override
    public CommentDTO getDetailCommentByProfileIDAndEmployeeID(UUID employeeID,
                                                               UUID profileID) {
        return this.commentRepository.getDetailCommentByProfileIDAndEmployeeID(employeeID, profileID);
    }

    @Override
    public List<CommentDTO> getAllCommentByProfileID(UUID profileID) {
        return this.commentRepository.getAllCommentByProfileID(profileID);
    }

    @Override
    public CommentDTO getDetailCommentByID(UUID id) {
        return this.commentRepository.getDetailCommentByID(id);
    }
}
