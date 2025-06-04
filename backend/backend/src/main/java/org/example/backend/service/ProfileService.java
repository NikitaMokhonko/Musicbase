package org.example.backend.service;

import org.example.backend.dto.ProfileDTO;
import org.example.backend.dto.SongDTO;
import org.example.backend.model.Profile;
import org.example.backend.model.Song;
import org.example.backend.repository.ProfileRepo;
import org.example.backend.repository.SongRepo;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProfileService {
    private final ProfileRepo profileRepository;
    private final SongRepo songRepository;

    public ProfileService(ProfileRepo profileRepository, SongRepo songRepository) {
        this.profileRepository = profileRepository;
        this.songRepository = songRepository;
    }

    public Profile createOrUpdateProfile(String clerkUserId, ProfileDTO dto) {
        Profile profile = profileRepository.findById(clerkUserId)
                .orElseGet(() -> {
                    Profile newProfile = new Profile();
                    newProfile.setClerkId(clerkUserId);
                    return newProfile;
                });
        profile.setName(dto.getName());
        profile.setBio(dto.getBio());
        return profileRepository.save(profile);
    }

    public Song addSong(String clerkUserId, SongDTO dto) {
        Profile profile = profileRepository.findById(clerkUserId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found"));
        Song song = new Song();
        song.setUrl(dto.getUrl());
        song.setCategory(dto.getCategory());
        song.setName(dto.getName());
        song.setProfile(profile);
        return songRepository.save(song);
    }

    public ProfileDTO getProfileWithSongs(String clerkUserId) {
        Optional<Profile> profileOpt = profileRepository.findById(clerkUserId);
        if (profileOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Profile not found");
        }
        Profile profile = profileOpt.get();
        List<SongDTO> songDTOs = profile.getSongs().stream().map(song -> {
            SongDTO dto = new SongDTO();
            dto.setId(song.getId());
            dto.setUrl(song.getUrl());
            dto.setCategory(song.getCategory());
            dto.setName(song.getName());
            return dto;
        }).collect(Collectors.toList());
        ProfileDTO dto = new ProfileDTO();
        dto.setClerkId(profile.getClerkId());
        dto.setName(profile.getName());
        dto.setBio(profile.getBio());
        dto.setSongs(songDTOs);
        return dto;
    }

    public Song updateSong(String clerkUserId, String songId, SongDTO dto) {
        Long id;
        try { id = Long.parseLong(songId); } catch (NumberFormatException e) { return null; }
        Profile profile = profileRepository.findById(clerkUserId).orElse(null);
        if (profile == null) return null;
        Song song = songRepository.findById(id).orElse(null);
        if (song == null || !song.getProfile().getClerkId().equals(clerkUserId)) return null;
        song.setName(dto.getName());
        song.setUrl(dto.getUrl());
        song.setCategory(dto.getCategory());
        return songRepository.save(song);
    }

    public boolean deleteSong(String clerkUserId, String songId) {
        Long id;
        try { id = Long.parseLong(songId); } catch (NumberFormatException e) { return false; }
        Song song = songRepository.findById(id).orElse(null);
        if (song == null || !song.getProfile().getClerkId().equals(clerkUserId)) return false;
        songRepository.delete(song);
        return true;
    }

    public List<SongDTO> getSongsForUser(String clerkId) {
        Optional<Profile> profileOpt = profileRepository.findById(clerkId);
        if (profileOpt.isEmpty()) {
            return Collections.emptyList();
        }
        Profile profile = profileOpt.get();
        return profile.getSongs().stream().map(song -> {
            SongDTO dto = new SongDTO();
            dto.setId(song.getId());
            dto.setUrl(song.getUrl());
            dto.setCategory(song.getCategory());
            dto.setName(song.getName());
            return dto;
        }).collect(Collectors.toList());
    }
}
