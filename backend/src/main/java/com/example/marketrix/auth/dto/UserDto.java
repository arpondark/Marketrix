package com.example.marketrix.auth.dto;

import com.example.marketrix.auth.entity.User;
import com.example.marketrix.auth.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class UserDto {

    private UUID id;
    private String email;
    private String fullName;
    private Role role;
    private String bio;
    private String[] expertiseTags;
    private String avatarUrl;

    public static UserDto from(User user) {
        return UserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole())
                .bio(user.getBio())
                .expertiseTags(user.getExpertiseTags())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }
}
