package com.nghiahd.server.api.customer;

import com.nghiahd.server.domain.Profile;
import com.nghiahd.server.service.ProfileService;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping(value = "/public/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping(value = "/create-profile")
    public Profile createProfile(@RequestBody Profile profile) {
        return profileService.saveProfile(profile);
    }

    @PatchMapping(value = "/edit-profile/{id}")
    public Profile editProfile(@RequestBody Profile profile, @PathVariable UUID id) {
        return profileService.editProfile(profile, id);
    }

    @DeleteMapping(value = "/delete-profile/{id}")
    public boolean deleteProfile(@PathVariable UUID id) {
        int checkDelete = profileService.deleteProfile(id);
        return checkDelete != 0;
    }

}
