package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.ObjectType;
import com.nghiahd.server.service.ObjectTypeService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(value = "api/public/object-type")
public class ObjectTypeController {
    private final ObjectTypeService objectTypeService;
    private final MessageUtils messageUtils;

    public ObjectTypeController(ObjectTypeService objectTypeService,
                                MessageUtils messageUtils) {
        this.objectTypeService = objectTypeService;
        this.messageUtils = messageUtils;
    }

    @PostMapping(value = "/save",
            consumes = {MediaType.APPLICATION_JSON_VALUE,
                    MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<BodyResponseDTO<ObjectType>> save(
            @RequestPart(value = "file", required = false) MultipartFile file,
            @RequestPart(value = "id", required = false) String id,
            @RequestPart("name") String name
    ) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        ObjectType objectType = null;
        try{
            if(id == null) {
                objectType = this.objectTypeService.save(null, name, file);
            }else{
                int i = Integer.parseInt(id);
                objectType = this.objectTypeService.save(i, name, file);
            }
        }catch (ExceptionApiCustom ex){
            apiResponseCode = ex.getRestError();
        } catch (Exception ex){
            ex.printStackTrace();
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                objectType);
    }


    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<Integer>> delete(@PathVariable Integer id) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        try {
            this.objectTypeService.delete(id);
        } catch (IllegalArgumentException ex) {
            apiResponseCode = ApiResponseCode.ID_NULL;
        } catch (EmptyResultDataAccessException ex) {
            apiResponseCode = ApiResponseCode.ENTITY_NULL;
        } catch (Exception ex) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(
                apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                id);
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<ObjectType>>> getAll() {
        List<ObjectType> dto = this.objectTypeService.getAll();
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                dto);
    }
}
