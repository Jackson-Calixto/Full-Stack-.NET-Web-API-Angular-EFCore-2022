$curDir = Get-Location
try {
    ROBOCOPY ..\..\nginx-1.23.1 C:\nginx-1.23.1 /MIR /NP /NDL /NFL --quiet --no-verbose | out-null
    Set-Location C:\nginx-1.23.1

    Set-Location .\conf

    openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt
    openssl x509 -in certificate.crt -out certificate.pem
    
    Set-Location $curDir
    Set-Location ..
    $bkpDir = Get-Location

    ROBOCOPY C:\nginx-1.23.1 $bkpDir /MIR /NP /NDL /NFL --quiet --no-verbose | out-null
}
finally {
    Set-Location $curDir
}

