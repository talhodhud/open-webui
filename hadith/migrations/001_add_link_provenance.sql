-- Migration 001: Add Link Provenance & Occurrence Evidence Schema
-- Target database: hadith_rijal.db
-- Purpose: Enhance isnad_transmissions with occurrence-level provenance, text spans, rules, and flags.

BEGIN TRANSACTION;

-- Create temporary table with upgraded schema
CREATE TABLE IF NOT EXISTS isnad_transmissions_v2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    occurrence_id TEXT NOT NULL,
    book TEXT NOT NULL,
    chapter INTEGER,
    hadith_id INTEGER NOT NULL,
    id_in_book INTEGER,
    path_id INTEGER DEFAULT 1,
    step INTEGER NOT NULL,
    student_raw TEXT NOT NULL,
    student_norm TEXT NOT NULL,
    student_id INTEGER,
    student_name TEXT NOT NULL,
    teacher_raw TEXT NOT NULL,
    teacher_norm TEXT NOT NULL,
    teacher_id INTEGER,
    teacher_name TEXT NOT NULL,
    relation_type TEXT DEFAULT 'direct',
    resolution_rule TEXT,
    text_span TEXT,
    chronology_conflict INTEGER DEFAULT 0
);

-- Copy existing records into new schema with default provenance
INSERT INTO isnad_transmissions_v2 (
    id, occurrence_id, book, chapter, hadith_id, id_in_book, path_id, step,
    student_raw, student_norm, student_id, student_name,
    teacher_raw, teacher_norm, teacher_id, teacher_name,
    relation_type, resolution_rule, text_span, chronology_conflict
)
SELECT
    id,
    book || ':' || hadith_id AS occurrence_id,
    book,
    1 AS chapter,
    hadith_id,
    hadith_id AS id_in_book,
    1 AS path_id,
    step,
    student_name AS student_raw,
    student_name AS student_norm,
    student_id,
    student_name,
    teacher_name AS teacher_raw,
    teacher_name AS teacher_norm,
    teacher_id,
    teacher_name,
    'direct' AS relation_type,
    'legacy_materialized' AS resolution_rule,
    student_name || ' -> ' || teacher_name AS text_span,
    0 AS chronology_conflict
FROM isnad_transmissions;

-- Swap tables
DROP TABLE isnad_transmissions;
ALTER TABLE isnad_transmissions_v2 RENAME TO isnad_transmissions;

-- Create lean, non-redundant optimal B-Tree indexes
CREATE INDEX idx_it_book_teacher ON isnad_transmissions(book, teacher_id);
CREATE INDEX idx_it_book_student ON isnad_transmissions(book, student_id);
CREATE INDEX idx_it_teacher_id ON isnad_transmissions(teacher_id);
CREATE INDEX idx_it_student_id ON isnad_transmissions(student_id);
CREATE INDEX idx_it_occurrence ON isnad_transmissions(occurrence_id);
CREATE INDEX idx_it_hadith_id ON isnad_transmissions(hadith_id);
CREATE INDEX idx_it_teacher_name ON isnad_transmissions(book, teacher_name);
CREATE INDEX idx_it_student_name ON isnad_transmissions(book, student_name);

COMMIT;
