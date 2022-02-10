package com.nghiahd.server.service.impl;

import com.nghiahd.server.common.ApiResponseCode;
import com.nghiahd.server.common.SaveFileUtils;
import com.nghiahd.server.config.ReadEnvironment;
import com.nghiahd.server.domain.Experts;
import com.nghiahd.server.model.ExpertsDTO;
import com.nghiahd.server.repository.ExpertsRepository;
import com.nghiahd.server.service.ExpertsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ExpertsServiceImpl implements ExpertsService {
    private final ExpertsRepository expertsRepository;
    private final ReadEnvironment readEnvironment;

    public ExpertsServiceImpl(ExpertsRepository expertsRepository,
                              ReadEnvironment readEnvironment) {
        this.expertsRepository = expertsRepository;
        this.readEnvironment = readEnvironment;
    }

    private final String PREFIX_PASSPORT = "passport_image_";
    private final String PREFIX_PORTRAIT = "portrait_photography_";


    @Override
    public Experts editExperts(Experts ex,
                               MultipartFile passportImage,
                               MultipartFile portraitPhotography,
                               UUID id) {
        ex.setUpdateDate(LocalDateTime.now());
        Optional<Experts> pro = expertsRepository.findById(id);
        if (pro.isPresent()) {
            String fileDir = this.readEnvironment.getFolderImages() + "/" + ex.getId();
            if (passportImage != null) {
                String passportImageFileName = SaveFileUtils.createNameFile(
                        ex.getUpdateDate().toString(),
                        Objects.requireNonNull(passportImage.getOriginalFilename()),
                        PREFIX_PASSPORT
                );
                boolean isSaved1 = SaveFileUtils.saveFile(fileDir, passportImageFileName, passportImage);
                if (isSaved1) {
                    ex.setPassportImage(fileDir + "/" + passportImageFileName);
                } else {
                    return null;
                }
            }

            if (portraitPhotography != null) {
                String portraitPhotographyFileName = SaveFileUtils.createNameFile(
                        ex.getUpdateDate().toString(),
                        Objects.requireNonNull(portraitPhotography.getOriginalFilename()),
                        PREFIX_PORTRAIT
                );
                boolean isSaved2 = SaveFileUtils.saveFile(fileDir, portraitPhotographyFileName, portraitPhotography);
                if (isSaved2) {
                    ex.setPortraitPhotography(fileDir + "/" + portraitPhotographyFileName);
                } else {
                    return null;
                }

            }

            if (ex.getPassportImage() != null && ex.getPortraitPhotography() != null) {
                return this.expertsRepository.save(ex);
            }
        }
        return null;
    }

    @Override
    public ApiResponseCode deleteExperts(UUID id) {
        if (expertsRepository.checkExistExpertsInProfile(id) > 0) {
            return ApiResponseCode.EXIST_RELATION;
        }
        expertsRepository.deleteById(id);
        return ApiResponseCode.SUCCESS;

    }

    @Override
    public Page<ExpertsDTO> getPageExperts(Pageable pageable,
                                           String code,
                                           String fullname,
                                           String countryName,
                                           String permanentResidentialAddress,
                                           String phoneNumber,
                                           String passportNumber) {
        return expertsRepository.getPageExperts(
                pageable,
                code,
                fullname,
                countryName,
                permanentResidentialAddress,
                phoneNumber,
                passportNumber);
    }

    @Override
    public Experts getDetailExperts(UUID id) {
        return expertsRepository.findById(id).orElse(null);
    }

    @Override
    public Experts createExperts(Experts ex,
                                 MultipartFile passportImage,
                                 MultipartFile portraitPhotography) {
        ex.setCreateDate(LocalDateTime.now());
        ex.setUpdateDate(LocalDateTime.now());
        ex.setId(UUID.randomUUID());
        if (passportImage != null && portraitPhotography != null) {
            String fileDir = this.readEnvironment.getFolderImages() + "/" + ex.getId();
            String passportImageFileName = SaveFileUtils.createNameFile(
                    ex.getUpdateDate().toString(),
                    Objects.requireNonNull(passportImage.getOriginalFilename()),
                    PREFIX_PASSPORT
            );
            String portraitPhotographyFileName = SaveFileUtils.createNameFile(
                    ex.getUpdateDate().toString(),
                    Objects.requireNonNull(portraitPhotography.getOriginalFilename()),
                    PREFIX_PORTRAIT
            );
            boolean isSaved1 = SaveFileUtils.saveFile(fileDir, passportImageFileName, passportImage);
            boolean isSaved2 = SaveFileUtils.saveFile(fileDir, portraitPhotographyFileName, portraitPhotography);
            if (isSaved1 && isSaved2) {
                ex.setPassportImage(fileDir + "/" + passportImageFileName);
                ex.setPortraitPhotography(fileDir + "/" + portraitPhotographyFileName);
                ex = this.expertsRepository.save(ex);
            } else {
                ex = null;
            }
        } else {
            ex = null;
        }
        return ex;

    }
}
