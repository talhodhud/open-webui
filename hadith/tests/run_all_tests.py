"""
run_all_tests.py
Bayan Al-Sunnah Master Test Runner for Automated AI Evaluators and CI/CD.
Executes all core test suites and prints a structured verification summary.
"""

import sys
import os
import subprocess
import time
from pathlib import Path

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

TESTS = [
    {
        "name": "Bayan Topics & Semantic Exclusion (12 Tests)",
        "file": "test_bayan_topics.py",
        "description": "Verifies 6 introductory topics, vetted lesson formats, real HadeethEnc IDs, negative exclusion of oaths from faith, and discrete quotes."
    },
    {
        "name": "Hadith Backend Integration (7 Tests)",
        "file": "test_hadith_backend.py",
        "description": "Verifies search_hadith_corpus, get_hadith_by_number, Dorar takhrij, and HadeethEnc explanation integration."
    },
    {
        "name": "Isnad Linkage & Graph Rigor (13 Tests)",
        "file": "test_isnad_linkage_rigor.py",
        "description": "Verifies narrator identity disambiguation, transmission links, chronology intervals, and drawer evidence integrity."
    },
    {
        "name": "Unified Architecture U01-U08 Acceptance (7 Suites)",
        "file": "test_unified_u01_u08.py",
        "description": "Verifies 4 Hadith endings (Marfu, Mawquf, Maqtu, Mursal), field parity, occurrence_id priority, topics tool wiring, snapshot safety, adaptive output, and clean DAG."
    }
]

def main():
    print("=" * 75)
    print(" 🌟 BAYAN AL-SUNNAH (بيان السنة) - MASTER VERIFICATION RUNNER")
    print(" Automated Hackathon Evaluation & Scientific Verification Suite")
    print("=" * 75)
    print(f"Timestamp: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Python:    {sys.version.split()[0]}")
    print(f"Base Dir:  {Path(__file__).resolve().parent}")
    print("=" * 75)

    base_dir = Path(__file__).resolve().parent
    results = []
    total_start = time.time()

    for t in TESTS:
        test_path = base_dir / t["file"]
        if not test_path.exists():
            # Try parent tests directory
            alt_path = base_dir.parent / "tests" / t["file"]
            if alt_path.exists():
                test_path = alt_path

        print(f"\n▶ Running: {t['name']}...")
        print(f"  File: {t['file']}")
        print(f"  Scope: {t['description']}")

        start = time.time()
        proc = subprocess.run(
            [sys.executable, str(test_path)],
            cwd=str(base_dir.parent if "open-webui" in str(base_dir) else base_dir.parent),
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace"
        )
        duration = round(time.time() - start, 2)
        success = (proc.returncode == 0)
        
        status_badge = "✅ PASSED" if success else "❌ FAILED"
        print(f"  Result: {status_badge} ({duration}s)")
        if not success:
            print("  --- Error Output ---")
            print(proc.stderr or proc.stdout)

        results.append({
            "name": t["name"],
            "file": t["file"],
            "status": "PASSED" if success else "FAILED",
            "duration": duration
        })

    total_duration = round(time.time() - total_start, 2)
    print("\n" + "=" * 75)
    print(" 📊 EXECUTIVE VERIFICATION SUMMARY")
    print("=" * 75)
    print(f"{'Test Suite':<50} | {'Status':<10} | {'Duration'}")
    print("-" * 75)
    all_passed = True
    for r in results:
        badge = "PASS" if r["status"] == "PASSED" else "FAIL"
        print(f"{r['name']:<50} | {badge:<10} | {r['duration']}s")
        if r["status"] != "PASSED":
            all_passed = False

    print("-" * 75)
    print(f"Total Execution Time: {total_duration}s")
    if all_passed:
        print("\n🎉 ALL TEST SUITES PASSED (100% SUCCESS RATE)!")
        print("Bayan Al-Sunnah meets all scientific and technical acceptance criteria.")
        sys.exit(0)
    else:
        print("\n⚠️ SOME TESTS FAILED. Please review the output above.")
        sys.exit(1)

if __name__ == "__main__":
    main()
