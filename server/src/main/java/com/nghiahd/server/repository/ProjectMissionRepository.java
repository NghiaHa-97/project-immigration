package com.nghiahd.server.repository;

import com.nghiahd.server.domain.Position;
import com.nghiahd.server.domain.ProjectMission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProjectMissionRepository extends JpaRepository<ProjectMission, Integer> {
    @Query(value = "select * from ProjectMission where WorkUnitCreateID = ?1 order by Name", nativeQuery = true)
    List<ProjectMission> findProjectMissionByWorkUnitCreateID(int workUnitCreateID);
}
