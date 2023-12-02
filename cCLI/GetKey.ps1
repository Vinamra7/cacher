function Get-CacheKey {
   param(
      [Parameter(Mandatory = $true)]
      [string]$key
   )

   # Retrieve email from the registry (replace with your actual code)
   $email = Get-ItemProperty -Path HKCU:\Software\Cacher -Name Email

   # Check if the Email property exists
   if ($email) {
      # Access the Email property value
      $emailValue = $email.Email

      # API endpoint
      $apiUrl = "http://localhost:3000/cache/get-key"

      # Prepare data for API request
      $requestData = @{
         email    = $emailValue
         cacheKey = $key
      }

      # Convert data to JSON
      $jsonRequestData = $requestData | ConvertTo-Json

      # Send request to API
      $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $jsonRequestData -ContentType 'application/json'

      # Process API response as needed
      Write-Host "API Response: $($response | ConvertTo-Json -Depth 5)"
   }
   else {
      Write-Host "Email not found in the registry."
   }
}

# Example usage
#Get-CacheKey -key "hello"
