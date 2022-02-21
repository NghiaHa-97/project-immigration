package com.nghiahd.server.domain.custom;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class ExpertsInProfileKey implements Serializable {
    @Column(name = "expertsid")
    private UUID expertsID;

    @Column(name = "profileid")
    private UUID profileID;

    public ExpertsInProfileKey(ExpertsQuery ex, ProfileQuery pr){
        if(ex != null){
            this.expertsID = ex.getId();
        }
        if(pr != null){
            this.profileID = pr.getId();
        }
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((expertsID == null) ? 0 : expertsID.hashCode());
        result = prime * result + ((profileID == null) ? 0 : profileID.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        ExpertsInProfileKey other = (ExpertsInProfileKey) obj;
        if (expertsID == null) {
            if (other.expertsID != null)
                return false;
        } else if (!expertsID.equals(other.expertsID))
            return false;
        if (profileID == null) {
            if (other.profileID != null)
                return false;
        } else if (!profileID.equals(other.profileID))
            return false;
        return true;
    }
}
