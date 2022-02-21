package com.nghiahd.server.service;

import com.nghiahd.server.domain.ObjectType;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ObjectTypeService {
    ObjectType save(Integer id, String name, MultipartFile file);
    void delete(int id);
    List<ObjectType> getAll();
}
