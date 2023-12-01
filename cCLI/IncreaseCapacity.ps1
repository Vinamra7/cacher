# Function to increase user capacity
function Set-Capacity {
   param(
      [Parameter(Mandatory = $true)]
      [int]$capacity
   )

   # Retrieve email from local storage (replace with your actual code)
   $email = Get-ItemProperty -Path HKCU:\Software\Cacher -Name Email
   $email = $email.Email
   $email
   # Check if email is present in local storage
   if ($email) {
      # API endpoint
      $apiUrl = "http://localhost:3000/user/increase-allocation"

      # Prepare data for API request
      $requestData = @{
         email    = $email
         capacity = $capacity
      }

      # Convert data to JSON
      $jsonRequestData = $requestData | ConvertTo-Json

      # Send request to API
      $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Body $jsonRequestData -ContentType 'application/json'

      # Process API response as needed
      Write-Host "API Response: $($response | ConvertTo-Json -Depth 5)"
   }
   else {
      Write-Host "Email not found in local storage."
   }
}


#Set-Capacity -capacity 20