package org.example.modelForAPI;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class GeoJSONDTO {

    private String lat;
    private String lng;

}
