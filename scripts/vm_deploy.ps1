param(
    [string]$countOfServers,
    [string]$uniqueId
)
$envPath = Join-Path (Get-Location).Path ".env"
$envFile = Get-Content $envPath | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)$') {
        [System.Collections.DictionaryEntry]::new($matches[1], $matches[2])
    }
}

# Convert environment variables to a hash table
$envVars = @{}
foreach ($envEntry in $envFile) {
    $envVars[$envEntry.Key] = $envEntry.Value
}

# Authenticate with Azure using environment variables
az login --service-principal --username $envVars["username"] --password $envVars["password"] --tenant $envVars["tenant"]

# Create VM using the captured image
$vmName = "$uniqueId$countOfServers"
$customImageId = "/subscriptions/9ec5dfe7-ab9e-4f9b-ade0-ffb59f14777a/resourceGroups/test-project_group/providers/Microsoft.Compute/galleries/CacherNew/images/CacherImageDefination/versions/1.0.0"
$adminUsername = $envVars["adminUsername"]
$adminPassword = $envVars["adminPassword"]
$vmSize = "Standard_B1s"

az vm create `
  --resource-group "test-project_group" `
  --name $vmName `
  --image $customImageId `
  --admin-username $adminUsername `
  --admin-password $adminPassword `
  --size $vmSize `
  --public-ip-sku "Standard"

# Create NSG rule to allow inbound traffic on port 8000
az network nsg rule create `
  --resource-group "test-project_group" `
  --nsg-name "$uniqueId$countOfServers`NSG" `
  --name "AllowAnyCustom8000Inbound" `
  --protocol Tcp `
  --direction Inbound `
  --priority 100 `
  --destination-port-ranges 8000 `
  --access Allow `
  --source-address-prefix "*" `
  --destination-address-prefix "*"
