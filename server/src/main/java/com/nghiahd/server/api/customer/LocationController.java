package com.nghiahd.server.api.customer;

import com.nghiahd.server.common.*;
import com.nghiahd.server.domain.Location;
import com.nghiahd.server.model.LocationDTO;
import com.nghiahd.server.service.LocationService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.SortDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "api/public/location")
public class LocationController {
    private final LocationService locationService;
    private final MessageUtils messageUtils;

    public LocationController(LocationService locationService,
                              MessageUtils messageUtils) {
        this.locationService = locationService;
        this.messageUtils = messageUtils;
    }

    @PostMapping(value = "/save")
    public ResponseEntity<BodyResponseDTO<LocationDTO>> saveLocation(@RequestBody Location req) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        LocationDTO location = null;
        try {
            location = this.locationService.save(req);
            if (location == null) {
                apiResponseCode = ApiResponseCode.SAVE_FAILED;
            }
        } catch (ExceptionApiCustom ex) {
            apiResponseCode = ex.getRestError();
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                location);
    }


    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<BodyResponseDTO<Object>> delete(@PathVariable Long id) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        try {
            this.locationService.delete(id);
        } catch (IllegalArgumentException ex) {
            apiResponseCode = ApiResponseCode.ID_NULL;
        } catch (EmptyResultDataAccessException ex) {
            apiResponseCode = ApiResponseCode.ENTITY_NULL;
        } catch (Exception ex) {
            apiResponseCode = ApiResponseCode.BAD_REQUEST;
        }

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                id);
    }

    @GetMapping()
    public ResponseEntity<BodyResponseDTO<List<LocationDTO>>> search(
            @PageableDefault(page = Constant.DEFAULT_PAGE_NUMBER)
            @SortDefault.SortDefaults({
                    @SortDefault(sort = "name", direction = Sort.Direction.DESC)
            }) Pageable pageable,
            @RequestParam(required = false) String name
    ) {
        Page<LocationDTO> dto = this.locationService.searchLocation(PageUtilsCommon.createPageable(pageable),
                name);
        return RestResponseWrapper.getResponse(HttpStatus.OK,
                ApiResponseCode.SUCCESS,
                this.messageUtils,
                dto);
    }

    @GetMapping(value = "/detail/{id}")
    public ResponseEntity<BodyResponseDTO<LocationDTO>> getDetail(@PathVariable Long id) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        LocationDTO location = this.locationService.getDetailDTO(id);

        if (location == null) {
            apiResponseCode = ApiResponseCode.NOT_FOUND;
        }
        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                location);
    }

    @GetMapping(value = "/view")
    public ResponseEntity<BodyResponseDTO<List<LocationDTO>>> view(@RequestParam Double northEastLat,
                                                                   @RequestParam Double northEastLng,
                                                                   @RequestParam Double southWestLat,
                                                                   @RequestParam Double southWestLng) {
        ApiResponseCode apiResponseCode = ApiResponseCode.SUCCESS;
        List<LocationDTO> list = this.locationService.getLocationByBounds(
                northEastLat,
                northEastLng,
                southWestLat,
                southWestLng);

        return RestResponseWrapper.getResponse(apiResponseCode.getStatus(),
                apiResponseCode,
                this.messageUtils,
                list);
    }
}
