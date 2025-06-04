package org.example.backend.repository;

import org.example.backend.model.Song;
import org.example.backend.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SongRepo extends JpaRepository<Song, Long> {
    long countByProfileAndCategory(Profile profile, String category);
}
