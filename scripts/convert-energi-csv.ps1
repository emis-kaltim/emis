
# ============================================================
# KONVERSI DATA ENERGI CSV -> JSON UNTUK WEBSITE EMIS
# Dua dataset:
# 1. Dengan videotron
# 2. Tanpa videotron
#
# Kompatibel dengan Windows PowerShell 5.1
# ============================================================

$ErrorActionPreference = "Stop"

# ------------------------------------------------------------
# 1. KONFIGURASI PROYEK
# ------------------------------------------------------------

$ProjectPath = "C:\Users\USER\Desktop\WEBSITEENERGISETDAV2"

$OutputFolder = Join-Path $ProjectPath "data"

# Sumber CSV
$CsvPathPrimary = Join-Path $ProjectPath "Data_Energi.csv"
$CsvPathNV = Join-Path $ProjectPath "Data_Energi_NV.csv"

# Hasil JSON
$JsonPathPrimary = Join-Path $OutputFolder "energi.json"
$JsonPathNV = Join-Path $OutputFolder "energi-tanpa-videotron.json"

# Format angka Indonesia
$CultureID = [System.Globalization.CultureInfo]::GetCultureInfo("id-ID")

# ------------------------------------------------------------
# 2. PASTIKAN KEDUA CSV TERSEDIA
# ------------------------------------------------------------

$RequiredFiles = @(
    $CsvPathPrimary,
    $CsvPathNV
)

foreach ($File in $RequiredFiles) {
    if (-not (Test-Path -LiteralPath $File)) {
        throw "File CSV tidak ditemukan: $File"
    }
}

# ------------------------------------------------------------
# 3. FUNGSI NORMALISASI HEADER
# ------------------------------------------------------------

function Normalize-Header {
    param([string]$Name)

    if ($null -eq $Name) {
        return ""
    }

    return (($Name -replace "^\uFEFF", "").Trim().ToLowerInvariant())
}

# ------------------------------------------------------------
# 4. FUNGSI MEMBACA NILAI KOLOM
# ------------------------------------------------------------

function Get-CellValue {
    param(
        [object]$Row,
        [string]$Header
    )

    $Wanted = Normalize-Header $Header

    foreach ($Property in $Row.PSObject.Properties) {
        if ((Normalize-Header $Property.Name) -eq $Wanted) {
            return [string]$Property.Value
        }
    }

    throw "Kolom '$Header' tidak ditemukan. Periksa judul kolom CSV."
}

# ------------------------------------------------------------
# 5. FUNGSI KONVERSI ANGKA INDONESIA
# ------------------------------------------------------------

function Convert-ToNumber {
    param([AllowNull()][string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return $null
    }

    $Clean = $Value.Trim()

    if ($Clean -in @("-", "N/A", "NA")) {
        return $null
    }

    $Number = 0.0

    $Styles = [System.Globalization.NumberStyles]::Number -bor `
              [System.Globalization.NumberStyles]::AllowLeadingSign

    $Success = [double]::TryParse(
        $Clean,
        $Styles,
        $CultureID,
        [ref]$Number
    )

    if (-not $Success) {
        throw "Nilai angka tidak dapat dibaca: '$Value'."
    }

    return $Number
}

# ------------------------------------------------------------
# 6. FUNGSI KONVERSI PERSENTASE
# ------------------------------------------------------------

function Convert-ToPercent {
    param([AllowNull()][string]$Value)

    if ([string]::IsNullOrWhiteSpace($Value)) {
        return $null
    }

    $Clean = $Value.Trim()

    if ($Clean -in @("-", "N/A", "NA")) {
        return $null
    }

    if ($Clean.EndsWith("%")) {

        $NumericText = $Clean.Substring(
            0,
            $Clean.Length - 1
        ).Trim()

        $Number = Convert-ToNumber $NumericText

        if ($null -eq $Number) {
            return $null
        }

        return ($Number / 100)
    }

    $Number = Convert-ToNumber $Clean

    if ($null -eq $Number) {
        return $null
    }

    if ([math]::Abs($Number) -gt 1) {
        return ($Number / 100)
    }

    return $Number
}

# ------------------------------------------------------------
# 7. FUNGSI KONVERSI SATU DATASET CSV MENJADI JSON
# ------------------------------------------------------------

function Convert-CsvToJsonData {
    param(
        [string]$CsvPath,
        [string]$DatasetName
    )

    Write-Host ""
    Write-Host "Memproses: $DatasetName" -ForegroundColor Cyan

    # Deteksi delimiter
    $FirstLine = Get-Content -LiteralPath $CsvPath -TotalCount 1

    $SemicolonCount = ([regex]::Matches($FirstLine, ";")).Count
    $CommaCount = ([regex]::Matches($FirstLine, ",")).Count

    if ($SemicolonCount -gt $CommaCount) {
        $Delimiter = ";"
    }
    else {
        $Delimiter = ","
    }

    Write-Host "Pemisah CSV: '$Delimiter'"

    # Baca CSV
    $Rows = @(
        Import-Csv -LiteralPath $CsvPath `
                   -Delimiter $Delimiter `
                   -Encoding UTF8
    )

    if ($Rows.Count -eq 0) {
        throw "CSV kosong: $CsvPath"
    }

    # Konversi seluruh baris
    $OutputData = @(
        foreach ($Row in $Rows) {

            $YearValue = Convert-ToNumber (
                Get-CellValue $Row "TAHUN"
            )

            $MonthNumberValue = Convert-ToNumber (
                Get-CellValue $Row "Nomor Bulan"
            )

            $MonthName = (
                Get-CellValue $Row "Bulan"
            ).Trim()

            # Abaikan baris kosong
            if ($null -eq $YearValue -or
                $null -eq $MonthNumberValue) {
                continue
            }

            $TotalKwhValue = Convert-ToNumber (
                Get-CellValue $Row "Total KwH digunakan"
            )

            # Bulan belum memiliki data aktual
            if ($null -eq $TotalKwhValue -or $TotalKwhValue -le 0) {

                [pscustomobject]@{
                    year             = [int]$YearValue
                    monthNumber      = [int]$MonthNumberValue
                    month            = $MonthName
                    lwbpKwh           = $null
                    wbpKwh            = $null
                    totalKwh          = $null
                    lwbpBill          = $null
                    wbpBill           = $null
                    totalBill         = $null
                    workingDays       = $null
                    kwhPerWorkday     = $null
                    costPerKwh        = $null
                    wbpShare          = $null
                    lwbpShare         = $null
                    consumptionChange = $null
                    savingKwh         = $null
                    targetAchievement = $null
                }

                continue
            }

            # Baris dengan data aktual
            [pscustomobject]@{
                year             = [int]$YearValue
                monthNumber      = [int]$MonthNumberValue
                month            = $MonthName
                lwbpKwh           = (Convert-ToNumber (
                    Get-CellValue $Row "kWh LWBP"
                ))
                wbpKwh            = (Convert-ToNumber (
                    Get-CellValue $Row "kWh WBP"
                ))
                totalKwh          = $TotalKwhValue
                lwbpBill          = (Convert-ToNumber (
                    Get-CellValue $Row "Tagihan LWBP"
                ))
                wbpBill           = (Convert-ToNumber (
                    Get-CellValue $Row "Tagihan WBP"
                ))
                totalBill         = (Convert-ToNumber (
                    Get-CellValue $Row "Total Tagihan"
                ))
                workingDays       = (Convert-ToNumber (
                    Get-CellValue $Row "Jumlah Hari kerja"
                ))
                kwhPerWorkday     = (Convert-ToNumber (
                    Get-CellValue $Row "kwh/hari kerja"
                ))
                costPerKwh        = (Convert-ToNumber (
                    Get-CellValue $Row "Biaya/kwh"
                ))
                wbpShare          = (Convert-ToPercent (
                    Get-CellValue $Row "%Wbp"
                ))
                lwbpShare         = (Convert-ToPercent (
                    Get-CellValue $Row "%lwbp"
                ))
                consumptionChange = (Convert-ToPercent (
                    Get-CellValue $Row "Perubahan Kwh %"
                ))
                savingKwh         = (Convert-ToNumber (
                    Get-CellValue $Row "Penghematan Kwh"
                ))
                targetAchievement = (Convert-ToPercent (
                    Get-CellValue $Row "Pencapaian target"
                ))
            }
        }
    )

    if ($OutputData.Count -eq 0) {
        throw "Tidak ada baris data yang berhasil diproses: $DatasetName"
    }

    Write-Host "Jumlah baris: $($OutputData.Count)" -ForegroundColor Green

    return $OutputData
}

# ------------------------------------------------------------
# 8. KONVERSI KEDUA DATASET
# ------------------------------------------------------------

# Kedua dataset diproses terlebih dahulu.
# File JSON belum ditimpa sampai keduanya berhasil dikonversi.

$PrimaryData = @(
    Convert-CsvToJsonData `
        -CsvPath $CsvPathPrimary `
        -DatasetName "Data dengan videotron"
)

$NVData = @(
    Convert-CsvToJsonData `
        -CsvPath $CsvPathNV `
        -DatasetName "Data tanpa videotron"
)

# ------------------------------------------------------------
# 9. PASTIKAN FOLDER OUTPUT TERSEDIA
# ------------------------------------------------------------

if (-not (Test-Path -LiteralPath $OutputFolder)) {
    New-Item -ItemType Directory -Path $OutputFolder | Out-Null
}

# ------------------------------------------------------------
# 10. SIMPAN KEDUA FILE JSON
# ------------------------------------------------------------

$PrimaryJson = ConvertTo-Json -InputObject @($PrimaryData) -Depth 5

$NVJson = ConvertTo-Json -InputObject @($NVData) -Depth 5

Set-Content -LiteralPath $JsonPathPrimary `
            -Value $PrimaryJson `
            -Encoding UTF8

Set-Content -LiteralPath $JsonPathNV `
            -Value $NVJson `
            -Encoding UTF8

# ------------------------------------------------------------
# 11. LAPORAN HASIL KONVERSI
# ------------------------------------------------------------

Write-Host ""
Write-Host "============================================"
Write-Host "KONVERSI DATA ENERGI EMIS SELESAI"
Write-Host "============================================"

Write-Host ""
Write-Host "DATA DENGAN VIDEOTRON" -ForegroundColor Green
Write-Host "Jumlah baris : $($PrimaryData.Count)"
Write-Host "Output       : $JsonPathPrimary"

Write-Host ""
Write-Host "DATA TANPA VIDEOTRON" -ForegroundColor Green
Write-Host "Jumlah baris : $($NVData.Count)"
Write-Host "Output       : $JsonPathNV"

Write-Host ""
Write-Host "RINGKASAN JUMLAH DATA PER TAHUN"

foreach ($Dataset in @(
    @{ Name = "Dengan videotron"; Data = $PrimaryData },
    @{ Name = "Tanpa videotron"; Data = $NVData }
)) {

    Write-Host ""
    Write-Host $Dataset.Name

    $Dataset.Data |
        Group-Object year |
        Sort-Object Name |
        ForEach-Object {
            Write-Host "Tahun $($_.Name): $($_.Count) baris"
        }
}

Write-Host ""
Write-Host "Kedua file JSON berhasil dibuat." -ForegroundColor Green
Write-Host ""
