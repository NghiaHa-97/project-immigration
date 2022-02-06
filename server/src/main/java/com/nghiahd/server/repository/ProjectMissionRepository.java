package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Position;
import com.nghiahd.server.domain.ProjectMission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectMissionRepository extends JpaRepository<ProjectMission, Integer>, ProjectMissionRepositoryCustom {
    @Query(value = "select * from ProjectMission where WorkUnitCreateID = ?1 order by Name", nativeQuery = true)
    List<ProjectMission> findProjectMissionByWorkUnitCreateID(int workUnitCreateID);

    @Query(value = "select count(1) FROM Profile p WHERE p.ProjectMissionID = ?1 ", nativeQuery = true)
    int checkExistMissionInProfile(Integer id);
}
