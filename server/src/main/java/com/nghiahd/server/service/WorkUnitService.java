package com.nghiahd.server.service;

import java.util.List;
import java.util.Map;

public interface WorkUnitService {
    List<Map<String,Object>> findWorkUnitWithUnitTypeID(int unitTypeID);
}
