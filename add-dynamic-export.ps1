# Script to add dynamic export to all [lang] pages
$files = @(
    "src\app\[lang]\[slug]\page.tsx",
    "src\app\[lang]\about-us\page.tsx",
    "src\app\[lang]\blog\[slug]\page.tsx",
    "src\app\[lang]\blog\kategori\[slug]\page.tsx",
    "src\app\[lang]\blog\page.tsx",
    "src\app\[lang]\careers\page.tsx",
    "src\app\[lang]\contact\page.tsx",
    "src\app\[lang]\e-katalog\page.tsx",
    "src\app\[lang]\hakkimizda\page.tsx",
    "src\app\[lang]\iletisim\page.tsx",
    "src\app\[lang]\industries\[slug]\page.tsx",
    "src\app\[lang]\industries\page.tsx",
    "src\app\[lang]\kariyer\page.tsx",
    "src\app\[lang]\page.tsx",
    "src\app\[lang]\products\[slug]\page.tsx",
    "src\app\[lang]\products\page.tsx",
    "src\app\[lang]\referanslar\page.tsx",
    "src\app\[lang]\request-quote\page.tsx",
    "src\app\[lang]\sektorler\[slug]\page.tsx",
    "src\app\[lang]\sektorler\page.tsx",
    "src\app\[lang]\teklif-al\page.tsx",
    "src\app\[lang]\urunler\[slug]\page.tsx",
    "src\app\[lang]\urunler\page.tsx",
    "src\app\page.tsx"
)

$dynamicExport = @"
// Force dynamic rendering to prevent build-time database queries
export const dynamic = 'force-dynamic';
export const revalidate = 0;

"@

foreach ($file in $files) {
    $fullPath = Join-Path $PSScriptRoot $file
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw
        
        # Check if already has dynamic export
        if ($content -notmatch "export const dynamic") {
            # Find the position after imports (before first export default or first non-import line)
            $lines = Get-Content $fullPath
            $insertLine = 0
            
            for ($i = 0; $i -lt $lines.Count; $i++) {
                $line = $lines[$i].Trim()
                if ($line -match "^export (default|const|function|interface|type)" -and $line -notmatch "^export const dynamic") {
                    $insertLine = $i
                    break
                }
            }
            
            if ($insertLine -gt 0) {
                $beforeInsert = $lines[0..($insertLine-1)] -join "`r`n"
                $afterInsert = $lines[$insertLine..($lines.Count-1)] -join "`r`n"
                $newContent = $beforeInsert + "`r`n`r`n" + $dynamicExport + $afterInsert
                Set-Content -Path $fullPath -Value $newContent -NoNewline
                Write-Host "✓ Updated: $file" -ForegroundColor Green
            } else {
                Write-Host "⚠ Skipped (no exports found): $file" -ForegroundColor Yellow
            }
        } else {
            Write-Host "→ Already has dynamic export: $file" -ForegroundColor Cyan
        }
    } else {
        Write-Host "✗ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "`n✅ Done! Updated all public pages." -ForegroundColor Green
