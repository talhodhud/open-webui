#!/usr/bin/env bash
# ==============================================================================
# Bayan Al-Sunnah (بيان السنة) - VPS Environment & Database Diagnostic Script
# ==============================================================================
# Usage:
#   chmod +x investigate_vps.sh
#   ./investigate_vps.sh
# ==============================================================================

set -e

echo "=============================================================================="
echo " 🔍 BAYAN AL-SUNNAH - VPS DIAGNOSTIC & VERIFICATION SUITE"
echo "=============================================================================="
echo "Host: $(hostname)"
echo "Date: $(date -u)"
echo "User: $(whoami)"
echo "Working Dir: $(pwd)"
echo "=============================================================================="

# ------------------------------------------------------------------------------
# 1. SEARCH FOR THE TWO DATABASE FILES ON HOST
# ------------------------------------------------------------------------------
echo ""
echo "▶ 1. Locating Database Files on Host..."
RIJAL_FILES=$(find / -name "hadith_rijal.db" 2>/dev/null || true)
SEARCH_FILES=$(find / -name "search_index.sqlite" 2>/dev/null || true)

echo "--- hadith_rijal.db instances found ---"
if [ -z "$RIJAL_FILES" ]; then
    echo "❌ NO instance of hadith_rijal.db found on the system!"
else
    echo "$RIJAL_FILES" | while read -r f; do
        if [ -n "$f" ]; then
            BYTES=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f" 2>/dev/null || wc -c < "$f")
            HUMAN=$(ls -lh "$f" | awk '{print $5}')
            if [ "$BYTES" -gt 10000000 ]; then
                echo "  ✅ FOUND VALID: $f (Size: $HUMAN, $BYTES bytes)"
            else
                echo "  ⚠️ FOUND DUMMY/EMPTY: $f (Size: $HUMAN, $BYTES bytes) -> [0-byte git placeholder]"
            fi
        fi
    done
fi

echo "--- search_index.sqlite instances found ---"
if [ -z "$SEARCH_FILES" ]; then
    echo "❌ NO instance of search_index.sqlite found on the system!"
else
    echo "$SEARCH_FILES" | while read -r f; do
        if [ -n "$f" ]; then
            BYTES=$(stat -c%s "$f" 2>/dev/null || stat -f%z "$f" 2>/dev/null || wc -c < "$f")
            HUMAN=$(ls -lh "$f" | awk '{print $5}')
            if [ "$BYTES" -gt 10000000 ]; then
                echo "  ✅ FOUND VALID: $f (Size: $HUMAN, $BYTES bytes)"
            else
                echo "  ⚠️ FOUND DUMMY/EMPTY: $f (Size: $HUMAN, $BYTES bytes) -> [0-byte git placeholder]"
            fi
        fi
    done
fi

# ------------------------------------------------------------------------------
# 2. CHECK DOCKER VS NATIVE RUNTIME
# ------------------------------------------------------------------------------
echo ""
echo "▶ 2. Checking Open WebUI Deployment Architecture..."
DOCKER_CONTAINER=""
if command -v docker &> /dev/null; then
    DOCKER_CONTAINER=$(docker ps --format "{{.ID}} {{.Names}} {{.Image}}" | grep -i "open-webui" | head -n 1 | awk '{print $1}' || true)
fi

if [ -n "$DOCKER_CONTAINER" ]; then
    CNAME=$(docker ps --filter "id=$DOCKER_CONTAINER" --format "{{.Names}}")
    echo "  🐳 Open WebUI is running inside DOCKER container: $CNAME ($DOCKER_CONTAINER)"
    echo "  Checking databases INSIDE container:"
    CONTAINER_RIJAL=$(docker exec "$DOCKER_CONTAINER" find /app -name "hadith_rijal.db" -size +10M 2>/dev/null | head -n 1 || true)
    CONTAINER_SEARCH=$(docker exec "$DOCKER_CONTAINER" find /app -name "search_index.sqlite" -size +10M 2>/dev/null | head -n 1 || true)
    
    if [ -n "$CONTAINER_RIJAL" ]; then
        echo "    ✅ hadith_rijal.db exists inside container at: $CONTAINER_RIJAL"
    else
        echo "    ❌ hadith_rijal.db is MISSING inside container! (Must use docker cp)"
    fi
    
    if [ -n "$CONTAINER_SEARCH" ]; then
        echo "    ✅ search_index.sqlite exists inside container at: $CONTAINER_SEARCH"
    else
        echo "    ❌ search_index.sqlite is MISSING inside container! (Must use docker cp)"
    fi
else
    echo "  🖥️ Open WebUI is running directly on Host (Native / Systemd / Virtualenv)."
fi

# ------------------------------------------------------------------------------
# 3. VERIFY SQLITE TABLE CONTENTS
# ------------------------------------------------------------------------------
echo ""
echo "▶ 3. Verifying SQLite Data Integrity..."
REAL_RIJAL=$(find / -name "hadith_rijal.db" -size +100M 2>/dev/null | head -n 1 || true)
REAL_SEARCH=$(find / -name "search_index.sqlite" -size +100M 2>/dev/null | head -n 1 || true)

if [ -n "$REAL_RIJAL" ]; then
    echo "  Testing queries on: $REAL_RIJAL"
    python3 -c "
import sqlite3
try:
    conn = sqlite3.connect('$REAL_RIJAL')
    cur = conn.cursor()
    cur.execute('SELECT count(*) FROM narrators')
    print('    - Narrators count:       ', cur.fetchone()[0], '(Expected ~115,735)')
    cur.execute('SELECT count(*) FROM hadiths')
    print('    - Hadiths count:         ', cur.fetchone()[0], '(Expected ~112,994)')
    cur.execute('SELECT id, full_name, grade_ar FROM narrators WHERE full_name LIKE \"%سعيد بن أبي بردة%\" LIMIT 1')
    row = cur.fetchone()
    print('    - Sa\'id ibn Abi Burdah:  ', row)
    conn.close()
    print('    ✅ hadith_rijal.db integrity verified!')
except Exception as e:
    print('    ❌ Integrity error:', e)
"
else
    echo "  ❌ Cannot test hadith_rijal.db: No file >100MB found on host!"
fi

if [ -n "$REAL_SEARCH" ]; then
    echo "  Testing queries on: $REAL_SEARCH"
    python3 -c "
import sqlite3
try:
    conn = sqlite3.connect('$REAL_SEARCH')
    cur = conn.cursor()
    cur.execute('SELECT count(*) FROM records')
    print('    - Hadith records count:  ', cur.fetchone()[0], '(Expected ~34,240)')
    cur.execute('SELECT record_id, collection FROM records WHERE record_id = \"itqan:muslim:32:8:6900c9057c27\"')
    row = cur.fetchone()
    print('    - Muslim 32:8 test row:  ', row)
    conn.close()
    print('    ✅ search_index.sqlite integrity verified!')
except Exception as e:
    print('    ❌ Integrity error:', e)
"
else
    echo "  ❌ Cannot test search_index.sqlite: No file >100MB found on host!"
fi

# ------------------------------------------------------------------------------
# 4. INSPECT OPEN WEBUI VALVES IN WEBUI.DB
# ------------------------------------------------------------------------------
echo ""
echo "▶ 4. Inspecting Open WebUI Tools & Valves Configuration..."
WEBUI_DB=""
if [ -n "$DOCKER_CONTAINER" ]; then
    echo "  (Inside Docker: checking /app/backend/data/webui.db)"
    docker exec "$DOCKER_CONTAINER" python3 -c "
import sqlite3, json
try:
    conn = sqlite3.connect('/app/backend/data/webui.db')
    cur = conn.cursor()
    rows = cur.execute('SELECT id, valves FROM tool WHERE id LIKE \"%hadith%\"').fetchall()
    print('    Found', len(rows), 'Hadith tools in Docker webui.db:')
    for r in rows:
        v = r[1]
        print('      *', r[0], '-> valves:', v)
        if v and 'c:\\\\' in v.lower():
            print('        ⚠️ WARNING: Tool contains Windows path!')
except Exception as e:
    print('    Could not query Docker webui.db:', e)
" 2>/dev/null || true
else
    WEBUI_DB=$(find / -name "webui.db" 2>/dev/null | grep -v "/proc/" | head -n 1 || true)
    if [ -n "$WEBUI_DB" ]; then
        echo "  Found Host webui.db at: $WEBUI_DB"
        python3 -c "
import sqlite3, json
try:
    conn = sqlite3.connect('$WEBUI_DB')
    cur = conn.cursor()
    rows = cur.execute('SELECT id, valves FROM tool WHERE id LIKE \"%hadith%\"').fetchall()
    print('    Found', len(rows), 'Hadith tools in webui.db:')
    for r in rows:
        v = r[1]
        print('      *', r[0], '-> valves:', v)
        if v and 'c:\\\\' in v.lower():
            print('        ⚠️ WARNING: Tool contains Windows path!')
except Exception as e:
    print('    Could not query host webui.db:', e)
" 2>/dev/null || true
    fi
fi

# ------------------------------------------------------------------------------
# 5. DIAGNOSTIC SUMMARY & ACTIONABLE FIXES
# ------------------------------------------------------------------------------
echo ""
echo "=============================================================================="
echo " 📋 DIAGNOSTIC SUMMARY & EXACT REMEDIATION ACTIONS"
echo "=============================================================================="

if [ -n "$DOCKER_CONTAINER" ]; then
    echo "📌 Open WebUI runs in DOCKER container ($CNAME)."
    if [ -n "$REAL_RIJAL" ] && [ -n "$REAL_SEARCH" ]; then
        echo "To copy both verified databases into Docker right now, execute:"
        echo ""
        echo "  docker cp \"$REAL_RIJAL\" $DOCKER_CONTAINER:/app/backend/data/hadith_rijal.db"
        echo "  docker cp \"$REAL_SEARCH\" $DOCKER_CONTAINER:/app/backend/data/search_index.sqlite"
        echo "  docker exec $DOCKER_CONTAINER chmod 644 /app/backend/data/hadith_rijal.db /app/backend/data/search_index.sqlite"
        echo "  docker restart $DOCKER_CONTAINER"
        echo ""
    else
        echo "⚠️ You must upload the full hadith_rijal.db (~144MB) and search_index.sqlite (~118MB) to the host first."
    fi
else
    echo "📌 Open WebUI runs NATIVELY on host."
    if [ -n "$REAL_RIJAL" ] && [ -n "$REAL_SEARCH" ]; then
        echo "To set up standard symlinks and environment variables on host, execute:"
        echo ""
        echo "  mkdir -p /root/open-webui/hadith/poc/phrase_search/"
        echo "  ln -sf \"$REAL_RIJAL\" /root/open-webui/hadith/hadith_rijal.db"
        echo "  ln -sf \"$REAL_SEARCH\" /root/open-webui/hadith/poc/phrase_search/search_index.sqlite"
        echo "  export HADITH_DB_PATH=\"$REAL_RIJAL\""
        echo "  export HADITH_SEARCH_INDEX_PATH=\"$REAL_SEARCH\""
        echo ""
    fi
fi
echo "=============================================================================="
