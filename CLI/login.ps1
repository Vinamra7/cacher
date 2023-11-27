# File: login-api.ps1

function Register-User {
    param (
        [string]$username,
        [string]$password
    )

    $apiUrl = "http://localhost:3000/user/signup"
    $headers = @{
        "Content-Type" = "application/json"
    }

    $body = @{
        email = $username
        password = $password
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers -Body $body -ErrorAction Stop
        Write-Host "User registered successfully. UserID: $($response.UserId)"
    } catch {
        Write-Host "Failed to register user. Error: $($_.Exception.Message)"
    }
}

function Save-UserToRegistry {
    param (
        [string]$username,
        [string]$token
    )

    $registryPath = "HKCU:\Software\Cacher"
    $registryName = "LoggedInUser"

    # Create the registry key if it doesn't exist
    if (-not (Test-Path $registryPath)) {
        New-Item -Path $registryPath -Force
    }

    # Create or update the registry entry
    Set-ItemProperty -Path $registryPath -Name $registryName -Value @{
        Username = $username
        Token = $token
    }
}

function Login-User {
    param (
        [string]$username,
        [string]$password
    )

    $apiUrl = "http://localhost:3000/user/signin"
    $headers = @{
        "Content-Type" = "application/json"
    }

    $body = @{
        email = $username
        password = $password
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers -Body $body -ErrorAction Stop
        # Save user information to the Registry
        Save-UserToRegistry -username $username -token $response.Token.user

        Write-Host "Login successful. Welcome, $username! Token: $($response.Token.user)"
    } catch {
        Write-Host "Login failed. Error: $($_.Exception.Message)"
    }
}


# Example usage:
# Register-User -username "john_doe@doe.com" -password "securepassword"
# Login-User -username "john_doe@doe.com" -password "securepassword"
