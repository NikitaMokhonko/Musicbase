package org.example.backend.controller;

import org.example.backend.dto.SongDTO;
import org.example.backend.dto.ProfileDTO;
import org.example.backend.model.Profile;
import org.example.backend.model.Song;
import org.example.backend.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<Profile> createOrUpdateProfile(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody ProfileDTO dto
    ) {
        String clerkUserId = jwt.getSubject();
        Profile profile = profileService.createOrUpdateProfile(clerkUserId, dto);
        return ResponseEntity.ok(profile);
    }

    @GetMapping("/{clerkId}")
    public ResponseEntity<ProfileDTO> getProfileWithSongs(@PathVariable String clerkId, @AuthenticationPrincipal Jwt jwt) {
        return ResponseEntity.ok(profileService.getProfileWithSongs(clerkId));
    }

    @PutMapping("/{clerkId}")
    public ResponseEntity<Profile> updateProfile(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String clerkId,
            @RequestBody ProfileDTO dto
    ) {
        String clerkUserId = jwt.getSubject();
        if (!clerkUserId.equals(clerkId)) {
            return ResponseEntity.status(403).build();
        }
        Profile profile = profileService.createOrUpdateProfile(clerkUserId, dto);
        return ResponseEntity.ok(profile);
    }

    @PostMapping("/songs")
    public ResponseEntity<Song> addSong(
            @AuthenticationPrincipal Jwt jwt,
            @RequestBody SongDTO dto
    ) {
        String clerkUserId = jwt.getSubject();
        Song song = profileService.addSong(clerkUserId, dto);
        return ResponseEntity.ok(song);
    }

    @GetMapping("/songs")
    public ResponseEntity<List<SongDTO>> getSongsForUser(@RequestParam("userId") String clerkId) {
        try {
            ProfileDTO profile = profileService.getProfileWithSongs(clerkId);
            return ResponseEntity.ok(profile.getSongs());
        } catch (org.springframework.web.server.ResponseStatusException ex) {
            if (ex.getStatusCode() == org.springframework.http.HttpStatus.NOT_FOUND) {
                return ResponseEntity.notFound().build();
            }
            throw ex;
        }
    }

    @PutMapping("/songs/{songId}")
    public ResponseEntity<Song> updateSong(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String songId,
            @RequestBody SongDTO dto
    ) {
        String clerkUserId = jwt.getSubject();
        Song updated = profileService.updateSong(clerkUserId, songId, dto);
        if (updated == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/songs/{songId}")
    public ResponseEntity<Void> deleteSong(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String songId
    ) {
        String clerkUserId = jwt.getSubject();
        boolean deleted = profileService.deleteSong(clerkUserId, songId);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }
}
