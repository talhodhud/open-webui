$ErrorActionPreference = 'Stop'
$themeRoot = $PSScriptRoot
$themePython = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
if (-not (Test-Path -LiteralPath $themePython)) { $themePython = (Get-Command python).Source }
& $themePython (Join-Path $themeRoot 'serve.py')
