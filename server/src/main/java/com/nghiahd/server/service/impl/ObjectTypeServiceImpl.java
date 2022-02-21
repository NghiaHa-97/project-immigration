package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.ExceptionApiCustom;
import com.nghiahd.server.common.SaveFileUtils;
import com.nghiahd.server.config.ReadEnvironment;
import com.nghiahd.server.domain.ObjectType;
import com.nghiahd.server.repository.ObjectTypeRepository;
import com.nghiahd.server.service.ObjectTypeService;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@Transactional
public class ObjectTypeServiceImpl implements ObjectTypeService {
    private final ObjectTypeRepository objectTypeRepository;
    private final ReadEnvironment readEnvironment;

    public ObjectTypeServiceImpl(ObjectTypeRepository objectTypeRepository,
                                 ReadEnvironment readEnvironment) {
        this.objectTypeRepository = objectTypeRepository;
        this.readEnvironment = readEnvironment;
    }


    @Override
    public ObjectType save(Integer id, String name, MultipartFile file) throws ExceptionApiCustom {
        ObjectType ob = new ObjectType();
        ob.setId(id);
        ob.setName(name);
        if (id != null) {
            ObjectType o = this.objectTypeRepository.findById(id).get();
            ob.setImage(o.getImage());
        }
        if (file != null) {
            String fileDir = this.readEnvironment.getFolderImages() + "/" + "object-type";
            String fileName = SaveFileUtils.createNameFile(
                    LocalDateTime.now().toString(),
                    Objects.requireNonNull(file.getOriginalFilename())
            );
            boolean isSaved = SaveFileUtils.saveFile(fileDir, fileName, file);
            if (isSaved) {
                ob.setImage(fileDir + "/" + fileName);
                ob = this.objectTypeRepository.save(ob);
            } else {
                throw new ExceptionApiCustom(ApiResponseCode.SAVE_FAILED);
            }
        } else if (id != null) {
            ob = this.objectTypeRepository.save(ob);
        } else {
            throw new ExceptionApiCustom(ApiResponseCode.SAVE_FAILED);
        }
        return ob;
    }

    @Override
    public void delete(int id) {
        this.objectTypeRepository.deleteById(id);

    }

    @Override
    public List<ObjectType> getAll() {
        return this.objectTypeRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}
