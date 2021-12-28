package com.nghiahd.server.api.customer;

import com.nghiahd.server.domain.Experts;
import com.nghiahd.server.service.ExpertsService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(value = "/public/experts")
public class ExpertsController {

    private final ExpertsService expertsService;

    public ExpertsController(ExpertsService expertsService) {
        this.expertsService = expertsService;
    }


    @PostMapping(value = "/create-experts")
    public Experts createExperts(@RequestBody Experts ex) {
        return expertsService.saveExperts(ex);
    }

    @PatchMapping(value = "/edit-experts/{id}")
    public Experts editExperts(@RequestBody Experts experts, @PathVariable UUID id) {
        return expertsService.editExperts(experts, id);
    }

    @DeleteMapping(value = "/delete-experts/{id}")
    public boolean deleteExperts(@PathVariable UUID id) {
        int checkDelete = expertsService.deleteExperts(id);
        return checkDelete != 0;
    }

}
