package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.Comment;
import com.nghiahd.server.model.CommentDTO;
import com.nghiahd.server.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "api/public/comment")
public class CommentController {
    private final CommentService commentService;
    private final MessageUtils messageUtils;


    public CommentController(CommentService commentService,
                             MessageUtils messageUtils) {
        this.commentService = commentService;
        this.messageUtils = messageUtils;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<BodyResponseDTO<CommentDTO>> createComment(@RequestBody Comment req) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        CommentDTO commentDTO = null;
        try {
            commentDTO = this.commentService.save(req);
            if (commentDTO == null) {
               throw new ExceptionApiCustom(ApiResponseCode.SAVE_FAILED);
            }
        } catch (ExceptionApiCustom ex) {
            apiResponseCode = ex.getRestError();
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                commentDTO);
    }

    @GetMapping(value = "/get-all/profile-id")
    public ResponseEntity<BodyResponseDTO<List<CommentDTO>>> getAllCommentByProfileID(@RequestParam UUID profileID) {

        List<CommentDTO> dto = this.commentService.getAllCommentByProfileID(profileID);
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                dto);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<CommentDTO>> getDetailByID(@PathVariable UUID id) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        CommentDTO commentDTO = this.commentService.getDetailCommentByID(id);

        if (commentDTO == null) {
            apiResponseCode = ApiResponseCode.NOT_FOUND;
        }
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                commentDTO);
    }

    @GetMapping(value = "/detail/by-profile-and-employee")
    public ResponseEntity<BodyResponseDTO<CommentDTO>> getDetailByProfileIDAndEmployeeID(@RequestParam UUID profileID,
                                                                                         @RequestParam UUID employeeID) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        CommentDTO commentDTO = this.commentService.getDetailCommentByProfileIDAndEmployeeID(employeeID, profileID);

        if (commentDTO == null) {
            apiResponseCode = ApiResponseCode.NOT_FOUND;
        }
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                commentDTO);
    }

}
