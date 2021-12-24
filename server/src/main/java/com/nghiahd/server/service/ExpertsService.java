package com.nghiahd.server.service;

import com.nghiahd.server.domain.Experts;

import java.util.UUID;

public interface ExpertsService {
    Experts saveExperts(Experts experts);

    Experts editExperts(Experts experts, UUID id);

    int deleteExperts(UUID id);
}
