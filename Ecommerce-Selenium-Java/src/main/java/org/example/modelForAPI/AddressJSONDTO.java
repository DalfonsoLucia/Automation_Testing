package org.example.modelForAPI;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AddressJSONDTO {

    private String street;
    private String suite;
    private String city;
    private String zipcode;
    private GeoJSONDTO geo;

}
