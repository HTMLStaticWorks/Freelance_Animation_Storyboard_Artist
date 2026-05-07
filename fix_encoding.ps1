$ErrorActionPreference = 'Stop'
$files = Get-ChildItem -Path . -Filter *.html -Recurse

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName, [System.Text.Encoding]::UTF8)
    
    $original = $content
    $content = $content.Replace("Home â–¾", "Home ▾")
    $content = $content.Replace("â˜€ï¸ ", "☀️")
    $content = $content.Replace("â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢", "••••••••")
    $content = $content.Replace("â€¢", "•")
    $content = $content.Replace("break itâ€”using", "break it—using")
    
    if ($content -cne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Fixed $($file.FullName)"
    }
}
