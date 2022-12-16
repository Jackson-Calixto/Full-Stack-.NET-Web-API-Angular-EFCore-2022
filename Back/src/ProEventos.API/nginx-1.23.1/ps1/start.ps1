$curDir = Get-Location
try {
    $nginx = $null

    ROBOCOPY ..\..\nginx-1.23.1 C:\nginx-1.23.1 /MIR /NP /NDL /NFL# --quiet --no-verbose | out-null
    Set-Location C:\nginx-1.23.1

    taskkill -IM nginx.exe /F
    
    Start-Process .\nginx.exe
    
    while ($nginx -eq $null) {
        try{
            $nginx = Get-Process -Name nginx
        } catch {}        
    }

    sleep -Milliseconds 250
        
    .\nginx.exe -s reload
    tasklist | findstr nginx.exe
    .\nginx.exe -t
}
finally {
    Set-Location $curDir
}

