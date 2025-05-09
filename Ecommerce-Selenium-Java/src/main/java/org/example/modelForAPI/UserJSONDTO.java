package org.example.modelForAPI;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserJSONDTO {
    private int id;
    private String name;
    private String username;
    private String email;
    private AddressJSONDTO address;
    private String phone;
    private String website;
    private CompanyJSONDTO company;

}
